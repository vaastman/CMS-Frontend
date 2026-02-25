import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getAdmissionWindows,
  deleteAdmissionWindow,
} from "@/api/admissionWindow.api";

const AdmissionPortal = () => {
  const [portals, setPortals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPortals = async () => {
    try {
      setLoading(true);
      const res = await getAdmissionWindows();
      setPortals(res.data.data.admissionWindows);
    } catch (err) {
      toast.error("Failed to fetch admission windows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAdmissionWindow(id);
      toast.success("Admission window deleted");
      fetchPortals();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">
          Admission Portal Management
        </h2>

        <Link
          to="/admin/admission-portal/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <FaPlus />
          Create Admission
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {portals.map((portal) => (
              <tr key={portal.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{portal.title}</td>
                <td className="p-3">{portal.course?.name}</td>
                <td className="p-3">{portal.department?.name}</td>
                <td className="p-3">
                  {new Date(portal.startDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(portal.endDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      portal.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {portal.enabled ? "OPEN" : "CLOSED"}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <Link
                    to={`/admin/admission-portal/edit/${portal.id}`}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => handleDelete(portal.id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && portals.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No admission portals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionPortal;