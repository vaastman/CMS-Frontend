import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { getAdmissions } from "@/api/admissions.api";

const statusStyle = (status) => {
  switch (status) {
    case "APPLIED":
      return "bg-blue-100 text-blue-700";
    case "UNDER_VERIFICATION":
      return "bg-yellow-100 text-yellow-700";
    case "VERIFIED":
      return "bg-purple-100 text-purple-700";
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Admissions = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const { data } = await getAdmissions();
      setApplications(data.data || []);
    } catch (error) {
      console.error("Failed to fetch admissions", error);
    } finally {
      setLoading(false);
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

      {/* ================= TABLE ================= */}
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
            {/* Loading */}
            {loading && (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  Loading admissions...
                </td>
              </tr>
            )}

            {/* Data */}
            {!loading &&
              applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-[color:var(--color-primary)] text-white flex items-center justify-center">
                      <FaUserGraduate />
                    </span>
                    <span className="font-medium">
                      {app.student?.name || "N/A"}
                    </span>
                  </td>

                  <td className="p-4">
                    {app.course?.name || "N/A"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        app.status
                      )}`}
                    >
                      {app.status?.replaceAll("_", " ")}
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

            {/* Empty */}
            {!loading && applications.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
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
