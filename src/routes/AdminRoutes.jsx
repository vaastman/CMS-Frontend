import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";

// temporary auth check
const isAdmin = true; 

function AdminRoutes() {
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      {/* future routes */}
      {/* <Route path="events" element={<ManageEvents />} /> */}
    </Routes>
  );
}

export default AdminRoutes;
