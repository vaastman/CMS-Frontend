import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Programs = () => {
  return (
    <section className="w-full py-20 bg-[var(--color-page)]">

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-serif font-bold
                     text-center mb-16
                     text-[var(--color-text-primary)]">
        Academics & Programs
      </h1>

      {/* 3 Columns Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

        {/* ================= UNDERGRADUATE ================= */}
        <div className="bg-[var(--color-surface)] p-10 rounded-xl shadow-sm border border-[var(--color-divider)]">
          <h2 className="text-3xl font-serif font-semibold mb-6
                         text-[var(--color-primary)]">
            Undergraduate
          </h2>

          <div className="space-y-4">
            {[
              "Bachelor of Arts (B.A.) — Political Science",
              "Bachelor of Arts (B.A.) — Psychology",
              "Bachelor of Commerce (B.Com) — Self Finance",
              "Bachelor of Science (B.Sc) — Zoology",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[var(--color-divider)] rounded-lg
                           px-4 py-3 flex justify-between items-center
                           cursor-pointer transition
                           hover:bg-[var(--color-page)]"
              >
                <span className="text-sm text-[var(--color-text-primary)]">
                  {item}
                </span>
                <AiOutlineArrowRight
                  size={20}
                  className="text-[var(--color-primary)]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= POST GRADUATE (HIGHLIGHT) ================= */}
        <div className="bg-[var(--color-primary)] text-white
                        p-10 rounded-xl shadow-md relative overflow-hidden">

          {/* subtle accent */}
          <div className="absolute inset-0 bg-[var(--color-secondary)]/10 pointer-events-none" />

          <h2 className="relative text-3xl font-serif font-semibold mb-6">
            Post Graduate
          </h2>

          <div className="relative space-y-4">
            {[
              "Master of Arts (M.A.) — Philosophy",
              "Master of Arts (M.A.) — History",
              "Master of Science (M.Sc.) — Botany",
              "Master of Science (M.Sc.) — Chemistry",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/40 rounded-lg
                           px-4 py-3 flex justify-between items-center
                           cursor-pointer transition
                           hover:bg-white/10"
              >
                <span className="text-sm">{item}</span>
                <AiOutlineArrowRight size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* ================= VOCATIONAL COURSES ================= */}
        <div className="bg-[var(--color-surface)] p-10 rounded-xl shadow-sm border border-[var(--color-divider)]">
          <h2 className="text-3xl font-serif font-semibold mb-6
                         text-[var(--color-primary)]">
            Vocational Courses
          </h2>

          <div className="space-y-4">
            {[
              "Bachelor of Computer Applications (B.C.A)",
              "Bachelor of Business Administration (B.B.A)",
              "Bachelor of Science (B.Sc.) — Biotechnology",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[var(--color-divider)] rounded-lg
                           px-4 py-3 flex justify-between items-center
                           cursor-pointer transition
                           hover:bg-[var(--color-page)]"
              >
                <span className="text-sm text-[var(--color-text-primary)]">
                  {item}
                </span>
                <AiOutlineArrowRight
                  size={20}
                  className="text-[var(--color-primary)]"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Programs;
