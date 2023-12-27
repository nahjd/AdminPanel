import React, { Children } from "react";
import AddUser from "../pages/AddUser";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import AdminRoot from "../pages/AdminRoot";
import Detail from "../components/detail";
import Notification from "../pages/Notification";
const router = [
  {
    path: "/",
    element: <AdminRoot />,

    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "/:id",
        element: <Detail />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
];

export default router;
