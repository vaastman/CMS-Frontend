// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAdmin } = useAuth();
    return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
