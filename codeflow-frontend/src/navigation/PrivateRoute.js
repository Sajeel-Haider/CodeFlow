import React from "react";
import { Route, Navigate } from "react-router-dom";

/**
 * PrivateRoute - A wrapper component that checks for user authentication and role before rendering the specified component.
 *
 * @param {ReactNode} children - The children components to be rendered if the conditions are met.
 * @param {string} roleRequired - The role required to access the route.
 */
const PrivateRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else if (roleRequired && user.is_admin !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children ? children : null;
};

export default PrivateRoute;
