import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <NavBar />
      <div
        className='p-2 d-flex flex-column justify-content-center bg-dark'
        // style={{ height: `calc(100vh - 60.14px)` }}
        /* style={{
          height: `calc(100vh - 60.14px)`,
          bottom: 0,
          left: 0,
          position: "absolute",
          width: "100%",
        }} */
        style={{ height: `100vh` }} // I think this one is best
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;
