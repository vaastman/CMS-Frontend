// import { Route, Navigate } from "react-router-dom";
// import AdminLayout from "../components/layout/AdminLayout";

// import AdminDashboard from "../pages/Admin/AdminDashboard";
// import Course from "../pages/Admin/Course";
// import Exams from "../pages/Admin/Exams";
// import Notices from "../pages/Admin/Notices";
// import Setting from "../pages/Admin/Setting";

// import Admissions from "../pages/Admin/Admissions/Admissions";
// import AdmissionDetails from "../pages/Admin/Admissions/AdmissionDetails";
// import VerifyDocuments from "../pages/Admin/Admissions/VerifyDocuments";
// import AddStudent from "../pages/Admin/Admissions/AddStudent";

// import Payments from "../pages/Admin/Payments/Payments";
// import Receipts from "../pages/Admin/Payments/Receipts";
// import Dcr1 from "../pages/Admin/Payments/Dcr1";
// import Dcr2 from "../pages/Admin/Payments/Dcr2";

// import Departments from "../pages/Admin/Departments/Departments";
// import AuditLogs from "../pages/Admin/AuditLogs";
// import Sessions from "../pages/Admin/Sessions";

// import Students from "../pages/Admin/academics/Students";
// import StudentDetails from "../pages/Admin/academics/StudentDetails";

// import Subjects from "../pages/Admin/subject/Subjects";
// import SubjectMaster from "../pages/Admin/subject/SubjectMaster";
// import GalleryCreate from "../pages/Admin/cms/GalleryCreate";
// import NewsCreate from "../pages/Admin/cms/NewsCreate";
// import NoticeCreate from "../pages/Admin/cms/NoticeCreate";

// import AdmissionPortal from "../pages/Admin/admissionPortal/AdmissionPortal";
// import CreateAdmission from "../pages/Admin/admissionPortal/CreateAdmission";
// import EditAdmission from "../pages/Admin/admissionPortal/EditAdmission";

// import FeeDashboard from "../pages/Admin/feeManagement/FeeDashboard";
// import CollectFee from "../pages/Admin/feeManagement/CollectFee";
// import FeeHistory from "../pages/Admin/feeManagement/FeeHistory";
// import ManageFeeStructure from "../pages/Admin/feeManagement/ManageFeeStructure";

// const AdminRoutes = () => {
//   return (
//     <Route path="/admin" element={<AdminLayout />}>
//       {/* Dashboard */}
//       <Route index element={<AdminDashboard />} />

//       {/* Admissions */}
//       <Route path="admissions" element={<Admissions />} />
//       <Route path="admissions/add-student" element={<AddStudent />} />
//       <Route path="admissions/:id" element={<AdmissionDetails />} />
//       <Route path="admissions/:id/verify" element={<VerifyDocuments />} />

//       {/* Payments */}
//       <Route path="payments" element={<Payments />} />
//       <Route path="receipts" element={<Receipts />} />
//       <Route path="dcr1" element={<Dcr1 />} />
//       <Route path="dcr2" element={<Dcr2 />} />

//       {/* Academics */}
//       <Route path="students" element={<Students />} />
//       <Route path="students/:id" element={<StudentDetails />} />
//       <Route path="courses" element={<Course />} />
//       <Route path="exams" element={<Exams />} />
//       <Route path="sessions" element={<Sessions />} />
//       <Route path="add-subjects" element={<SubjectMaster />} />
//       <Route path="assign-subjects" element={<Subjects />} />

//       {/* Admission Portal */}
//       <Route path="admission-portal" element={<AdmissionPortal />} />
//       <Route path="admission-portal/create" element={<CreateAdmission />} />
//       <Route path="admission-portal/edit/:id" element={<EditAdmission />} />

//       {/* Fee Management */}
//       <Route path="fees" element={<FeeDashboard />} />
//       <Route path="fees/manage-structure" element={<ManageFeeStructure />} />
//       <Route path="fees/collect" element={<CollectFee />} />
//       <Route path="fees/history" element={<FeeHistory />} />

//       {/* CMS */}
//       <Route path="cms/gallery/create" element={<GalleryCreate />} />
//       <Route path="cms/news/create" element={<NewsCreate />} />
//       <Route path="cms/notices/create" element={<NoticeCreate />} />

//       {/* Others */}
//       <Route path="departments" element={<Departments />} />
//       <Route path="audit-logs" element={<AuditLogs />} />
//       <Route path="notices" element={<Notices />} />
//       <Route path="settings" element={<Setting />} />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/admin" replace />} />
//     </Route>
//   );
// };

// export default AdminRoutes;