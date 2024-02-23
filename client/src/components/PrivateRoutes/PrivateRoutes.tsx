import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuth = localStorage.getItem("isAuth"); // ! Need to get proper auth details here

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
