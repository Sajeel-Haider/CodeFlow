import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Button from "../../../utils/Buttons/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [files, setFiles] = useState([]);
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user);
  const fileToLanguage = (filename) => {
    const extension = filename.split(".").pop();
    const languageMap = {
      js: "javascript",
      py: "python",
      cpp: "c++",
      html: "HTML",
      css: "CSS",
    };
    return languageMap[extension] || "Other";
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    const detectedLanguage = fileToLanguage(acceptedFiles[0].name);
    setLanguage(detectedLanguage);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("project_name", projectName);
    formData.append("description", description);
    formData.append("created_by", authUser.user_id); // Replace 'authUser' with actual user ID or variable
    formData.append("is_public", isPublic);
    formData.append("language", language);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/createProject`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Project created:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      {" "}
      <div className=" ">
        <Button
          type="submit"
          text="Back"
          onClick={() => navigate("/userDashboard/repositories")}
        />
      </div>
      <div className="text-white flex flex-col justify-center items-center ">
        <div className="p-8  w-9/12 flex flex-col items-center h-screen">
          <div>
            <h1 className="text-xl md:text-4xl mb-4">Create new project</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <input
              className="border rounded p-2 mt-2 bg-black"
              name="projectName"
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
              className="border mt-4 rounded p-2 bg-black"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="mt-4">
              <label className="mr-4">
                Public
                <input
                  className="ml-2 bg-black"
                  type="radio"
                  checked={isPublic === true}
                  onChange={() => setIsPublic(true)}
                />
              </label>
              <label>
                Private
                <input
                  className="ml-2 bg-black"
                  type="radio"
                  checked={isPublic === false}
                  onChange={() => setIsPublic(false)}
                />
              </label>
            </div>
            <div
              {...getRootProps({
                className:
                  "dropzone border-dashed border-2 border-gray-400 mt-8 p-6 flex flex-col justify-center items-center",
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
            <div className="mt-8">
              <Button type="submit" text="Create Project" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
