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
import { initSocket } from "../../../utils/Socket/socket";
import { debounce } from "lodash";

const ProjectDetails = () => {
  const socketRef = useRef(null);
  const [clients, setClient] = useState([]);
  const location = useLocation();
  const { project } = location.state;
  const [projectDetails, setProjectDetails] = useState(project || []);
  const [selectedFile, setSelectedFile] = useState();
  const [files, setFiles] = useState(project.files || []);
  const navigate = useNavigate();
  const editorRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSocketError = (e) => {
    console.log("socket error => ", e);
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleSocketError(err));
      socketRef.current.on("connect_failed", (err) => handleSocketError(err));

      socketRef.current.emit("join-room", { projectId: project._id });

      socketRef.current.on("code-update", ({ fileId, newContent }) => {
        if (
          fileId === selectedFile?._id &&
          newContent !== selectedFile.code_content
        ) {
          console.log("Update received", newContent);
          setSelectedFile((prev) => ({
            ...prev,
            code_content: newContent,
          }));
        }
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [selectedFile, project._id]);

  useEffect(() => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, [files]);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };
  const handleChange = (newValue) => {
    if (selectedFile && newValue !== selectedFile.code_content) {
      setSelectedFile((prevSelectedFile) => ({
        ...prevSelectedFile,
        code_content: newValue,
      }));
      socketRef.current.emit("update-file", {
        projectId: projectDetails._id,
        fileId: selectedFile._id,
        newContent: newValue,
      });
    }
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
    return languageMap[extension] || "plaintext";
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="text-white h-screen">
      <Button
        text="Back"
        onClick={() => navigate("/userDashboard/repositories")}
      />
      <div className="flex flex-col md:flex-row md:flex">
        <div className=" overflow-auto">
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
          <div className="mb-4">
            <Button
              text={"Add Collaborator"}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="w-80 md:w-full">
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
