import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login/Login.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Root from "./components/Root/Root.tsx";
import Error from "./components/Error/Error.tsx";
import Home from "./components/Home/Home.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes.tsx";
import RestrictedRoutes from "./components/RestrictedRoutes/RestrictedRoutes.tsx";

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
      <Route
        index
        element={<Home />}
        loader={async () => {
          return null;
        }}
      />

      {/* <Route element={<RestrictedRoutes />}> */}
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      {/* </Route> */}

      {/* <Route element={<PrivateRoutes />}> */}
      <Route
        path='/dashboard'
        element={<Dashboard />}
        loader={async () => {
          /* const isAuth = false;

          if (!isAuth) {
            // redirect
            throw redirect("/login");
          } */
          const rand = Math.random() * 2;
          setTimeout(() => {
            console.log("Protected route");
          }, rand);
          return null;
        }}>
        <Route
          path='nested'
          element={<h1>Nested protected route</h1>}
          loader={async () => {
            const rand = Math.random() * 2;
            setTimeout(() => {
              console.log("Nested Protected route");
            }, rand);
            return null;
          }}
        />
      </Route>
      {/* </Route> */}
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
