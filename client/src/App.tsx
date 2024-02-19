import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  redirect,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login/Login.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Root from "./components/Root/Root.tsx";
import Error from "./components/Error/Error.tsx";
import Home from "./components/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import { useSelector } from "react-redux";

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => {
          const isAuth = useSelector((state: any) => state.auth);
          if (isAuth) {
            console.log("authorised");

            return <Outlet />;
          }
          console.log("not authorised");

          throw redirect("/login");
        },
      },
      // { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]); */


const router = createBrowserRouter(createRoutesFromElements([]))
const App = () => {
  const isAuth = useSelector((state: any) => state.auth);
  return <RouterProvider router={router} />;
};

export default App;
