import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./components/Register.jsx";
import ContextProvider from "./AuthProvider/ContextProvider.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-cash-register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
