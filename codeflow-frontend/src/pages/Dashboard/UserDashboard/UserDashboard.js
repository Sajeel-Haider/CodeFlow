import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"; // Import the burger menu icon
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { MdSpaceDashboard } from "react-icons/md";
import { IoIosGitNetwork } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdQuestionMark } from "react-icons/md";

export default function UserDashboard({ children }) {
  const navigate = useNavigate();

  const updateNavigateUrl = (route) => {
    navigate(`/userDashboard/${route}`);
  };

  const [state, setState] = React.useState({
    bottom: false, // Only keep the 'bottom' state
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
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
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer("bottom", true)}
        sx={{ marginLeft: "auto", marginRight: 2 }} // Position the button on the right
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}
      >
        {list("bottom")}
      </SwipeableDrawer>
      <div className="p-4 text-white flex-grow">{children}</div>
    </div>
  );
}
