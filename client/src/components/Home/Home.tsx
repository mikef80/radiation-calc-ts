import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white d-flex flex-column">
        <h3 className='text-center'>Home</h3>
        <Link to="/calculations/new-rdc" className="btn btn-primary ">Radiation Dose Calculator</Link>
      
      </div>
    </div>
  );
};

export default Home;
