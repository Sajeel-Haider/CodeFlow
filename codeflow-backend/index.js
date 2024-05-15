const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./database/connectPostgresDb");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");

require("./model/Project");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const connectDB = require("./database/connectMongoDb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//   });
// });

connectDB();

const PORT = process.env.BACKEND_PORT || 8080;

app.use(authRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);

app.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});
