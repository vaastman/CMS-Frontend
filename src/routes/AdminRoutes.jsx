// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
// import ManageEvents from "../pages/Admin/ManageEvents";
// import ManagePrograms from "../pages/Admin/ManagePrograms";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        {/* <Route path="/events" element={<ManageEvents />} />
        <Route path="/programs" element={<ManagePrograms />} /> */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
