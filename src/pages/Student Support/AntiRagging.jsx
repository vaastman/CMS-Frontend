import React from "react";
import {
  FiShield,
  FiUsers,
  FiAlertTriangle,
  FiPhoneCall,
} from "react-icons/fi";

const AntiRagging = () => {
  return (
    <div className="w-full bg-gray-100">
      {/* ================= HERO SECTION ================= */}
      <div
        className="relative h-[280px] md:h-[360px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex items-center px-8 md:px-24">
          <h1 className="text-white text-4xl md:text-5xl font-semibold">
            Anti-Ragging Cell
          </h1>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          About Anti-Ragging
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          Ragging in any form is strictly prohibited in the institution.
          The Anti-Ragging Cell ensures a safe, healthy, and friendly
          environment for all students. Any act of physical or mental
          harassment will invite strict disciplinary action as per UGC
          regulations.
        </p>
      </section>

      {/* ================= OBJECTIVES ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            Objectives of Anti-Ragging Cell
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiShield className="w-10 h-10 text-blue-600" />,
                title: "Zero Tolerance",
                desc: "Ensure zero tolerance towards ragging in any form.",
              },
              {
                icon: <FiUsers className="w-10 h-10 text-green-600" />,
                title: "Student Safety",
                desc: "Maintain a safe, respectful, and inclusive campus.",
              },
              {
                icon: (
                  <FiAlertTriangle className="w-10 h-10 text-yellow-500" />
                ),
                title: "Strict Action",
                desc: "Immediate disciplinary action against offenders.",
              },
              {
                icon: <FiPhoneCall className="w-10 h-10 text-red-600" />,
                title: "24×7 Support",
                desc: "Continuous support through helplines & authorities.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMITTEE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Anti-Ragging Committee
        </h2>

        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Designation</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Dr. A.K. Singh", "Principal", "Chairperson"],
                ["Prof. R. Kumar", "Senior Faculty", "Member"],
                ["Ms. P. Sharma", "Counsellor", "Member"],
                ["Mr. S. Verma", "Admin Officer", "Member"],
              ].map((row, i) => (
                <tr key={i} className="border-t">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= HELPLINE ================= */}
      <section className="bg-red-50 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-red-700 mb-4">
            Anti-Ragging Helpline
          </h2>

          <p className="text-gray-700 mb-4">
            Students can report ragging incidents confidentially.
          </p>

          <div className="text-lg font-medium text-gray-800">
            📞 National Helpline:{" "}
            <span className="font-semibold">1800-180-5522</span>
          </div>

          <div className="text-gray-700 mt-2">
            ✉️ Email:{" "}
            <span className="font-semibold">
              helpline@antiragging.in
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AntiRagging;
