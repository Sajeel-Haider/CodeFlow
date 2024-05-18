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

const index = () => {
  const isAdmin = true; // Determine if user is admin

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/adminDashboard"
        element={<PrivateRoute component={<AdminDashboard />} />}
      />
      <Route
        path="/userDashboard"
        element={<PrivateRoute component={<UserDashboard />} />}
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
              <Route index element={<UserDashboard />} />
              <Route path="repositories" element={<Repositories />}></Route>
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
