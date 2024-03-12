import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <NavBar />
      <div
        className='p-2 d-flex flex-column justify-content-center bg-dark'
        style={{ height: `100vh` }}>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
