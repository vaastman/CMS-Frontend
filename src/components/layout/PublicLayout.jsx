import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />    
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
