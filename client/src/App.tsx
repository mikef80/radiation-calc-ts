import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login, { loader as loginLoader } from "./components/Login/Login.tsx";
import { loader as dashboardLoader } from "./components/Dashboard/Dashboard.tsx";
import { loader as signUpLoader } from "./components/Signup/Signup.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Root from "./components/Root/Root.tsx";
import Home from "./components/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import CalculationDetails from "./components/CalculationDetails/CalculationDetails.tsx";
import CalculationInput from "./components/CalculationInput/CalculationInput.tsx";

const routerSetup = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path='/signup' element={<Signup />} loader={signUpLoader} />
        <Route path='/login' element={<Login />} loader={loginLoader} />
        <Route path='/dashboard' element={<Dashboard />} loader={dashboardLoader} />
        <Route path='/calculations/:calculation_id' element={<CalculationDetails />} />
        <Route path='/calculations/new-rdc' element={<CalculationInput />} />
      </Route>
    )
  );

  return router;
};

const App = () => {
  const router = routerSetup();
  return <RouterProvider router={router} />;
};

export default App;
