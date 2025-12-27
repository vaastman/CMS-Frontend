// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/Auth/AdminLogin";

function AppRoutes() {
  return (
    <Routes>
      {/* 🌐 Public Website */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* 🔐 Admin Login (PUBLIC) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 🛡️ Admin Panel (PROTECTED) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
