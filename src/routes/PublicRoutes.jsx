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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PublicRoutes;
