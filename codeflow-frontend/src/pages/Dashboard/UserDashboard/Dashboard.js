import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

import StarRateIcon from "@mui/icons-material/StarRate";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashbaord() {
  const [stats, setStats] = useState({
    problemsSolved: 0,
    averageStars: 0,
  });

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
    async function fetchStats() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/stats/${authUser.user_id}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  }, [authUser.user_id]);

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <>
      <h1 className="text-xl md:text-4xl mb-4">Dashboard</h1>
      <Box sx={{ flexGrow: 1 }} className="h-screen">
        <Grid container spacing={2}>
          <Grid item md={6} sm={8}>
            <Item
              style={{
                padding: 20,
                backgroundColor: "black",
                color: "white",
                textAlign: "left",
              }}
            >
              <div>
                <h1 className="text-2xl">Your Repositories</h1>
                {projects.map((project, index) => {
                  return (
                    <div key={index} className="p-4  mt-4">
                      <p>{project.project_name}</p>
                      <hr className="w-1/2 mt-2" />
                    </div>
                  );
                })}
              </div>
            </Item>
          </Grid>
          <Grid item md={6} sm={8}>
            <Item
              style={{
                padding: 20,
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
          <Grid item md={6} sm={8}>
            <Item
              style={{
                padding: 20,
                backgroundColor: "#003C43",
                color: "white",
                textAlign: "left",
              }}
            >
              <div>
                <h1 className="text-2xl">Buy Premium</h1>
                <div className=" mt-4 p-4 ">
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
          <Grid item md={6} sm={8}>
            <Item
              style={{
                padding: 20,
                backgroundColor: "black",
                color: "white",
              }}
            >
              <Grid container spacing={2} padding={2}>
                <Grid item xs={6}>
                  <Card
                    style={{
                      backgroundColor: "#0d1117",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Problems Solved
                      </Typography>
                      <Typography variant="h2" component="p">
                        {stats.problemsSolved}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    style={{
                      backgroundColor: "#0d1117",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Average Star Rating
                      </Typography>
                      <Typography
                        variant="h2"
                        component="p"
                        justifyContent={"center"}
                        alignItems="center"
                      >
                        {stats.averageStars} <StarRateIcon fontSize="10" />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
