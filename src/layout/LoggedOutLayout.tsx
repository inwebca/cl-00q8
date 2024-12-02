import { Outlet } from "react-router-dom";

const LoggedOutLayout = () => {
  return (
    <div className="col-3 mx-auto">
      <Outlet />
    </div>
  );
};

export default LoggedOutLayout;
