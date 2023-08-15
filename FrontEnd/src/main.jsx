import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import NotFoundContainer from "./container/NotFoundContainer.jsx";
import HomeContainer from "./container/HomeContainer.jsx";
import ProductDetailContainer from "./container/ProductDetailContainer.jsx";
import { ContextProvider } from "./context/Global.context.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme.jsx";
import { AdministratorPanelContainer } from "./container/AdministratorPanelContainer.jsx";
import ElementAdministratorPanelContainer from "./container/ElementAdministratorPanelContainer.jsx";
import CreateElementPanelContainer from "./container/CreateElementPanelContainer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundContainer />,
    children: [
      {
        index: true,
        path: "/",
        element: <HomeContainer />,
      },
      { path: "/product/:id", element: <ProductDetailContainer /> },
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
