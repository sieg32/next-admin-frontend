
import { useContext } from "react";
import apiClient from "./axios";
import handleApiError from "./errorHandle";
import { AuthContext } from "../components/AuthProvider";

export const loginUser = async ({ email, password }, setAuth) => {
    try {
        const response = await apiClient.post(`/user/login`, { email, password });
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            setAuth({ isAuthenticated: true, loading: false });
        }
        return response.data; // Assuming the token is returned.
    } catch (error) {
        handleApiError(error);
        return null;
    }
};



export const verifyToken = async () => {
   
  
    try {
      const response = await apiClient.post(`/user/verify`);
      console.log()
      return response.status === 200;
    } catch {
      return false;
    }
  };