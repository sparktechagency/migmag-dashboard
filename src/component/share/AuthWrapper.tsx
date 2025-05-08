import React from "react";

const AuthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={` px-14 max-h-screen py-4 rounded-3xl ${className}`}>
      {children}
    </div>
  );
};

export default AuthWrapper;
