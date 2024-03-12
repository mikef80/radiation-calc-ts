import { Link } from "react-router-dom";
import Warning from "../Warning/Warning";

const Home = () => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    return (
      <>
        <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
          <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white d-flex flex-column'>
            <h3 className='text-center'>Welcome to RadCalc</h3>
            <p>
              To continue, either <Link to='/login'>Login</Link> or{" "}
              <Link to='/signup'>Sign up</Link>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Warning />
      <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
        <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white d-flex flex-column'>
          <h3 className='text-center'>Home</h3>
          <Link to='/calculations/new-rdc' className='btn btn-primary '>
            Radiation Dose Calculator
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
