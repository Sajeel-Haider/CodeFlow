const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/connectPostgresDb");
const { format } = require("date-fns");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { userId: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

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
      return res.status(401).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

    const user = await db.query(
      "INSERT INTO users (username, email, password_hash, join_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, formattedDate]
    );

    res.status(200).send({
      message: "User registered successfully",
      user: user.rows[0],
    });
  } catch (error) {
    console.error("Error saving user:", error);
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
      const token = generateToken(user.rows[0]);
      res.status(200).send({
        message: "Login successful",
        user: user.rows[0],
        token,
      });
    } else {
      return res.status(401).send({ error: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
