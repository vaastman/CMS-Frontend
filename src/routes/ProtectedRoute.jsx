import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      Loading...
    </div>;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
