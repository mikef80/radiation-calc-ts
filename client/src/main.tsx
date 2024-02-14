import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login.tsx";
import Signup from "./components/Signup/Signup.tsx";
import Root from "./components/Root/Root.tsx";
import Error from "./components/Error/Error.tsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.tsx";

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <App /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    {/* <RouterProvider router={router} /> */}
  </Provider>
);
