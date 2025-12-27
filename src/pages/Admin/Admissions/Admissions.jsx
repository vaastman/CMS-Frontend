import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaUserGraduate,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const Admissions = () => {
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      name: "Rohit Kumar",
      course: "B.Sc Computer Science",
      status: "APPLIED",
    },
    {
      id: 2,
      name: "Neha Singh",
      course: "B.A English",
      status: "UNDER_VERIFICATION",
    },
    {
      id: 3,
      name: "Amit Verma",
      course: "B.Sc Physics",
      status: "APPROVED",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      case "UNDER_VERIFICATION":
        return "bg-yellow-100 text-yellow-700";
      case "APPROVED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
          Admissions
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
          Manage student admission applications and verification
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[color:var(--color-surface)] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Total Applications
          </p>
          <h2 className="text-2xl font-bold mt-1">3</h2>
        </div>

        <div className="bg-[color:var(--color-surface)] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Pending Verification
          </p>
          <h2 className="text-2xl font-bold mt-1">1</h2>
        </div>

        <div className="bg-[color:var(--color-surface)] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Approved
          </p>
          <h2 className="text-2xl font-bold mt-1">1</h2>
        </div>
      </div>

      {/* ================= APPLICATIONS TABLE ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[color:var(--color-primary)] text-white flex items-center justify-center">
                    <FaUserGraduate />
                  </span>
                  <span className="font-medium">{app.name}</span>
                </td>

                <td className="p-4">{app.course}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                      app.status
                    )}`}
                  >
                    {app.status.replace("_", " ")}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/admissions/${app.id}`)
                    }
                    className="
                      text-[color:var(--color-primary)]
                      font-medium hover:underline
                    "
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No admission applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admissions;
