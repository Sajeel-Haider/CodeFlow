// src/components/PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, roleRequired }) => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Route
      render={({ location }) =>
        isAuthenticated && (!roleRequired || role === roleRequired) ? (
          <Component />
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        )
      }
    />
  );
};

export default PrivateRoute;
