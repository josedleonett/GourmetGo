import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
        path: "/admin",
        element: <AdminContainer />,
        children: [
          { path: "/admin/:bundles" },
          {
            path: "/admin/plates",
            children: [
              { path: "/admin/plates/:starter" },
              { path: "/admin/plates/:mainCourse" },
              { path: "/admin/plates/:dessert" },
            ],
          },
          { path: "/admin/:drinks" },
          { path: "/admin/:categories" },
        ],
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
