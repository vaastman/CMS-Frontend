import React from "react";
import {
  FiUsers,
  FiEdit,
  FiLayers,
  FiCheckCircle,
  FiPhoneCall,
  FiMail,
  FiAlertOctagon,
} from "react-icons/fi";

const StudentGrievance = () => {
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
            Student Grievance Redressal Cell
          </h1>
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          About the Grievance Cell
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          The Student Grievance Redressal Cell aims to address and resolve
          complaints of students in a fair, transparent, and time-bound
          manner. The cell ensures that students’ concerns related to
          academics, administration, facilities, or personal issues are
          handled with confidentiality and sensitivity.
        </p>
      </section>

      {/* ================= GRIEVANCE TYPES ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            Types of Grievances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiLayers className="w-10 h-10 text-blue-600" />,
                title: "Academic",
                desc: "Issues related to exams, evaluation, attendance, or teaching.",
              },
              {
                icon: <FiUsers className="w-10 h-10 text-green-600" />,
                title: "Administrative",
                desc: "Concerns related to fees, documents, or office delays.",
              },
              {
                icon: <FiAlertOctagon className="w-10 h-10 text-red-600" />,
                title: "Harassment",
                desc: "Any form of harassment or discrimination.",
              },
              {
                icon: <FiEdit className="w-10 h-10 text-purple-600" />,
                title: "Infrastructure",
                desc: "Classrooms, labs, library, hostel, or campus facilities.",
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

      {/* ================= PROCESS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-10">
          Grievance Redressal Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            "Submit grievance in writing or online",
            "Grievance acknowledged by the cell",
            "Inquiry & verification by committee",
            "Resolution & communication to student",
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow text-center"
            >
              <FiCheckCircle className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COMMITTEE ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Grievance Redressal Committee
          </h2>

          <div className="rounded-2xl shadow overflow-x-auto">
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
                  ["Dr. R. K. Verma", "Principal", "Chairperson"],
                  ["Prof. A. Singh", "Senior Faculty", "Member"],
                  ["Ms. N. Gupta", "Student Counselor", "Member"],
                  ["Mr. S. Kumar", "Admin Officer", "Member"],
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
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-blue-50 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Contact Grievance Cell
          </h2>

          <p className="text-gray-700 mb-6">
            Students are encouraged to approach the Grievance Cell
            without hesitation. All complaints are handled confidentially.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 text-gray-800">
            <div className="flex items-center gap-2">
              <FiPhoneCall className="text-blue-600" />
              <span className="font-medium">+91-98765-43210</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-blue-600" />
              <span className="font-medium">
                grievance@college.edu.in
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentGrievance;
