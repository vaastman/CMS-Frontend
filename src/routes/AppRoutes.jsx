import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* ================= LAYOUTS ================= */
import AdminLayout from "../components/layout/AdminLayout";
import PublicLayout from "../components/layout/PublicLayout";

/* ================= AUTH ================= */
import AdminLogin from "../pages/Auth/AdminLogin";

/* ================= ADMIN PAGES ================= */
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Course from "../pages/Admin/Course";
import Exams from "../pages/Admin/Exams";
import Notices from "../pages/Admin/Notices";
import Setting from "../pages/Admin/Setting";

import Admissions from "../pages/Admin/Admissions/Admissions";
import AdmissionDetails from "../pages/Admin/Admissions/AdmissionDetails";
import VerifyDocuments from "../pages/Admin/Admissions/VerifyDocuments";
import AddStudent from "../pages/Admin/Admissions/AddStudent";

import Payments from "../pages/Admin/Payments/Payments";
import Receipts from "../pages/Admin/Payments/Receipts";
import Dcr1 from "../pages/Admin/Payments/Dcr1";
import Dcr2 from "../pages/Admin/Payments/Dcr2";

import Departments from "../pages/Admin/Departments/Departments";
import AuditLogs from "../pages/Admin/AuditLogs";
import Sessions from "../pages/Admin/Sessions";

import Students from "../pages/Admin/academics/Students";
import StudentDetails from "../pages/Admin/academics/StudentDetails";

// import Subjects from "../pages/Admin/subject/Subjects";
// import SubjectMaster from "../pages/Admin/subject/SubjectMaster";

import GalleryCreate from "../pages/Admin/cms/GalleryCreate";
import NewsCreate from "../pages/Admin/cms/NewsCreate";
import NoticeCreate from "../pages/Admin/cms/NoticeCreate";

import AdmissionPortal from "../pages/Admin/admissionPortal/AdmissionPortal";
import CreateAdmission from "../pages/Admin/admissionPortal/CreateAdmission";
import EditAdmission from "../pages/Admin/admissionPortal/EditAdmission";

import FeeDashboard from "../pages/Admin/feeManagement/FeeDashboard";
import CollectFee from "../pages/Admin/feeManagement/CollectFee";
import FeeHistory from "../pages/Admin/feeManagement/FeeHistory";
import ManageFeeStructure from "../pages/Admin/feeManagement/ManageFeeStructure";

/* ================= PUBLIC PAGES ================= */
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Campus from "../pages/Campus";
import Gallery from "../components/Gallery";
import NotFound from "../components/common/NotFound";

import AboutCollege from "../pages/about/AboutCollege";
import VisionMission from "../pages/about/VisionMission";
import PrincipalDesk from "../pages/about/PrincipalDesk";

import Courses from "../pages/admission/Courses";
import OnlineAdmission from "../pages/admission/OnlineAdmission";
import AdmissionProcess from "../pages/admission/AdmissionProcess";
import NewAdmission from "../pages/admission/NewAdmission";
import AdmissionHome from "../pages/admission/AdmissionHome";
import StudentRegistration from "../pages/admission/StudentRegistration";
import StudentAdmissionDetails from "../pages/admission/StudentAdmissionDetails";
// import AdmissionPayment from "../pages/admission/AdmissionPayment";
import DocumentUpload from "../pages/admission/DocumentUpload";

import Faculty from "../pages/academics/Faculty";
import Staff from "../pages/academics/Staff";
import Holidays from "../pages/academics/Holidays";
import Certificates from "../pages/academics/Certificates";
import Calendar from "../pages/academics/Calender";
import Examination from "../pages/examination/Examination";

import Attendence from "../pages/Student Support/Attendence";
import AntiRagging from "../pages/Student Support/AntiRagging";
import RulesRegulations from "../pages/Student Support/RulesRegulations";
import StudentGrievance from "../pages/Student Support/StudentGrievance";

