import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleBasedRouteProps {
  allowedRoles: ("admin" | "user")[];
  redirectTo?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
  redirectTo = "/login",
}) => {
  const { role, user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role === null) {
    return <div>Loading...</div>;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;
