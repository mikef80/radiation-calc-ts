import { useDispatch } from "react-redux";
import { getCalculations } from "../../api/data";
import { onLogout } from "../../api/auth";
import { unauthenticateUser } from "../../redux/slices/authSlice";
import { useLoaderData, useNavigate } from "react-router-dom";
import { requireAuth } from "../utils/utils";
import { Col, Container, Row } from "react-bootstrap";
import Warning from "../Warning/Warning";

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
      localStorage.removeItem("termsAgreed");
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Warning />
      <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
        <div className='bg-white col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded '>
          <h3 className='text-center'>Dashboard</h3>
          {!calculations.length && <p>No calculations found</p>}
          {calculations.length > 0 && (
            <Container>
              <Row className='border'>
                <Col className='py-2 text-center border align-items-center fw-bold'>Date</Col>
                <Col className='py-2 text-center border align-items-center fw-bold '>Type</Col>
              </Row>
              {calculations.map(
                (calc: {
                  calculation_id: number;
                  user_id: number;
                  calculation_date_time: number;
                  calculation_type: string;
                  current_doserate: number;
                  current_distance: number;
                  new_distance: number;
                  new_doserate: number;
                }) => {
                  return (
                    <Row
                      key={calc.calculation_id}
                      onClick={() =>
                        navigate(`/calculations/${calc.calculation_id}`, {
                          state: calc,
                        })
                      }>
                      <Col className='py-2 text-center'>{`${new Date(
                        calc.calculation_date_time
                      ).toLocaleDateString()}  ${new Date(
                        calc.calculation_date_time
                      ).toLocaleTimeString()}`}</Col>
                      <Col className='py-2 text-center'>{calc.calculation_type}</Col>
                    </Row>
                  );
                }
              )}
            </Container>
          )}
          <button onClick={() => logout()} className='btn btn-primary fixed-bottom mx-2 mb-3'>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
