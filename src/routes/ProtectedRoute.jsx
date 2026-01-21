import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null; // or loader

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
