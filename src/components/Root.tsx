import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className='vh-100 p-0 d-flex flex-column grow'>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
