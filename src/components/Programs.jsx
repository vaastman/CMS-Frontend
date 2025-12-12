import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Programs = () => {
  return (
    <div className="w-full py-20 bg-white">
      
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-center mb-16 text-neutral-900">
        Academics & Programs
      </h1>

      {/* 3 Columns Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

        {/* Undergraduate */}
        <div className="bg-[#f5f5f7] p-10 rounded-xl shadow-sm">
          <h2 className="text-3xl font-serif font-semibold mb-6">Undergraduate</h2>

          <div className="space-y-4">
            {[
              "Bachelors of Arts (B.A.) — Political Science",
              "Bachelors of Arts (B.A.) — Psychology",
              "Bachelor of Commerce (B.Com) — Self Finance",
              "Bachelor of Science (B.Sc) — Zoology",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-400 rounded-lg px-4 py-3 flex justify-between items-center transition cursor-pointer hover:bg-gray-100"
              >
                <span>{item}</span>
                <AiOutlineArrowRight size={22} />
              </div>
            ))}
          </div>
        </div>

        {/* Post Graduate — Highlighted Middle Block */}
        <div className="bg-gradient-to-b from-[#d9003d] to-[#b20036] text-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-serif font-semibold mb-6">Post Graduate</h2>

          <div className="space-y-4">
            {[
              "Master of Arts (M.A) — Philosophy",
              "Master of Arts (M.A) — History",
              "Master of Science (M.Sc) — Botany",
              "Master of Science (M.Sc) — Chemistry",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/50 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer transition hover:bg-white/10"
              >
                <span>{item}</span>
                <AiOutlineArrowRight size={22} />
              </div>
            ))}
          </div>
        </div>

        {/* Vocational Courses */}
        <div className="bg-[#f5f5f7] p-10 rounded-xl shadow-sm">
          <h2 className="text-3xl font-serif font-semibold mb-6">Vocational Courses</h2>

          <div className="space-y-4">
            {[
              "Bachelor of Computer Applications (B.C.A)",
              "Bachelor of Business Administration (B.B.A)",
              "Bachelor of Science (B.Sc) — Biotechnology",
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-400 rounded-lg px-4 py-3 flex justify-between items-center transition cursor-pointer hover:bg-gray-100"
              >
                <span>{item}</span>
                <AiOutlineArrowRight size={22} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Programs;
