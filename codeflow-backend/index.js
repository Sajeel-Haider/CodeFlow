const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./database/connectPostgresDb");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

const Project = require("./model/Project");
require("./model/Code");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const paymentRoutes = require("./routes/paymentRoute");
const connectDB = require("./database/connectMongoDb");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
});

const userSocketMap = {};

const getAllConnectedClients = (project_id) => {
  return Array.from(io.sockets.adapter.rooms.get(project_id) || []).map(
    (socketId) => {
      return { socketId, created_by: userSocketMap[socketId] };
    }
  );
};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("join-room", ({ projectId }) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined room ${projectId}`);

    socket.projectId = projectId;
  });

  socket.on("update-file", async ({ projectId, fileId, newContent }) => {
    try {
      const updateDatabase = async () => {
        const result = await Project.updateOne(
          { _id: projectId, "files._id": fileId },
          {
            $set: {
              "files.$.code_content": newContent,
              last_updated: new Date(),
            },
          }
        );

        if (result.modifiedCount === 1) {
          console.log("File updated in database");
        }
      };

      setTimeout(updateDatabase, 2000);

      socket.to(projectId).emit("code-update", { fileId, newContent });
    } catch (error) {
      console.error("Error updating file in database", error);
      socket.emit("update-error", { message: "Failed to update file." });
    }
  });
});

connectDB();

app.use(authRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", challengeRoutes);
app.use("/api", paymentRoutes);

const PORT = process.env.BACKEND_PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});
