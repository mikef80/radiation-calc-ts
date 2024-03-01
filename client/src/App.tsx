import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./components/Login/Login.tsx";
import { loader as dashboardLoader } from "./components/Dashboard/Dashboard.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Root from "./components/Root/Root.tsx";
import Home from "./components/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import CalculationDetails from "./components/CalculationDetails/CalculationDetails.tsx";
import CalculationInput from "./components/CalculationInput/CalculationInput.tsx";
import RestrictedRoutes from "./components/RestrictedRoutes/RestrictedRoutes.tsx";

const isAuth = localStorage.getItem("isAuth");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} /* errorElement={<Error />} */>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path='/dashboard' element={<Dashboard />} loader={dashboardLoader} />
      <Route path='/calculations/:calculation_id' element={<CalculationDetails />} />
      <Route path='/calculations/new-rdc' element={<CalculationInput />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
