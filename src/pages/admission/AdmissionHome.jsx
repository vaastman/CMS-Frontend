import React from "react";
import { useNavigate, Link } from "react-router-dom";

const AdmissionHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ===== HEADER ===== */}
      <header className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            SSDM College Admission Portal
          </h1>

          <Link
            to="/login"
            className="text-sm bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-200"
          >
            Login
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Online Admission & Payment
          </h2>
          <p className="mt-2 text-gray-600">
            NAAC Accredited – Grade <span className="font-semibold">“B”</span>
          </p>
        </div>
      </section>

      {/* ===== ADMISSION LINKS ===== */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Student Apply
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="font-semibold text-gray-700 mb-2">
              B.A / B.Sc (Semester II)
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Session 2025 – 2029
            </p>
            <button
              onClick={() =>
                navigate("/admission/student-registration?course=ba-bsc")
              }
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Apply Now →
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="font-semibold text-gray-700 mb-2">
              B.Com (S.F) Semester II
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Session 2025 – 2029
            </p>
            <button
              onClick={() =>
                navigate("/admission/student-registration?course=bcom")
              }
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Apply Now →
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="font-semibold text-gray-700 mb-2">
              M.A / M.Sc (Semester IV)
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Session 2024 – 2026
            </p>
            <button
              onClick={() =>
                navigate("/admission/student-registration?course=ma-msc")
              }
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Apply Now →
            </button>
          </div>
        </div>
      </section>

      {/* ===== NOTICES ===== */}
      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Important Notices
          </h3>

          <ul className="space-y-3 text-sm text-blue-700">
            <li>• Notice for Online Registration of UG Semester II (2025–2029)</li>
            <li>• Notice for Document Verification – UG Semester II</li>
            <li>• Notice regarding Online Admission – PG Semester IV</li>
            <li>• PG Semester IV Document Verification Notice</li>
          </ul>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-800 text-gray-300 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          © {new Date().getFullYear()} SSDM College, Patna. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default AdmissionHome;
