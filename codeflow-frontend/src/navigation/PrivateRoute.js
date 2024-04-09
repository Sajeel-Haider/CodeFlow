import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  const [isAdmin, setIsAdmin] = useState(true);

  return isAdmin ? component : <Navigate to="/login" replace />;
};

export default PrivateRoute;
