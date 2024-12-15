import React, { createContext, useState, useEffect } from "react";
import { verifyToken } from "../apis/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, loading: true });

  const initializeAuth = async () => {
    
    const isAuthenticated = await verifyToken();
    
    setAuth({ isAuthenticated, loading: false });
  };
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
