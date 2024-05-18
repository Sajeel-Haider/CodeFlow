import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashbaord() {
  const authUser = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const fetchProjects = async () => {
    console.log(authUser);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/projects/${authUser.user_id}`
      );
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <>
      <h1 className="text-xl md:text-4xl mb-4">Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "left",
              }}
            >
              <div>
                <h1 className="text-2xl">Your Repositories</h1>
                {projects.map((project, index) => {
                  return (
                    <div key={index} className="p-4 rounded-xl border mt-4">
                      <p>{project.project_name}</p>
                    </div>
                  );
                })}
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "left",
              }}
            >
              <div>
                <h1 className="text-2xl mb-4">Whats New 💥</h1>
                <p className="text-slate-500">Real time code editing</p>
                <p className="text-slate-500">
                  Premium account with unlimited repositories
                </p>
                <p className="text-slate-500">
                  Online compilation and output of the code
                </p>
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              style={{
                backgroundColor: "#003C43",
                color: "white",
                textAlign: "left",
              }}
            >
              <div>
                <h1 className="text-2xl">Buy Premium</h1>
                <div className="border mt-4 p-4 rounded-xl">
                  <p>Unlimited repositories</p>
                  <p>Unlimited collaborators</p>
                </div>
                <button
                  className="px-8 py-2 rounded-xl mt-4 bg-theme_black"
                  onClick={() => navigate("/userDashboard/payment")}
                >
                  Buy
                </button>
              </div>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
