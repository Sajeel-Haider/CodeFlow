import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "../../../utils/Modals/DeleteComfirmationModel";
import axios from "axios";
const UserTable = ({ userData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleDeleteUser = (user_id) => {
    setDeleteUserId(user_id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log("Deleting user with ID:", deleteUserId);
    try {
      // Send a DELETE request to the backend API
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/deleteUser?id=${deleteUserId}`
      );
      console.log(response.data); // Log success message from the server
      // Handle success, e.g., update UI or show a notification
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error, e.g., show an error message to the user
    }
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
    setShowModal(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-black mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border hidden md:table-cell">User Id</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border hidden md:table-cell">Email</th>
            <th className="px-4 py-2 border hidden md:table-cell">Join Date</th>
            <th className="px-4 py-2 border hidden md:table-cell">
              Last Login
            </th>
            <th className="px-4 py-2 border hidden md:table-cell">Premium</th>
            <th className="px-4 py-2 border hidden md:table-cell">
              Premium Member From
            </th>
            <th className="px-4 py-2 border hidden md:table-cell">Drop</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "text-white"}
            >
              <td className="px-4 py-2 border hidden md:table-cell">
                {data.user_id}
              </td>
              <td className="px-4 py-2 border">{data.username}</td>
              <td className="px-4 py-2 border hidden md:table-cell">
                {data.email}
              </td>
              <td className="px-4 py-2 border hidden md:table-cell">
                {data.join_date}
              </td>
              <td className="px-4 py-2 border hidden md:table-cell">
                {data.last_login ? <>{data.last_login}</> : <>-</>}
              </td>
              <td className="px-4 py-2 border hidden md:table-cell">
                {data.is_premium ? "True" : "-"}
              </td>
              <td className="px-4 py-2 border hidden md:table-cell">
                {data.premium_end_date
                  ? `${data.premium_start_date} - ${data.premium_end_date}`
                  : "-"}
              </td>
              <td
                className="px-4 py-2 border hidden md:table-cell cursor-pointer"
                onClick={() => handleDeleteUser(data.user_id)} // Corrected onClick handler
              >
                <MdDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        isOpen={showModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserTable;
