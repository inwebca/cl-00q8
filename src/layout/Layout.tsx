import { useAuth } from "../context/AuthContext";
import LoggedLayout from "./LoggedLayout";
import LoggedOutLayout from "./LoggedOutLayout";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoggedOutLayout />;
  }

  return (
    <LoggedLayout>
      <Outlet />
    </LoggedLayout>
  );
};

export default Layout;
