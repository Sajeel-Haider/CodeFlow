import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { SidebarItem } from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { IoIosGitNetwork, IoMdSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import { FaUsers } from "react-icons/fa";

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();

  const updateNavigateUrl = (route) => {
    navigate(`/adminDashboard/${route}`);
  };

  return (
    <div className="flex flex-row bg-primary_color">
      <Sidebar>
        <SidebarItem
          icon={<MdSpaceDashboard />}
          text="Dashboard"
          onClick={() => updateNavigateUrl("dashboard")}
        />
        <SidebarItem
          icon={<FaUsers />}
          text="Users"
          onClick={() => updateNavigateUrl("users")}
        />
        <SidebarItem
          icon={<IoIosGitNetwork />}
          text="Add Problem"
          onClick={() => updateNavigateUrl("addProblem")}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<IoMdSettings />}
          text="Logout"
          onClick={() => {
            // Clear any local storage or cookies if used
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");

            // Navigate to login page
            navigate("/login");
          }}
        />
      </Sidebar>
      <div className="p-4 text-white">{children}</div>
    </div>
  );
};

export default AdminDashboard;
