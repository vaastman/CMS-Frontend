// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

function App() {
  return (
    <>
      {/* <Header />
      <Navbar /> */}
      <AppRoutes />
      {/* <Footer /> */}

      {/* GLOBAL SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />
    </>
  );
}

export default App;
