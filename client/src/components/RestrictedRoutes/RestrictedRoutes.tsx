import { Outlet, Navigate } from "react-router-dom";

const RestrictedRoutes = () => {
  const isAuth = localStorage.getItem('isAuth'); // ! Need to get proper auth details here

  if (isAuth) {
    return <Navigate to='/dashboard' />;
  }

  return <Outlet />;
};

export default RestrictedRoutes;
