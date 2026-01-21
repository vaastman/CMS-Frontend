import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  // ⏳ Wait until auth state is restored
  if (loading) return null;

  // ❌ Not admin → redirect
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
