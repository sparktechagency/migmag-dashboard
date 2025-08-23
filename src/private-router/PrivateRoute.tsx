import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const location = useLocation()

    const token = localStorage.getItem("admin_token");

    return token ? children : <Navigate replace to="/auth/login" state={{ pathname: location.pathname }} />;
};

export default PrivateRoute; 