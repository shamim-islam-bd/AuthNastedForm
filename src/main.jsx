import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

// baerer token from cookies authorization
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";

// get token from localstorage and set it to axios header
const token = JSON.parse(localStorage.getItem("token"));
// axios.defaults.headers.common["Authorization"] = token;

// axios.defaults.headers.common["Authorization"] = `Bearer ${document.cookie}`;
// const token = document.cookie.split("token=")[1];
// console.log("token frm main.js: ", token);
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register/",
    element: <Register />,
  },
  {
    path: "login/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
