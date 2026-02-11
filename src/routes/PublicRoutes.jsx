import { Routes, Route } from "react-router-dom";

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
import Faculty from "../pages/academics/Faculty";
import Staff from "../pages/academics/Staff";
import Holidays from "../pages/academics/Holidays";
import Certificates from "../pages/academics/Certificates";
import Calendar from "../pages/academics/Calender";
import Examination from "../pages/examination/Examination";
// import Examination from "../pages/academics/Examination";
// import Scholarship from "../pages/academics/Scholarship";
// import Grievance from "../pages/academics/Grievance";
import PublicLayout from "../components/layout/PublicLayout";
import Attendence from "../pages/Student Support/Attendence";
import AntiRagging from "../pages/Student Support/AntiRagging";
import RulesRegulations from "../pages/Student Support/RulesRegulations";
import StudentGrievance from "../pages/Student Support/StudentGrievance";
import OnlineAdmission from "../pages/admission/OnlineAdmission";
import AdminRegister from "../pages/Auth/AdminRegister";
import AdminLogin from "../pages/Auth/AdminLogin";
import AdmissionProcess from "../pages/admission/AdmissionProcess";
import NewAdmission from "../pages/admission/NewAdmission";
import AdmissionHome from "../pages/admission/AdmissionHome";
import StudentRegistration from "../pages/admission/StudentRegistration";
import StudentAdmissionDetails from "../pages/admission/StudentAdmissionDetails";
import AdmissionPayment from "../pages/admission/AdmissionPayment";
import DocumentUpload from "../pages/admission/DocumentUpload";
import RefundPolicy from "../pages/RefundPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
function PublicRoutes() {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="/about_college" element={<AboutCollege />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/principle-desk" element={<PrincipalDesk />} />
        <Route path="/Online-admission-form" element={<OnlineAdmission />} />
        <Route path="/courses-and-subject" element={<Courses />} />
        <Route path="/admissions-process" element={<AdmissionProcess />} />
        <Route path="/admission/new" element={<NewAdmission />} />
        <Route path="/admission/admission-portal" element={<AdmissionHome />} />
        <Route path="/admission/student-registration" element={<StudentRegistration />} />

        <Route path="/faculty" element={<Faculty />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/examination" element={<Examination />} />
        <Route path="/attendence" element={<Attendence />} />
        <Route path="/anti-ragging" element={<AntiRagging />} />
        <Route path="/rules-regulations" element={<RulesRegulations />} />
        <Route path="/student-grievance" element={<StudentGrievance />} />
        <Route
          path="/student/details/:id"
          element={<StudentAdmissionDetails />}
        />
        <Route
          path="/student/admission/:id/payment"
          element={<AdmissionPayment />}
        />
        <Route
          path="/student/document-upload/:admissionId/verify"
          element={<DocumentUpload />}
        />

        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </PublicLayout>
  );
}

export default PublicRoutes;
