import Sidebar from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { SidebarItem } from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { IoMdSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
const AdminDashboard = () => {
  return (
    <div className="flex flex-row">
      <Sidebar>
        <SidebarItem icon={<MdSpaceDashboard />} text="Dashboard" />
        <SidebarItem icon={<ImStatsDots />} text="Statistics" />
        <hr className="my-3" />
        <SidebarItem icon={<IoMdSettings />} text="Settings" />
      </Sidebar>
      <div className="p-4">hello</div>
    </div>
  );
};

export default AdminDashboard;
