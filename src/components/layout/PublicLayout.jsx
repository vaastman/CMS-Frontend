import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;