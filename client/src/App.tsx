import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Root from "./components/Root/Root.tsx";
import Error from "./components/Error/Error.tsx";
import Home from "./components/Home/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
