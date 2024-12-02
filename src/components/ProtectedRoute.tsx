import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role === null) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
