import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Button from "../../../utils/Buttons/Button";
import OutputBox from "../../../components/Dashboard/UserDashboard/OutputBox";

const ProjectDetails = () => {
  const location = useLocation();
  const { project } = location.state;
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState(project.files || []);

  const navigate = useNavigate();
  const editorRef = useRef();
  useEffect(() => {
    if (files.length > 0) {
      setSelectedFile(files[0]); // Automatically select the first file on load
    }
  }, [files]);

  const handleFileClick = (file) => {
    setSelectedFile(file);
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
        {/* File List */}
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

        {/* Code Editor */}
        <div className="flex-grow mt-8">
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
            onChange={(newValue) => {
              setSelectedFile({ ...selectedFile, code_content: newValue });
            }}
            options={{
              selectOnLineNumbers: true,
            }}
          />
        </div>
        <OutputBox code={selectedFile?.code_content} />
      </div>
    </div>
  );
};

export default ProjectDetails;
