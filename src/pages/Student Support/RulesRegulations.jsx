import React from "react";
import {
  FiBookOpen,
  FiUserCheck,
  FiClock,
  FiAlertCircle,
  FiShield,
} from "react-icons/fi";

const RulesRegulations = () => {
  return (
    <div className="w-full bg-gray-100">
      {/* ================= HERO SECTION ================= */}
      <div
        className="relative h-[280px] md:h-[360px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 h-full flex items-center px-8 md:px-24">
          <h1 className="text-white text-4xl md:text-5xl font-semibold">
            Rules & Regulations
          </h1>
        </div>
      </div>

      {/* ================= INTRO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Code of Conduct
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          All students are expected to maintain discipline, decorum, and
          academic integrity within the campus. The following rules and
          regulations are framed to ensure a safe, respectful, and productive
          learning environment for everyone.
        </p>
      </section>

      {/* ================= RULES CATEGORIES ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            General Rules & Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Academic Rules */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <FiBookOpen className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Academic Discipline
              </h3>
              <ul className="text-gray-600 text-sm list-disc pl-5 space-y-2">
                <li>Minimum 75% attendance is mandatory.</li>
                <li>Students must attend all internal assessments.</li>
                <li>Use of unfair means in exams is strictly prohibited.</li>
              </ul>
            </div>

            {/* Attendance & Punctuality */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <FiClock className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Attendance & Punctuality
              </h3>
              <ul className="text-gray-600 text-sm list-disc pl-5 space-y-2">
                <li>Students must be punctual for classes and labs.</li>
                <li>Late entry to classrooms is discouraged.</li>
                <li>Leave applications must be submitted in advance.</li>
              </ul>
            </div>

            {/* Student Conduct */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <FiUserCheck className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Student Conduct
              </h3>
              <ul className="text-gray-600 text-sm list-disc pl-5 space-y-2">
                <li>Respect faculty, staff, and fellow students.</li>
                <li>Maintain cleanliness across the campus.</li>
                <li>Misbehavior may lead to disciplinary action.</li>
              </ul>
            </div>

            {/* Prohibited Activities */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <FiAlertCircle className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Prohibited Activities
              </h3>
              <ul className="text-gray-600 text-sm list-disc pl-5 space-y-2">
                <li>Ragging in any form is strictly banned.</li>
                <li>No consumption of alcohol or drugs.</li>
                <li>No damage to college property.</li>
              </ul>
            </div>

            {/* Safety & Security */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
              <FiShield className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Safety & Security
              </h3>
              <ul className="text-gray-600 text-sm list-disc pl-5 space-y-2">
                <li>Carry ID cards at all times.</li>
                <li>Follow campus security instructions.</li>
                <li>Report suspicious activities immediately.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NOTE ================= */}
      <section className="bg-blue-50 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Important Note
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Violation of the above rules and regulations may result in
            disciplinary action, including fines, suspension, or expulsion,
            as per institutional and university norms.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RulesRegulations;
