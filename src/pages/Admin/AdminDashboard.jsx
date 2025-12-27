import {
  FaUsers,
  FaBook,
  FaBullhorn,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Staff", value: 124, icon: <FaUsers /> },
    { title: "Courses", value: 18, icon: <FaBook /> },
    { title: "Notices", value: 42, icon: <FaBullhorn /> },
    { title: "Examinations", value: 12, icon: <FaFileAlt /> },
  ];

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
          Admin Dashboard
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
          Overview of college administration activities
        </p>
      </div>

      {/* ================= STATS + ACTIVITY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ---- STATS (LEFT) ---- */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="
                bg-[color:var(--color-surface)]
                rounded-2xl p-5 shadow-sm
                hover:shadow-md transition
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[color:var(--color-text-secondary)]">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl font-bold text-[color:var(--color-text-primary)] mt-1">
                    {stat.value}
                  </h2>
                </div>

                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[color:var(--color-primary)] text-white text-xl">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- RECENT ACTIVITY (RIGHT) ---- */}
        <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-[color:var(--color-text-primary)]">
            Recent Activity
          </h3>

          <ul className="space-y-4 text-sm">
            {[
              "New notice published",
              "Exam schedule updated",
              "New staff added",
              "Course syllabus uploaded",
            ].map((activity, i) => (
              <li
                key={i}
                className="border-l-4 border-[color:var(--color-primary)] pl-3 text-[color:var(--color-text-primary)]"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-[color:var(--color-text-primary)]">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "Add New Notice",
            "Add Staff",
            "Create Examination",
          ].map((label, i) => (
            <button
              key={i}
              className="
                flex items-center justify-between
                px-5 py-3 rounded-lg
                bg-[color:var(--color-primary)]
                text-white font-medium
                hover:opacity-90 transition
              "
            >
              {label}
              <FaArrowRight className="text-sm opacity-80" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
