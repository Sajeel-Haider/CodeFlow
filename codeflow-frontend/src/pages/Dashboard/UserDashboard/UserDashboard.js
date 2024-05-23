import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { MdSpaceDashboard, MdQuestionMark } from "react-icons/md";
import { IoIosGitNetwork } from "react-icons/io";
import { FaCode } from "react-icons/fa";

import { clearAuthUser } from "../../../store/slices/authUser-slice";

export default function UserDashboard({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuthUser());

    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticatedUser");

    navigate("/");
  };

  const updateNavigateUrl = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(`/userDashboard/${route}`);
    }
  };

  const [state, setState] = React.useState({
    bottom: false,
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
      style={{ backgroundColor: "#003C43", color: "white" }}
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ color: "white" }}>
        {[
          {
            name: "Dashboard",
            icon: <MdSpaceDashboard style={{ color: "white" }} />,
            url: "dashboard",
          },
          {
            name: "Repositories",
            icon: <IoIosGitNetwork style={{ color: "white" }} />,
            url: "repositories",
          },
          {
            name: "Challenges",
            icon: <FaCode style={{ color: "white" }} />,
            url: "challenges",
          },
          {
            name: "Logout",
            icon: <MdQuestionMark style={{ color: "white" }} />,
            url: "logout",
          },
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
    <div className="bg-theme_black">
      <IconButton
        color="white"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer("bottom", true)}
        sx={{ color: "white", marginLeft: "auto", marginRight: 2 }}
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
