import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "../../../utils/Buttons/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserStats() {
  const [counts, setCounts] = useState({ projects: 0, challenges: 0 });

  const [userStats, setUserStats] = useState({
    premiumUsers: 0,
    nonPremiumUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    const data = [
      ["Metric", "Count"],
      ["Premium Users", userStats.premiumUsers],
      ["Non-Premium Users", userStats.nonPremiumUsers],
      ["Projects", counts.projects],
      ["Challenges", counts.challenges],
    ];
    let csvContent =
      "data:text/csv;charset=utf-8," + data.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dashboard_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "dashboard_data.csv".
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/premium-stats`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserStats({
          premiumUsers: data.premiumUsers,
          nonPremiumUsers: data.nonPremiumUsers,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/api/count/projects`).then((res) =>
        res.json()
      ),
      fetch(`${process.env.REACT_APP_API_URL}/api/count/challenges`).then(
        (res) => res.json()
      ),
    ])
      .then(([projectData, challengeData]) => {
        setCounts({
          projects: projectData.count,
          challenges: challengeData.count,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ width: "100%" }}>
      <Button text="Download Report" onClick={handleDownload}></Button>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="subtitle1">Premium Users</Typography>
            <Typography variant="h6" style={{ fontSize: "50px" }}>
              {userStats.premiumUsers}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="subtitle1">Non-Premium Users</Typography>
            <Typography variant="h6" style={{ fontSize: "50px" }}>
              {userStats.nonPremiumUsers}
            </Typography>
          </Item>
        </Grid>{" "}
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Projects</Typography>
            <Typography variant="subtitle1" style={{ fontSize: "50px" }}>
              {counts.projects}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6">Challenges</Typography>
            <Typography variant="subtitle1" style={{ fontSize: "50px" }}>
              {counts.challenges}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
