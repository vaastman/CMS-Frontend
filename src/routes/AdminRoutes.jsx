// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Staff from "../pages/Admin/Staff";
import Course from "../pages/Admin/Course";
import Setting from "../pages/Admin/Setting";
import Exams from "../pages/Admin/Exams";
import Notices from "../pages/Admin/Notices";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
