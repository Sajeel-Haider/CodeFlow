import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    role: null,
  });

  useEffect(() => {
    const userAuth = localStorage.getItem("isAuthenticatedUser");
    const adminAuth = localStorage.getItem("isAuthenticatedAdmin");
    const role = adminAuth ? "admin" : userAuth ? "user" : null;

    setAuthState({ isAuthenticated: !!userAuth || !!adminAuth, role });
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
