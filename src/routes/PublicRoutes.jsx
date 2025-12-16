import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Campus from "../pages/Campus";
import Gallery from "../components/Gallery";
import NotFound from "../components/common/NotFound";
import AboutCollege from "../pages/about/AboutCollege";
import VisionMission from "../pages/about/VisionMission";
import PrincipalDesk from "../pages/about/PrincipalDesk";
import Courses from "../pages/admission/Courses";
import Admission from "../pages/admission/Admission";
import Faculty from "../pages/academics/Faculty";
import Staff from "../pages/academics/Staff";
import Holidays from "../pages/academics/Holidays";
import Certificates from "../pages/academics/Certificates";
import Calendar from "../pages/academics/Calender";
// import Examination from "../pages/academics/Examination";
// import Scholarship from "../pages/academics/Scholarship";
// import Grievance from "../pages/academics/Grievance";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/campus" element={<Campus />} />
      <Route path="/about_college" element={<AboutCollege />} />
      <Route path="/vision-mission" element={<VisionMission />} />
      <Route path="/principle-desk" element={<PrincipalDesk />} />
      <Route path="/Online-admission-form" element={<Home />} />
      <Route path="/courses-and-subject" element={<Courses />} />
      <Route path="/admissions-process" element={<Admission />} />
      <Route path="/faculty" element={<Faculty />}/>
      <Route path="/staff" element={<Staff />}/>
      <Route path="/holidays" element={<Holidays />}/>
      <Route path="/certificates" element={<Certificates />}/>
      <Route path="/calendar" element={<Calendar />}/>
      {/* <Route path="/examination" element={<Examination />}/>
      <Route path="/scholarship" element={<Scholarship />}/>
      <Route path="/grievance" element={<Grievance />}/> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PublicRoutes;
