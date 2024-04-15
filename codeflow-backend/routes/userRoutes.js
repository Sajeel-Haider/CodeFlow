const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/db");
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

module.exports = router;
