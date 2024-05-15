import React, { useState } from "react";
import Button from "../Buttons/Button";

const CollaboratorModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("view");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, permission });
    setEmail(""); // Clear the input field after submission
    setPermission("view"); // Reset permission to default
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h2 className="text-xl mb-4">Add Collaborator</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="border p-2 mb-4 w-full"
            placeholder="Enter collaborator's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                value="view"
                checked={permission === "view"}
                onChange={(e) => setPermission(e.target.value)}
              />
              View
            </label>
            <label>
              <input
                type="radio"
                value="edit"
                checked={permission === "edit"}
                onChange={(e) => setPermission(e.target.value)}
              />
              Edit
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <Button text="Submit"></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollaboratorModal;
