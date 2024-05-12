const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

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
      project_id: newProject._id, // Make sure you use the correct ID field name
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .send({ message: "Error creating project", error: error.message });
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
    } catch (error) {
      res.status(400).json({ message: "Failed to update file", error: error });
    }
  }
);

module.exports = router;
