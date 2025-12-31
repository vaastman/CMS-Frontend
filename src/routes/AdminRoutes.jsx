import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import Staff from "../pages/Admin/Staff";
import Course from "../pages/Admin/Course";
import Exams from "../pages/Admin/Exams";
import Notices from "../pages/Admin/Notices";
import Setting from "../pages/Admin/Setting";

/* NEW */
import Admissions from "../pages/Admin/Admissions/Admissions";
import AdmissionDetails from "../pages/Admin/Admissions/AdmissionDetails";
import VerifyDocuments from "../pages/Admin/Admissions/VerifyDocuments";
import Payments from "../pages/Admin/Payments/Payments";
import Receipts from "../pages/Admin/Payments/Receipts";
import Departments from "../pages/Admin/Departments/Departments";
import AuditLogs from "../pages/Admin/AuditLogs";
import Sessions from "../pages/Admin/Sessions";
// import DCRSection from "../pages/Admin/Payments/DCRSection";
import Finance from "../pages/Admin/Payments/Finance";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />

        <Route path="admissions" element={<Admissions />} />
        <Route path="admissions/:id" element={<AdmissionDetails />} />
        <Route path="admissions/:id/verify" element={<VerifyDocuments />} />

        <Route path="payments" element={<Payments />} />
        <Route path="receipts" element={<Receipts />} />

        <Route path="departments" element={<Departments />} />
        <Route path="audit-logs" element={<AuditLogs />} />

        <Route path="staff" element={<Staff />} />
        <Route path="courses" element={<Course />} />
        <Route path="exams" element={<Exams />} />
        <Route path="notices" element={<Notices />} />
        <Route path="settings" element={<Setting />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="dcr-section" element={<Finance />} />

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
