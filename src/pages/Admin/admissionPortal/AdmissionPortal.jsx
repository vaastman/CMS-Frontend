// src/pages/Admin/admissionPortal/AdmissionPortal.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdmissionPortal = () => {
  // 🔥 Temporary dummy data (replace later with API)
  const [portals, setPortals] = useState([
    {
      id: "1",
      courseName: "B.A / B.Sc (Semester II)",
      session: "2025 - 2029",
      startDate: "2025-02-01",
      lastDate: "2027-04-30",
      status: "OPEN",
    },
    {
      id: "2",
      courseName: "M.A / M.Sc (Semester IV)",
      session: "2024 - 2026",
      startDate: "2025-01-20",
      lastDate: "2025-03-31",
      status: "CLOSED",
    },
  ]);

  const deletePortal = (id) => {
    setPortals((prev) => prev.filter((p) => p.id !== id));
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

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Session</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">Last Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {portals.map((portal) => (
              <tr key={portal.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{portal.courseName}</td>
                <td className="p-3">{portal.session}</td>
                <td className="p-3">{portal.startDate}</td>
                <td className="p-3">{portal.lastDate}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      portal.status === "OPEN"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {portal.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <Link
                    to={`/admin/admission-portal/edit/${portal.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => deletePortal(portal.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {portals.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
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