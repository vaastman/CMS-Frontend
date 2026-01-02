import React, { useState } from "react";
import {
  FaUsers,
  FaUserGraduate,
  FaUserTie,
  FaClock,
  FaPlus,
  FaBullhorn,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div
        className="
          bg-white w-full max-w-4xl rounded-2xl shadow-lg
          max-h-[90vh] flex flex-col
        "
      >
        {/* ===== Header (Fixed) ===== */}
        <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* ===== Scrollable Body ===== */}
        <div className="px-6 py-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};



const AdminDashboard = () => {
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [documents, setDocuments] = useState([]);

  const stats = [
    {
      title: "Total Active Students",
      value: "1,240",
      note: "+5% vs last semester",
      icon: <FaUserGraduate />,
      accent: "text-green-600",
    },
    {
      title: "New Admissions",
      value: "120",
      note: "Current Intake",
      icon: <FaUsers />,
    },
    {
      title: "Faculty Strength",
      value: "85",
      note: "All positions filled",
      icon: <FaUserTie />,
    },
    {
      title: "Pending Approvals",
      value: "12",
      note: "Action required",
      icon: <FaClock />,
      danger: true,
    },
  ];

  return (
    <>
      <div className="space-y-10">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
              Welcome back, Administrator
            </h1>
            <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
              Overview of admissions, faculty, and student activities.
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium
          text-[color:var(--color-text-primary)] bg-[color:var(--color-surface)]
          hover:bg-gray-50 transition">
            <FaDownload />
            Export Report
          </button>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`
              bg-[color:var(--color-surface)]
              rounded-2xl p-5 shadow-sm
              ${stat.danger ? "border-l-4 border-red-500" : ""}
            `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[color:var(--color-text-secondary)]">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold mt-1 text-[color:var(--color-text-primary)]">
                    {stat.value}
                  </h2>
                  <p className={`text-xs mt-1 ${stat.danger ? "text-red-600" : "text-gray-500"}`}>
                    {stat.note}
                  </p>
                </div>

                <div className="w-11 h-11 flex items-center justify-center rounded-xl
                bg-[color:var(--color-primary)] text-white text-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ---- RECENT APPLICATIONS ---- */}
          <div className="xl:col-span-2 bg-[color:var(--color-surface)] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-semibold text-[color:var(--color-text-primary)]">
                Recent Admission Applications
              </h3>
              <button className="text-sm text-[color:var(--color-primary)] font-medium">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-[color:var(--color-text-secondary)]">
                  <tr className="border-b">
                    <th className="px-6 py-3">Applicant</th>
                    <th className="px-6 py-3">Course</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sarah Jenkins", "B.Sc Computer Science", "Oct 24, 2023", "Review"],
                    ["Michael Chen", "B.A Economics", "Oct 23, 2023", "Docs Verified"],
                    ["Emma Wilson", "M.Sc Physics", "Oct 22, 2023", "Review"],
                    ["John Doe", "B.Eng Mechanical", "Oct 21, 2023", "Missing Docs"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="px-6 py-4 font-medium">{row[0]}</td>
                      <td className="px-6 py-4">{row[1]}</td>
                      <td className="px-6 py-4">{row[2]}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${row[3] === "Missing Docs"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"}`}>
                          {row[3]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ---- RIGHT PANEL ---- */}
          <div className="space-y-6">

            {/* Quick Actions */}
            <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Add Student", icon: <FaPlus />, action: "addStudent" },
                  { label: "Post Notice", icon: <FaBullhorn /> },
                  { label: "Upload Documents", icon: <FaPlus /> },
                  { label: "Events", icon: <FaCalendarAlt /> },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (item.action === "addStudent") {
                        setOpenStudentModal(true);
                      }
                    }}
                    className="flex flex-col items-center justify-center gap-2
        p-4 rounded-xl border hover:bg-gray-50 transition text-sm"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>


            {/* Notice Board */}
            <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Notice Board</h3>
                <button className="text-sm text-[color:var(--color-primary)]">
                  View All
                </button>
              </div>

              <ul className="space-y-4 text-sm">
                <li>
                  <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    Exam
                  </span>
                  <p className="font-medium mt-1">
                    Final Semester Schedule Released
                  </p>
                </li>

                <li>
                  <span className="inline-block text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                    Urgent
                  </span>
                  <p className="font-medium mt-1">
                    Campus Maintenance Alert
                  </p>
                </li>

                <li>
                  <span className="inline-block text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                    Event
                  </span>
                  <p className="font-medium mt-1">
                    Annual Tech Fest
                  </p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <Modal
        open={openStudentModal}
        onClose={() => setOpenStudentModal(false)}
        title="Student Registration"
      >
        <form className="space-y-8">

          {/* ================= GENERAL INFORMATION ================= */}
          <section>
            <h4 className="font-semibold mb-4">General Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input className="input" placeholder="Full Name" />
              <input className="input" placeholder="Email" type="email" />
              <input className="input" placeholder="Phone" />
              <input className="input" placeholder="Father's Name" />

              <input className="input" placeholder="UAN" />
              <input className="input" placeholder="Registration No (optional)" />

              <input className="input" type="date" />
              <div className="flex items-center gap-6">
                {/* Avatar Preview */}
                <div className="w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 text-center">
                      Upload<br />Photo
                    </span>
                  )}
                </div>

                {/* Upload Button */}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPhotoPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <span className="inline-block px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                    Choose Photo
                  </span>
                </label>
              </div>


              <textarea
                placeholder="Address"
                className="input md:col-span-2"
                rows="2"
              />
            </div>
          </section>

          {/* ================= ACADEMIC INFORMATION ================= */}
          <section>
            <h4 className="font-semibold mb-4">Academic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <select className="input">
                <option>Department</option>
                <option>CSE</option>
                <option>Mechanical</option>
              </select>

              <select className="input">
                <option>Session</option>
                <option>2023–2027</option>
                <option>2024–2028</option>
              </select>

              <select className="input">
                <option>Course</option>
                <option>B.Tech</option>
                <option>M.Tech</option>
              </select>

              <select className="input">
                <option>Semester</option>
                <option>1</option>
                <option>2</option>
              </select>

              <input
                placeholder="Subjects (comma separated)"
                className="input md:col-span-2"
              />
            </div>
          </section>

          {/* ================= DOCUMENT UPLOAD ================= */}
          <section>
            <h4 className="font-semibold mb-4">Upload Documents</h4>

            {/* Upload Box */}
            <label className="block cursor-pointer">
              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setDocuments((prev) => [...prev, ...files]);
                  }}
                />
                <p className="text-sm text-gray-600">
                  Click or drag files to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, JPG, PNG (Max 5MB each)
                </p>
              </div>
            </label>

            {/* Uploaded Files List */}
            {documents.length > 0 && (
              <ul className="mt-4 space-y-2">
                {documents.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2 text-sm"
                  >
                    <span className="truncate">{file.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setDocuments((docs) =>
                          docs.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>


          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpenStudentModal(false)}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[color:var(--color-primary)] text-white rounded-lg text-sm"
            >
              Register Student
            </button>
          </div>

        </form>
      </Modal>

    </>
  );
};

export default AdminDashboard;
