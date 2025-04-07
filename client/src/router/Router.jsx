import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../page/Home";
import Editor from "../page/Editor";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/editor/:id", element: <Editor /> },
    ],
  },
]);

export default Router;
