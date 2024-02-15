import { useDispatch } from "react-redux";
import { onLogout } from "../../api/auth";
import { unauthenticateUser } from "../../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div>Dashboard</div>
      <button onClick={() => logout()} className='btn btn-primary'>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
