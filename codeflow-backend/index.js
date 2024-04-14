const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./database/db");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.BACKEND_PORT;

app.use(authRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log("Server Running on PORT: ", PORT);
});
