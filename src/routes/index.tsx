import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
import Manage_Users from "../pages/Manage_Users";
import Auth from "./../layout/auth/Auth";
import Login from "../pages/Login";
import SetNewPassword from "../pages/SetNewPassword";
import Seller_Profile from "../pages/Seller_Profile";
import Manage_Song from "../pages/ManageSong";
import Top_Artist from "../pages/Top_Artist";
import MyProfile from "../pages/MyProfile";
import Verify_Email from "../pages/Verify_Email";
import ForgetPassword from "../pages/ForgetPassword";
import Hero from "../pages/Hero";
import Transactions from "../pages/Transactions";
import Categories from "../pages/Categories";
import Register from "../pages/register";
import Order from "../pages/Order";
import PrivateRoute from "../private-router/PrivateRoute";
import NotFoundPage from "../component/not-found/NotFoundPage";

const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
  // Add your notification handling logic here
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard handleNotifications={handleNotifications} />,
    children: [
      {
        path: "/",
        element: <PrivateRoute> <DasboardHome /></PrivateRoute>,
      },
      {
        path: "/manage-users",
        element: <PrivateRoute> <Manage_Users /> </PrivateRoute>,
      },
      {
        path: "/categories",
        element: <PrivateRoute> <Categories /> </PrivateRoute>,
      },
      {
        path: "/manage_song",
        element: <PrivateRoute> <Manage_Song /> </PrivateRoute>,
      },
      {
        path: "/order",
        element: <PrivateRoute> <Order /> </PrivateRoute>,
      },
      {
        path: "/top_artist",
        element: <PrivateRoute> <Top_Artist /></PrivateRoute>,
      },
      {
        path: "/manage-users/seller-profile/:id",
        element: <PrivateRoute> <Seller_Profile /> </PrivateRoute>,
      },
      {
        path: "/transactions",
        element: <PrivateRoute><Transactions /> </PrivateRoute>,
      },
      {
        path: "/hero",
        element: <PrivateRoute> <Hero /> </PrivateRoute>,
      },
      {
        path: "/my_profile",
        element: <PrivateRoute> <MyProfile /> </PrivateRoute>,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/verify-email",
        element: <Verify_Email />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/set-new-password",
        element: <SetNewPassword />,
      },
    ],
  },
  {
    path : "*",
    element : <NotFoundPage></NotFoundPage>
  }
]);

export default router;
