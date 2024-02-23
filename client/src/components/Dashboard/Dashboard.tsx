import { useDispatch } from "react-redux";
import { getCalculations, onLogout } from "../../api/auth";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { requireAuth } from "../utils/utils";

export const loader = async ({ request }: { request: Request }) => {
  await requireAuth(request);
  return getCalculations();
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { calculations },
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

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
      <div>
        <table>
          <thead>
            <tr>
              <td>calc_type</td>
              <td>current_doserate</td>
              <td>current_distance</td>
              <td>new_distance</td>
              <td>new_doserate</td>
            </tr>
          </thead>
          <tbody>
            {calculations.map(
              (calc: {
                calculation_id: number;
                user_id: number;
                calc_type: string;
                current_doserate: number;
                current_distance: number;
                new_distance: number;
                new_doserate: number;
              }) => {
                return (
                  <tr key={calc.calculation_id}>
                    <td>{calc.calc_type}</td>
                    <td>{calc.current_doserate}</td>
                    <td>{calc.current_distance}</td>
                    <td>{calc.new_distance}</td>
                    <td>{calc.new_doserate}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <Outlet />
      <button onClick={() => logout()} className='btn btn-primary'>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
