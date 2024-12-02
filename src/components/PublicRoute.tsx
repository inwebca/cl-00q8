import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, role } = useAuth();

  if (user) {
    return <Navigate to={role == "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
