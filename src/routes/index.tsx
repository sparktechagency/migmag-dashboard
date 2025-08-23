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
        element: <DasboardHome />,
      },
      {
        path: "/manage-users",
        element: <Manage_Users />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/manage_song",
        element: <Manage_Song />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/top_artist",
        element: <Top_Artist />,
      },
      {
        path: "/manage-users/seller-profile/:id",
        element: <Seller_Profile />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/hero",
        element: <Hero />,
      },
      {
        path: "/my_profile",
        element: <MyProfile />,
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
]);

export default router;
