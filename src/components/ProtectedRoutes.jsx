import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) return <div>Loading...</div>;

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
