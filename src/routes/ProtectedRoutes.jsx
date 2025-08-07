import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const role = localStorage.getItem("role");

    if (!role) return <Navigate to="/login" replace />;

    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;
