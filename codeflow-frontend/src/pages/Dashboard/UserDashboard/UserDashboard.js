import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IoIosGitNetwork } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import { MdSpaceDashboard } from "react-icons/md";
import { MdQuestionMark } from "react-icons/md";
export default function UserDashboard({ children }) {
  const navigate = useNavigate();

  const updateNavigateUrl = (route) => {
    navigate(`/userDashboard/${route}`);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { name: "Dashboard", icon: <MdSpaceDashboard />, url: "dashboard" },
          {
            name: "Repositories",
            icon: <IoIosGitNetwork />,
            url: "repositories",
          },
          { name: "Challenges", icon: <FaCode />, url: "challenges" },
          { name: "About us", icon: <MdQuestionMark />, url: "about" },
          { name: "Settings", icon: <IoMdSettings />, url: "settings" },
        ].map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => updateNavigateUrl(item.url)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["left", "right", "top", "bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      <div className="p-4 text-white flex-grow">{children}</div>
    </div>
  );
}
