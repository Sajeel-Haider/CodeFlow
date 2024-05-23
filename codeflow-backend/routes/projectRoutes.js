const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const db = require("../database/connectPostgresDb");
const Project = mongoose.model("Project");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/createProject", upload.array("files"), async (req, res) => {
  const { project_name, description, created_by, language, is_public } =
    req.body;
  console.log(project_name, description, created_by, language, is_public);
  const files = req.files.map((file) => ({
    file_name: file.originalname,
    code_content: file.buffer.toString("utf-8"),
    last_modified: new Date(),
  }));
  console.log(files);

  if (!project_name || !description || !created_by || !language) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const newProject = new Project({
    project_name,
    description,
    created_by,
    language,
    files,
    is_public: is_public === "true",
  });

  try {
    await newProject.save();
    res.status(201).send({
      message: "Project created successfully",
      project_id: newProject._id,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .send({ message: "Error creating project", error: error.message });
  }
});
router.get("/count/projects", async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    res.status(200).json({ count: projectCount });
  } catch (error) {
    console.error("Error retrieving project count:", error);
    res
      .status(500)
      .json({ message: "Error retrieving project count", error: error });
  }
});
router.get("/projects", async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: "Project not found", error: error });
  }
});

router.get("/projects/:user_id", async (req, res) => {
  const { user_id } = req.params;

  console.log("User ID:", user_id);

  try {
    const query = {
      $or: [{ created_by: user_id }, { "collaborators.user_id": user_id }],
    };

    console.log("Query:", JSON.stringify(query));

    const projects = await Project.find(query);

    console.log("Found projects:", projects.length);

    if (projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "No projects found for this user" });
    }
  } catch (error) {
    console.error("Error retrieving projects:", error);
    res
      .status(500)
      .json({ message: "Error retrieving projects", error: error });
  }
});

router.get("/projects/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: "Project not found", error: error });
  }
});

router.patch(
  "/projects/:projectId/files/:fileName",
  upload.single("file"),
  async (req, res) => {
    const { code_content } = req.body;
    const { projectId, fileName } = req.params;

    try {
      const project = await Project.findOneAndUpdate(
        { _id: projectId, "files.file_name": fileName },
        {
          $set: {
            "files.$.code_content": code_content,
            "files.$.last_modified": new Date(),
          },
        },
        { new: true }
      );
      res.status(200).json(project);
      io.emit("fileUpdated", { projectId, fileName, code_content });
    } catch (error) {
      res.status(400).json({ message: "Failed to update file", error: error });
    }
  }
);

router.patch("/projects/:projectId/add-collaborator", async (req, res) => {
  const { projectId } = req.params;
  const { email, permission } = req.body;

  try {
    const pgRes = await db.query("SELECT user_id FROM users WHERE email = $1", [
      email,
    ]);
    if (pgRes.rows.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    const user_id = pgRes.rows[0].user_id;
    console.log(user_id, projectId, permission);

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: {
          collaborators: { user_id: user_id, permissions: permission },
        },
      },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error adding collaborator:", error);
    res
      .status(500)
      .send({ message: "Error adding collaborator", error: error.message });
  }
});

module.exports = router;
