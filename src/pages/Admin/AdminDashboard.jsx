import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { getAdmissions } from "@/api/admissions.api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* ================= SAFE STATE ================= */
  const [stats, setStats] = useState({
    totalStudents: 0,
    newAdmissions: 0,
    facultyStrength: 0,
    pendingApprovals: 0,
  });

  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD ================= */
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      // ✅ ONLY real backend API
      const { data } = await getAdmissions({ limit: 5 });
      const admissions = data?.data || [];

      setStats({
        totalStudents: admissions.filter(a => a.status === "APPROVED").length,
        newAdmissions: admissions.length,
        facultyStrength: 0, // no backend API yet
        pendingApprovals: admissions.filter(
          a => a.status === "UNDER_VERIFICATION"
        ).length,
      });

      setRecentAdmissions(admissions);
    } catch (error) {
      console.error("Dashboard load failed:", error.message);

      // ✅ FAIL SAFE (NO CRASH)
      setStats({
        totalStudents: 0,
        newAdmissions: 0,
        facultyStrength: 0,
        pendingApprovals: 0,
      });
      setRecentAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Active Students",
      value: stats.totalStudents,
      note: "Approved admissions",
      icon: <FaUserGraduate />,
    },
    {
      title: "New Admissions",
      value: stats.newAdmissions,
      note: "Total applications",
      icon: <FaUsers />,
    },
    {
      title: "Faculty Strength",
      value: stats.facultyStrength,
      note: "Coming soon",
      icon: <FaUserTie />,
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
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
            Overview of admissions and system activity
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium 
          text-[color:var(--color-text-primary)] 
          bg-[color:var(--color-surface)] 
          hover:bg-gray-50 transition">
          <FaDownload />
          Export Report
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`bg-[color:var(--color-surface)] rounded-2xl p-5 shadow-sm
            ${stat.danger ? "border-l-4 border-red-500" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  {stat.title}
                </p>
                <h2 className="text-3xl font-bold mt-1">
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

        {/* ---- RECENT ADMISSIONS ---- */}
        <div className="xl:col-span-2 bg-[color:var(--color-surface)] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="font-semibold">
              Recent Admission Applications
            </h3>
            <button
              onClick={() => navigate("/admin/admissions")}
              className="text-sm text-[color:var(--color-primary)] font-medium"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left">Applicant</th>
                  <th className="px-6 py-3 text-left">Course</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.map(app => (
                  <tr key={app.id} className="border-b">
                    <td className="px-6 py-4 font-medium">
                      {app.student?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {app.course?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {app.status}
                    </td>
                  </tr>
                ))}

                {!loading && recentAdmissions.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-6 text-center text-gray-500">
                      No recent applications found
                    </td>
                  </tr>
                )}
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
              <button
                onClick={() => navigate("/admin/students")}
                className="p-4 rounded-xl border hover:bg-gray-50 transition text-sm"
              >
                <FaPlus /> Add Student
              </button>

              <button className="p-4 rounded-xl border hover:bg-gray-50 transition text-sm">
                <FaBullhorn /> Post Notice
              </button>

              <button className="p-4 rounded-xl border hover:bg-gray-50 transition text-sm">
                <FaCalendarAlt /> Events
              </button>

              <button className="p-4 rounded-xl border hover:bg-gray-50 transition text-sm">
                <FaDownload /> Reports
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
