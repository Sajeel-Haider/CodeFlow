import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Button from "../../../utils/Buttons/Button";
import OutputBox from "../../../components/Dashboard/UserDashboard/OutputBox";
import io from "socket.io-client";
import CollaboratorModal from "../../../utils/Modals/CollaboratorModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProjectDetails = () => {
  const location = useLocation();
  const { project } = location.state;
  const [selectedFile, setSelectedFile] = useState();
  const [files, setFiles] = useState(project.files || []);
  const navigate = useNavigate();
  const editorRef = useRef();
  const socketRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // const socket = io(process.env.REACT_APP_API_URL || "http://localhost:8080");
    // socket.on("connect", () => {
    //   console.log("connected to server");
    // });
    // socketRef.current = socket;
    // // Listen for file updates
    // socket.on("file-updated", (updatedFile) => {
    //   setFiles((prevFiles) =>
    //     prevFiles.map((file) =>
    //       file.file_name === updatedFile.file_name ? updatedFile : file
    //     )
    //   );
    // });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      setSelectedFile(files[0]); // Automatically select the first file on load
    }
  }, [files]);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleChange = (newValue) => {
    setSelectedFile((prevSelectedFile) => ({
      ...prevSelectedFile,
      code_content: newValue,
    }));
    socketRef.current.emit("update-file", {
      fileId: selectedFile._id, // Assuming each file has a unique identifier
      fileName: selectedFile.file_name,
      newContent: newValue,
    });
  };
  const addCollaborator = async (projectId, email, permission) => {
    console.log(projectId);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/projects/${projectId}/add-collaborator`,
        {
          email,
          permission,
        }
      );

      toast.success("Collaborator Added");
      console.log("Collaborator added:", response.data);
    } catch (error) {
      console.error("Error adding collaborator:", error.response.data);
    }
  };
  const handleAddCollaborator = ({ email, permission }) => {
    console.log(`Add collaborator: ${email}`);
    console.log(`Add collaborator: ${permission}`);
    addCollaborator(project._id, email, permission);
    // Here you would handle the logic to add a collaborator, e.g., send a request to your server
    setIsModalOpen(false);
  };

  const fileToLanguage = (filename) => {
    const extension = filename.split(".").pop();
    const languageMap = {
      js: "javascript",
      py: "python",
      cpp: "c++",
      html: "html",
      css: "css",
    };
    return languageMap[extension] || "plaintext"; // Use 'plaintext' as default for unknown extensions
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="text-black">
      <Button
        text="Back"
        onClick={() => navigate("/userDashboard/repositories")}
      />
      <div className="flex">
        <div className="w-1/4 overflow-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleFileClick(file)}
            >
              {file.file_name}
            </div>
          ))}
        </div>
        <div className="flex-grow w-1/2 mt-8">
          <Button
            text={"Add Collaborator"}
            onClick={() => setIsModalOpen(true)}
          />
          <Editor
            height="70vh"
            theme="vs-dark"
            onMount={onMount}
            language={
              selectedFile
                ? fileToLanguage(selectedFile.file_name)
                : "plaintext"
            }
            value={
              selectedFile ? selectedFile.code_content : "// Select a file..."
            }
            onChange={handleChange}
            options={{
              selectOnLineNumbers: true,
            }}
          />
        </div>
        {selectedFile && (
          <OutputBox
            codeRef={editorRef}
            language={fileToLanguage(selectedFile.file_name)}
          />
        )}
      </div>
      <CollaboratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCollaborator}
      />
      <ToastContainer />
    </div>
  );
};

export default ProjectDetails;