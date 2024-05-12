import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { SidebarItem } from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { FaCode } from "react-icons/fa";

const UserDashboard = ({ children }) => {
  const navigate = useNavigate();

  const updateNavigateUrl = (route) => {
    navigate(`/userDashboard/${route}`);
  };

  return (
    <div className="flex flex-row">
      <Sidebar>
        <SidebarItem
          icon={<MdSpaceDashboard />}
          text="Dashboard"
          onClick={() => updateNavigateUrl("dashboard")}
        />
        <SidebarItem
          icon={<IoIosGitNetwork />}
          text="Repositories"
          onClick={() => updateNavigateUrl("repositories")}
        />
        <SidebarItem
          icon={<FaCode />}
          text="Problems"
          onClick={() => updateNavigateUrl("problems")}
        />
        <SidebarItem
          icon={<MdQuestionMark />}
          text="About us"
          onClick={() => updateNavigateUrl("about")}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<IoMdSettings />}
          text="Settings"
          onClick={() => updateNavigateUrl("settings")}
        />
      </Sidebar>
      <div className="p-4 text-white flex-grow">{children}</div>
    </div>
  );
};

export default UserDashboard;
