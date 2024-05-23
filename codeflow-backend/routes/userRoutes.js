const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/connectPostgresDb");
const { format } = require("date-fns");

router.get("/allUsers", async (req, res) => {
  try {
    const userData = await db.query(
      "SELECT * FROM users WHERE users.is_admin = 0"
    );
    if (userData.rows.length < 1) {
      res.status(204).send({ message: "No data found" });
    }

    res.status(200).send({ message: "Fetched Successfully", data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM users WHERE users.user_id = $1",
      [id]
    );

    if (result.rowCount === 1) {
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(204).send({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `
          SELECT COUNT(*) AS problems_solved, AVG(stars_earned) AS average_stars
          FROM solved_questions
          WHERE user_id = $1;
      `;
    const { rows } = await db.query(query, [userId]);
    if (rows.length > 0) {
      res.json({
        problemsSolved: parseInt(rows[0].problems_solved),
        averageStars: parseFloat(rows[0].average_stars).toFixed(1),
      });
    } else {
      res.json({ problemsSolved: 0, averageStars: 0 });
    }
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/notifications", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM notification");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error accessing the database" });
  }
});
router.get("/user/premium-stats", async (req, res) => {
  try {
    const query = `
      SELECT is_premium, COUNT(*) AS count
      FROM users
      GROUP BY is_premium;
    `;
    const { rows } = await db.query(query);
    let premiumUsers = 0;
    let nonPremiumUsers = 0;
    rows.forEach((row) => {
      if (row.is_premium) {
        premiumUsers = row.count;
      } else {
        nonPremiumUsers = row.count;
      }
    });
    res.status(200).json({
      premiumUsers,
      nonPremiumUsers,
    });
  } catch (error) {
    console.error("Error fetching premium stats:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/activity/daily", async (req, res) => {
  try {
    const today = format(new Date(), "yyyy-MM-dd");
    const query = `
      SELECT activity_type, COUNT(*) AS count
      FROM activity_log
      WHERE created_at::date = $1
      GROUP BY activity_type;
    `;
    const { rows } = await db.query(query, [today]);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(204).send({ message: "No activities found for today." });
    }
  } catch (error) {
    console.error("Error fetching daily activity:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
