import { useState, useEffect } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTable from "../../../components/Dashboard/AdminDashboard/UserTable";

const Users = () => {
  const [userData, setUserData] = useState([]);

  const fetchAllUsers = () => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/api/allUsers`).then((res) => {
        if (res.status === 200) {
          setUserData(res.data.data.rows);
          console.log(userData);
        }
        if (res.status === 204) {
          toast.warn("No users found");
        }
      });
    } catch (err) {
      console.log("Error fetching all users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <div>Users</div>
      <UserTable userData={userData} />

      <ToastContainer />
    </>
  );
};

export default Users;
