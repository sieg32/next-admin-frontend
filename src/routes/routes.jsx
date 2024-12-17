import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoutes";
import ErrorPage from "../components/ErrorPage";
import { UploadProject } from "../pages/ProjectUpload";
import { ProjectEdit } from "../pages/ProjectEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoute><HomePage /></ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/deals", errorElement: <ErrorPage />,
    children:[
      {
        index:true,
        element: <ProtectedRoute><HomePage /></ProtectedRoute>,
        errorElement: <ErrorPage />,
      },
      {
        path:'upload',
        element: <ProtectedRoute><UploadProject /></ProtectedRoute>,
        errorElement: <ErrorPage />,
      },
      {
        path:'edit/:projectId',
        element: <ProtectedRoute><ProjectEdit /></ProtectedRoute>,
        errorElement: <ErrorPage />,
        
      },

    ]

    
  },
  ,
]);

export default router;
