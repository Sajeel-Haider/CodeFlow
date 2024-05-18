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

// Create an HTTP server and attach the express app to it
const server = http.createServer(app);

// Socket.io server setup with the same HTTP server
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
    socket.join(projectId); // Join a unique room per project
    console.log(`Socket ${socket.id} joined room ${projectId}`);

    // Store projectId in the socket session for later use
    socket.projectId = projectId;
  });

  socket.on("update-file", async ({ projectId, fileId, newContent }) => {
    // Ensure projectId is used from the event data
    socket.to(projectId).emit("code-update", { fileId, newContent });
    console.log(projectId, fileId, newContent);
    // Update the database
    try {
      const result = await Project.updateOne(
        { _id: projectId, "files._id": fileId },
        {
          $set: {
            "files.$.code_content": newContent,
            last_updated: new Date(), // Updating the last_updated field at the project level
          },
        }
      );

      if (result.modifiedCount === 1) {
        console.log("File updated in database");
        socket.to(projectId).emit("code-update", { fileId, newContent });
      } else {
        console.log("No document was updated");
      }
    } catch (error) {
      console.error("Error updating file in database", error);
      // Handle error appropriately
    }
  });
});

// // Socket.io connection event
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);
//   socket.on("join", (project) => {
//     console.log(project.project.project_id);
//     console.log("user disconnected", socket.id);

//     userSocketMap[socket.id] = project.project.created_by;
//     socket.join(project.project.project_id);
//     const clients = getAllConnectedClients(project.project.project_id);
//     console.log(clients);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//   });
// });

// Connect to the MongoDB database
connectDB();

// Apply routes to the Express application
app.use(authRoutes);
app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", challengeRoutes);
app.use("/api", paymentRoutes);

// Use the HTTP server to listen on the specified port, not the Express app
const PORT = process.env.BACKEND_PORT || 8080;
server.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});
