import React, { Children } from "react";
import AddUser from "../pages/AddUser";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import AdminRoot from "../pages/AdminRoot";
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
    ],
  },
];

export default router;
