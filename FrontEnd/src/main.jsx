import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import NotFoundContainer from "./container/NotFoundContainer.jsx";
import HomeContainer from "./container/HomeContainer.jsx";
import { ContextProvider } from "./context/Global.context.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
