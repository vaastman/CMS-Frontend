import React from "react";
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const AboutCollege = () => {
  return (
    <div className="w-full bg-[color:var(--color-page)]">

      {/* ===== HERO SECTION ===== */}
      <div
        className="relative h-[320px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-white text-4xl md:text-5xl font-semibold">
            About Us
          </h1>
        </div>
      </div>

      {/* ===== ANNOUNCEMENT BAR ===== */}
      <div className="bg-[color:var(--color-secondary)] text-white py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4 text-sm">
          <span className="font-semibold whitespace-nowrap">
            IMPORTANT ANNOUNCEMENTS
          </span>
          <span className="opacity-80">|</span>

          {/* Marquee replacement */}
          <div className="relative overflow-hidden w-full">
            <div className="whitespace-nowrap animate-marquee">
              UG Regular Sem-1 (2025) › Regarding Admission of 2nd Sem-2025 ›
              Regarding Admission Payment of 4th Sem (2025)
            </div>
          </div>
        </div>
      </div>

      {/* ===== BREADCRUMB ===== */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-[color:var(--color-text-secondary)]">
        Home <FaChevronRight className="inline mx-2 text-xs" /> Academics
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ===== LEFT SIDEBAR ===== */}
        <aside className="md:col-span-1">
          <h3 className="font-semibold mb-4 pb-2 border-b border-[color:var(--color-divider)] text-[color:var(--color-primary)]">
            Sub Menu
          </h3>

          <ul className="space-y-3 text-sm">
            {[
              "About College",
              "Academics",
              "Administration",
              "Courses",
              "Admission",
              "Infrastructure",
              "Student Corner",
              "Others",
              "Contact us",
            ].map((item, i) => (
              <li key={i}>
                <NavLink
                  to="#"
                  className="block text-[color:var(--color-text-primary)] hover:text-[color:var(--color-primary)] transition"
                >
                  • {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== RIGHT CONTENT ===== */}
        <section className="md:col-span-3 p-8 leading-7 text-[color:var(--color-text-primary)]">
          <p className="mb-4">
            Sant Sandhya Das Mahila College, Barh (Patna) received affiliation
            up to graduate prestige level by Patliputra University, Patna and
            Government of Bihar. Organization’s ability to expand Sandhya Das,
            the saint of flood situated on the banks of Ganga, the meeting place
            of Mithila and Magadh.
          </p>

          <p className="mb-4">
            The college got the only affiliation from Barhiyai to Patna City and
            Barh situated in the middle of Patna City. It is an important center
            of women’s education which since 1978 has been a symbol of
            historical, educational and cultural tolerance.
          </p>

          <p className="mb-4">
            It is an immortal symbol and has its limitless potential for
            expansion embedded in its numbers.
          </p>

          <p className="mb-4">
            (a) Affiliated college with wide land of the college, playground,
            well-organized laboratory, library and good educational environment
            up to graduate prestige level.
          </p>

          <p className="mb-4">
            (b) This college, situated near the National Highway, is slowly
            growing like moonlight, occupying its place of progress in a
            philosophical posture.
          </p>

          <p>
            (c) For better arrangement of women’s education, arrangements for
            conducting vocational courses can be developed in this college.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutCollege;
