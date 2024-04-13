import Sidebar, {
  SidebarItem,
} from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { FaCode } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoIosGitNetwork } from "react-icons/io";
import { MdQuestionMark } from "react-icons/md";
const UserDashboard = () => {
  return (
    <div className="flex flex-row">
      <Sidebar>
        <SidebarItem icon={<MdSpaceDashboard />} text="Dashboard" />
        <SidebarItem icon={<IoIosGitNetwork />} text="Repositories" />
        <SidebarItem icon={<FaCode />} text="Problems" />
        <SidebarItem icon={<MdQuestionMark />} text="About us" />
        <hr className="my-3" />
        <SidebarItem icon={<IoMdSettings />} text="Settings" />
      </Sidebar>
      <div className="p-4">hello</div>
    </div>
  );
};

export default UserDashboard;
