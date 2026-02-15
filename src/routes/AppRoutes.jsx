import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import ProtectedRoute from "./ProtectedRoute";

import AdminLogin from "../pages/Auth/AdminLogin";
// import AdminRegister from "../pages/Auth/AdminRegister";

function AppRoutes() {
  return (
    <Routes>
       {/* ================= ADMIN AUTH (PUBLIC) ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* <Route path="/admin/register" element={<AdminRegister />} /> */}

      {/* ================= ADMIN PANEL (PROTECTED) ================= */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* ================= PUBLIC WEBSITE ================= */}
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
