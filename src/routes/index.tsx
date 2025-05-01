import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
import ProductListing from "../pages/ManageSong";
import Category_Management from "../pages/Category_Management";
import Manage_Users from "../pages/Manage_Users";
import Love from "../pages/Love";
import Notifications from "../pages/Notifications";
import Auth from './../layout/auth/Auth';
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import SetNewPassword from "../pages/SetNewPassword";
import Seller_Profile from "../pages/Seller_Profile";
import Manage_Song from "../pages/ManageSong";
import Top_Artist from "../pages/Top_Artist";
import MyProfile from "../pages/MyProfile";



const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("16++++++++++++++Notification clicked!");
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
                path: "/notifications",
                element: <Notifications />,
            },
            {
                path: "/manage_song",
                element: <Manage_Song/>,
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
                path: "/my_profile",
                element: <MyProfile />,
            },
        ]
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
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/forget-password",
            element: <ForgetPassword />,
          },
          {
            path: "/auth/verify",
            element: <VerifyEmail />,
          },
          {
            path: "/auth/set-new-password",
            element: <SetNewPassword />,
          },
                 
        ],
      },
])

export default router;