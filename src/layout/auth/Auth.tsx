import React from "react";
import { Outlet } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <div className="auth-wrapper">
      <div className="bg-[#ffffff] max-h-screen overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};
export default Auth;
