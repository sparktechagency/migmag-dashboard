import React from "react";

const AuthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={` p-8 rounded-3xl ${className}`}>
      {children}
    </div>
  );
};

export default AuthWrapper;
