const mongoose = require("mongoose");
const { Schema } = mongoose;
const uuid = require("uuid");

const fileSchema = new Schema({
  file_name: String,
  code_content: String,
  last_modified: { type: Date, default: Date.now },
});

const collaboratorSchema = new Schema({
  user_id: String,
  permissions: [String],
});

const projectSchema = new Schema({
  project_id: { type: String, default: () => uuid.v4() },
  project_name: String,
  created_by: String,
  creation_date: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
  language: String,
  files: [fileSchema],
  collaborators: [collaboratorSchema],
  is_public: Boolean,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
