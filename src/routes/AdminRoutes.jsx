// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import Course from "../pages/Admin/Course";
import Exams from "../pages/Admin/Exams";
import Notices from "../pages/Admin/Notices";
import Setting from "../pages/Admin/Setting";

import Admissions from "../pages/Admin/Admissions/Admissions";
import AdmissionDetails from "../pages/Admin/Admissions/AdmissionDetails";
import VerifyDocuments from "../pages/Admin/Admissions/VerifyDocuments";
import Payments from "../pages/Admin/Payments/Payments";
import Receipts from "../pages/Admin/Payments/Receipts";
import Departments from "../pages/Admin/Departments/Departments";
import AuditLogs from "../pages/Admin/AuditLogs";
import Sessions from "../pages/Admin/Sessions";
import Students from "../pages/Admin/academics/Students";
import Dcr1 from "../pages/Admin/Payments/Dcr1";
import Dcr2 from "../pages/Admin/Payments/Dcr2";
import StudentDetails from "../pages/Admin/academics/StudentDetails";
import Subjects from "../pages/Admin/subject/Subjects";
import SubjectMaster from "../pages/Admin/subject/SubjectMaster";
import AddStudent from "../pages/Admin/Admissions/AddStudent";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        {/* Dashboard */}
        <Route index element={<AdminDashboard />} />

        {/* Admissions */}
        <Route path="admissions" element={<Admissions />} />
        <Route path="admissions/:id" element={<AdmissionDetails />} />
        <Route path="admissions/:id/verify" element={<VerifyDocuments />} />

        {/* Payments */}
        <Route path="payments" element={<Payments />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="dcr1" element={<Dcr1 />} />
        <Route path="dcr2" element={<Dcr2 />} />

        {/* Academics */}
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="courses" element={<Course />} />
        <Route path="exams" element={<Exams />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="add-subjects" element={<SubjectMaster />} />
        <Route path="assign-subjects" element={<Subjects />} />
       // Admissions
        <Route path="admissions" element={<Admissions />} />
        <Route path="admissions/add-student" element={<AddStudent />} />
        <Route path="admissions/:id" element={<AdmissionDetails />} />
        <Route path="admissions/:id/verify" element={<VerifyDocuments />} />



        {/* Others */}
        <Route path="departments" element={<Departments />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="notices" element={<Notices />} />
        <Route path="settings" element={<Setting />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
