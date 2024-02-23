import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login /* { loader as loginLoader } */, {
  action as loginAction,
} from "./components/Login/Login.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Root from "./components/Root/Root.tsx";
import Error from "./components/Error/Error.tsx";
import Home from "./components/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes.tsx";
import RestrictedRoutes from "./components/RestrictedRoutes/RestrictedRoutes.tsx";
import { useSelector } from "react-redux";
import { requireAuth } from "./components/utils/utils.tsx";

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
        element: <PrivateRoutes />,
        children: [{ element: <Dashboard /> }],
      },
    ],
  },
]); */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} /* loader={loginLoader} */ action={loginAction} />
      <Route
        path='/dashboard'
        element={<Dashboard />}
        loader={async () => await requireAuth()}
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
