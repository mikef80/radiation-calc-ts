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
import Error from "./components/Error/Error.tsx";
import Home from "./components/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import { requireAuth } from "./components/utils/utils.tsx";
import CalculationDetails, {
  action as calculationAction,
} from "./components/CalculationDetails/CalculationDetails.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} /* errorElement={<Error />} */>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path='/dashboard' element={<Dashboard />} loader={dashboardLoader}>
        {/* <Route
          path='calculations/:calculation_id'
          element={<CalculationDetails />}
        /> */}
      </Route>
      <Route path='/calculations/:calculation_id' element={<CalculationDetails />} />
      <Route
        path='/calculations/new'
        element={<CalculationDetails />}
        action={calculationAction}
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
