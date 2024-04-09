const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/db");
const { format } = require("date-fns");

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).send({ error: "Need email, password, and name" });
  }

  try {
    const existingUser = await db.query(
      "SELECT users.email FROM users WHERE users.email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      const userEmail = existingUser.rows[0].email;
      res.status(401).send({ message: "Email already exists" });
    }

    const existingUserName = await db.query(
      "SELECT * FROM users WHERE users.username = $1",
      [name]
    );
    if (existingUserName.rows.length > 0) {
      const userName = existingUserName.rows[0].email;
      res.status(400).send({ message: "Name already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    try {
      const user = await db.query(
        "INSERT INTO users (username, email, password_hash, join_date) VALUES ($1, $2, $3, $4) RETURNING * ",
        [name, email, hashedPassword, formattedDate]
      );
      res.status(200).send({
        message: "Credentials added successfully",
        user: user.rows[0],
      });

      console.log("User saved successfully!");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Email and Password are required" });
  }

  try {
    const user = await db.query("SELECT * FROM users WHERE users.email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).send({ error: "Invalid Credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );

    if (passwordMatch) {
      console.log(user.rows.length);
      const currentDate = new Date();
      const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

      const checkUpdateReq = await db.query(
        "UPDATE users SET last_login = $1 WHERE email = $2",
        [formattedDate, email]
      );
      if (checkUpdateReq) {
        return res
          .status(200)
          .send({ message: "Login successful", user: user.rows[0] });
      }
    } else {
      return res.status(401).send({ error: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
