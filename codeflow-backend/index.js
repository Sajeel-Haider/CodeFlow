const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./database/connectPostgresDb");
const bodyParser = require("body-parser");

require("./model/Project");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const connectDB = require("./database/connectMongoDb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

const PORT = process.env.BACKEND_PORT;

app.use(authRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);

app.listen(PORT, () => {
  console.log("Server Running on PORT: ", PORT);
});
