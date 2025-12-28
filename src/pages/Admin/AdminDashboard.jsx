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

const AdminDashboard = () => {
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
                ["Add Student", <FaPlus />],
                ["Post Notice", <FaBullhorn />],
                ["Upload Gallery", <FaPlus />],
                ["Events", <FaCalendarAlt />],
              ].map((item, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center justify-center gap-2
                  p-4 rounded-xl border hover:bg-gray-50 transition text-sm">
                  {item[1]}
                  {item[0]}
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
  );
};

export default AdminDashboard;
