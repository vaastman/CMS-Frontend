import React, { useState } from "react";
import { FaThumbsUp, FaBullhorn } from "react-icons/fa";

const Examination = () => {
  // ✅ Default section = dashboard
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[color:var(--color-page)] px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="lg:col-span-1 bg-[color:var(--color-surface)] rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-4">
            Examination Menu
          </h3>

          <ul className="space-y-2 text-sm">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "exam", label: "Examination Form" },
              { id: "admit", label: "Admit Card" },
              { id: "result", label: "Results" },
              { id: "registration", label: "Registration" },
              { id: "login", label: "Student Login" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    w-full text-left px-4 py-2 rounded-lg transition
                    ${
                      activeSection === item.id
                        ? "bg-[color:var(--color-primary)] text-white"
                        : "hover:bg-gray-100 text-[color:var(--color-text-primary)]"
                    }
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="lg:col-span-2 bg-[color:var(--color-surface)] rounded-2xl shadow-md p-6 space-y-6">

          {/* ===== DASHBOARD (DEFAULT) ===== */}
          {activeSection === "dashboard" && (
            <>
              {/* Highlight Card */}
              <div className="bg-[color:var(--color-primary)] text-white rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  Examination Form Open
                </h2>
                <p className="text-sm opacity-90">
                  PG Regular – 1st Semester
                </p>

                <button className="mt-4 bg-white text-[color:var(--color-primary)] px-6 py-2 rounded-lg font-medium">
                  Apply Now
                </button>
              </div>

              {/* Action Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Re-Payment / Print Receipt",
                  "Download Admit Card",
                  "Know Your Form Number",
                  "Examination Result",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-5 hover:shadow-md transition"
                  >
                    <h4 className="font-semibold mb-2">{item}</h4>
                    <button className="text-sm text-[color:var(--color-primary)] font-medium">
                      Proceed →
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ===== EXAMINATION FORM ===== */}
          {activeSection === "exam" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Examination Form
              </h2>

              {[
                "Fill Examination Form",
                "Re-Payment / Print Receipt",
                "Print Examination Form",
                "Know Your Form Number",
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full mb-3 bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition"
                >
                  <FaThumbsUp /> {item}
                </button>
              ))}
            </div>
          )}

          {/* ===== ADMIT CARD ===== */}
          {activeSection === "admit" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Download Admit Card
              </h2>

              {[
                "UG Regular Sem-1",
                "UG Regular Sem-5",
                "B.Pharma Sem-5 & 7",
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full mb-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition"
                >
                  Download Admit Card – {item}
                </button>
              ))}
            </div>
          )}

          {/* ===== RESULTS ===== */}
          {activeSection === "result" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Examination Results
              </h2>

              {[
                "UG Result",
                "PG Result",
                "Vocational Course Result",
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition"
                >
                  View {item}
                </button>
              ))}
            </div>
          )}

          {/* ===== REGISTRATION ===== */}
          {activeSection === "registration" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Registration
              </h2>

              {[
                "Fill Registration Form",
                "Registration Payment",
                "Registration Slip",
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full mb-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition"
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* ===== STUDENT LOGIN ===== */}
          {activeSection === "login" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Student Login
              </h2>

              <button className="w-full mb-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition">
                Create New Account
              </button>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition">
                Login to Dashboard
              </button>
            </div>
          )}
        </main>

        {/* ================= NOTICE PANEL ================= */}
        <aside className="lg:col-span-1 bg-[color:var(--color-surface)] rounded-2xl shadow-md p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[color:var(--color-primary)] mb-4">
            <FaBullhorn /> Notices
          </h3>

          <div className="space-y-3 text-sm max-h-[420px] overflow-y-auto">
            {[
              "Guest Faculty document verification",
              "UG III Examination Form Notice",
              "PG SEM-3 Exam Postponed",
              "Online PG Vocational Exam Form",
              "UG Vocational Admission Notice",
            ].map((notice, i) => (
              <p
                key={i}
                className={`border-l-4 pl-3 ${
                  notice.toLowerCase().includes("online")
                    ? "border-red-500 text-red-600"
                    : "border-blue-500 text-blue-600"
                }`}
              >
                {notice}
              </p>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Examination;