import RefundPolicy from "../pages/RefundPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import ApplyCertificate from "../pages/Student Support/Certificate/ApplyCertificate";
import CertificateForm from "../pages/Student Support/Certificate/CertificateForm";
import CertificateConfirmation from "../pages/Student Support/Certificate/CertificateConfirmation";
import CertificatePaymentSuccess from "../pages/Student Support/Certificate/CertificatePaymentSuccess";
import CertificatePaymentResult from "../pages/Student Support/Certificate/CertificatePaymentResult";
import AdminCertificates from "../pages/Admin/certificates/AdminCertificates";
import CertificateDetails from "../pages/Admin/certificates/CertificateDetails";
import PaymentProcessing from "../pages/payment/PaymentProcessing";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import StudentAdmissionPayment from "../pages/payment/StudentAdmissionPayment";
import CreateStudentAdmission from "../pages/Admin/Admissions/CreateStudentAdmission";
import PaymentResult from "../pages/payment/PaymentResult";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= ADMIN LOGIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ================= ADMIN PANEL (PROTECTED) ================= */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        {/* Admissions */}
        <Route path="admissions" element={<Admissions />} />
        <Route path="admissions/add-student" element={<AddStudent />} />
        <Route path="admissions/create" element={<CreateStudentAdmission />} />
        <Route path="admissions/:id" element={<AdmissionDetails />} />
        <Route path="admissions/:id/verify" element={<VerifyDocuments />} />

        {/* Admission Portal */}
        <Route path="admission-portal" element={<AdmissionPortal />} />
        <Route path="admission-portal/create" element={<CreateAdmission />} />
        <Route path="admission-portal/edit/:id" element={<EditAdmission />} />

        {/* Academics */}
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="courses" element={<Course />} />
        <Route path="exams" element={<Exams />} />
        <Route path="sessions" element={<Sessions />} />

        {/* Payments */}
        <Route path="payments" element={<Payments />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="dcr1" element={<Dcr1 />} />
        <Route path="dcr2" element={<Dcr2 />} />

        {/* Fee */}
        <Route path="fees" element={<FeeDashboard />} />
        <Route path="fees/manage-structure" element={<ManageFeeStructure />} />
        <Route path="fees/collect" element={<CollectFee />} />
        <Route path="fees/history" element={<FeeHistory />} />

        {/* Certificate */}
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="certificates/:id" element={<CertificateDetails />} />

        {/* CMS */}
        <Route path="cms/gallery/create" element={<GalleryCreate />} />
        <Route path="cms/news/create" element={<NewsCreate />} />
        <Route path="cms/notices/create" element={<NoticeCreate />} />

        <Route path="departments" element={<Departments />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<Setting />} />

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* ================= PUBLIC WEBSITE ================= */}
      <Route path="/" element={<PublicLayout />}>

        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="campus" element={<Campus />} />
        <Route path="gallery" element={<Gallery />} />

        <Route path="about_college" element={<AboutCollege />} />
        <Route path="vision-mission" element={<VisionMission />} />
        <Route path="principle-desk" element={<PrincipalDesk />} />

        {/* Admission Public */}
        <Route path="Online-admission-form" element={<OnlineAdmission />} />
        <Route path="courses-and-subject" element={<Courses />} />
        <Route path="admissions-process" element={<AdmissionProcess />} />
        <Route path="admission/new" element={<NewAdmission />} />
        <Route path="admission/admission-portal" element={<AdmissionHome />} />
        <Route path="admission/student-registration" element={<StudentRegistration />} />

        {/* <Route path="student/details/:id" element={<StudentAdmissionDetails />} />
        <Route path="student/admission/:id/payment" element={<StudentAdmissionPayment />} />
       <Route 
  path="student/document-upload/:admissionId/verify" 
  element={<DocumentUpload />} 
/>
        <Route path="student/payment-gateway/:id" element={<PaymentGatewayMock />} /> */}
        {/* Student Flow */}
<Route path="student/details/:id" element={<StudentAdmissionDetails />} />

<Route
  path="student/document-upload/:admissionId/verify"
  element={<DocumentUpload />}
/>

<Route
  path="student/admission/:admissionId/payment"
  element={<StudentAdmissionPayment />}
/>

<Route
  path="payment-processing"
  element={<PaymentProcessing />}
/>

<Route
  path="payment-success/:paymentId"
  element={<PaymentSuccess />}
/>
<Route
  path="/payment-result"
  element={<PaymentResult />}
/>
        {/* Academics */}
        <Route path="faculty" element={<Faculty />} />
        <Route path="staff" element={<Staff />} />
        <Route path="holidays" element={<Holidays />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="examination" element={<Examination />} />

        {/* Student Support */}
        <Route path="attendence" element={<Attendence />} />
        <Route path="anti-ragging" element={<AntiRagging />} />
        <Route path="rules-regulations" element={<RulesRegulations />} />
        <Route path="student-grievance" element={<StudentGrievance />} />

        {/* Certificate Apply Public Route */}
        <Route path="apply-certificate" element={<CertificateForm />} />
        <Route path="certificate/confirmation" element={<CertificateConfirmation />} />
        <Route path="certificate/payment-success/:paymentId" element={<CertificatePaymentSuccess />} />
        <Route path="certificate/payment-result" element={<CertificatePaymentResult />} />

        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-conditions" element={<TermsConditions />} />

        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;