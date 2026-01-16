import React from "react";
import Slider from "../components/Slider";
import { assets } from "../assets/assest";
import AnnouncementBar from "../components/AnnouncementBar";
import NoticeAndPrincipal from "./NoticeAndPrincipal";
import About from "./About";
import Programs from "../components/Programs";
import QuickLinks from "../components/QuickLinks";
import Events from "../components/Events";

const Home = () => {
  return (
    <div className="bg-[var(--color-page)]">

      {/* ================= HERO SECTION ================= */}
      <section>
        <Slider
          images={[
            assets.slider1,
            assets.slider2,
            assets.slider3,
            assets.art01,
            assets.art02,
            assets.art03,
          ]}
        />
      </section>

      {/* ================= ANNOUNCEMENT ================= */}
      <section className="sticky top-0 z-40">
        <AnnouncementBar />
      </section>

      {/* ================= NOTICE + PRINCIPAL ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <NoticeAndPrincipal />
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <About />
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <Programs />
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}
      <section className="bg-[var(--color-surface)] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <QuickLinks />
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <Events />
        </div>
      </section>

    </div>
  );
};

export default Home;
