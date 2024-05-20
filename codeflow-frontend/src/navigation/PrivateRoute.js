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
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Ensure to handle boolean as string from storage

  // Check if user is authenticated and if the user role matches the role required for the route
  if (!isAuthenticated) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  } else if (roleRequired && user.is_admin !== roleRequired) {
    // If user role does not match the role required, redirect to the home page or a forbidden access page
    return <Navigate to="/" replace />;
  }

  // If all conditions are met, render the children components
  return children ? children : null;
};

export default PrivateRoute;
