import { useDispatch } from "react-redux";
import { onLogout } from "../../api/auth";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { requireAuth } from "../utils/utils";

export const loader = async ({ request }: { request: Request }) => {
  

  await requireAuth(request);
  return null;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
      navigate("/");
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div>Dashboard</div>
      <Outlet />
      <button onClick={() => logout()} className='btn btn-primary'>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
