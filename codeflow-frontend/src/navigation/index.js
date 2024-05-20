import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";

import SignUp from "../../src/pages/SignUp/SignUp";
import Login from "../../src/pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Dashboard/AdminDashboard/Users";
import AddProblem from "../pages/Dashboard/AdminDashboard/AddProblem";
import Repositories from "../pages/Dashboard/UserDashboard/Repositories";
import CreateProject from "../pages/Dashboard/UserDashboard/CreateProject";
import ProjectDetails from "../pages/Dashboard/UserDashboard/ProjectDetails";
import Challenges from "../pages/Dashboard/UserDashboard/Challenges";
import ChallengeDetails from "../pages/Dashboard/UserDashboard/ChallengeDetails";
import Home from "../pages/Home/Home";
import About from "../pages/Dashboard/About/About";
import Dashboard from "../pages/Dashboard/UserDashboard/Dashboard";
import Payment from "../pages/Dashboard/UserDashboard/Payment";
const index = () => {
  const user = localStorage.getItem("user");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/adminDashboard"
        element={
          <PrivateRoute component={AdminDashboard} roleRequired="admin" />
        }
      />
      <Route
        path="/userDashboard"
        element={<PrivateRoute component={UserDashboard} roleRequired="user" />}
      />
      <Route
        path="/adminDashboard/*"
        element={
          <AdminDashboard>
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="addProblem" element={<AddProblem />} />
            </Routes>
          </AdminDashboard>
        }
      />
      <Route
        path="/userDashboard/*"
        element={
          <UserDashboard>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="payment" element={<Payment />} />
              <Route path="repositories" element={<Repositories />} />
              <Route path="createProject" element={<CreateProject />} />
              <Route path="projectDetails/:id" element={<ProjectDetails />} />
              <Route path="challenges" element={<Challenges />} />
              <Route
                path="challenges/challengeDetails/:id"
                element={<ChallengeDetails />}
              />
            </Routes>
          </UserDashboard>
        }
      />
    </Routes>
  );
};

export default index;
