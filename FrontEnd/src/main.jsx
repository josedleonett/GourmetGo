import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { ContextProvider } from "./context/Global.context.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme.jsx";

import App from "./App.jsx";
import NotFoundContainer from "./pages/container/NotFoundContainer.jsx";
import HomeContainer from "./pages/container/HomeContainer.jsx";
import ProductDetailContainer from "./pages/container/ProductDetailContainer.jsx";
import { AdministratorPanelContainer } from "./pages/container/AdministratorPanelContainer.jsx";
import ElementAdministratorPanelContainer from "./pages/container/ElementAdministratorPanelContainer.jsx";
import CreateElementPanelContainer from "./components/container/CreateElementPanelContainer.jsx";
import AdminContainer from "./pages/container/AdminContainer";
import UserRegisterContainer from "./components/container/UserRegisterContainer";
import UserLoginContainer from "./components/container/UserLoginContainer"
import CategoryFilterContainer from "./components/container/CategoryFilterContainer";

const accessToken = localStorage.getItem("accessToken");
const role = localStorage.getItem("role");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundContainer />,
    children: [
      {
        index: true,
        path: "",
        element: <HomeContainer />,
      },
      { path: "/product/:id", element: <ProductDetailContainer /> },
      {
        path: "admin/*",
        element:
          accessToken !== null && role === "ADMIN" ? (
            <AdminContainer />
          ) : (
            <Navigate to="/" replace />
          ),
      },
      {
        path: "/administration-panel",
        element: <AdministratorPanelContainer />,
      },
      {
        path: "/administration-panel/:category",
        element: <ElementAdministratorPanelContainer />,
      },
      {
        path: "/administration-panel/:category/edit",
        element: <CreateElementPanelContainer />,
      },
      {
        path: "/user-register",
        element: <UserRegisterContainer />,
      },
      {
        path: "/user-login",
        element: <UserLoginContainer />,
      },
      {
        path: "/category/:id",
        element: <CategoryFilterContainer />,
      },
      {
        path: "*",
        element: <NotFoundContainer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
