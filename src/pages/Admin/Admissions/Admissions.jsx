import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaPlus, FaSync } from "react-icons/fa";
import { toast } from "react-toastify";

import { getAdmissions } from "@/api/admissions.api";
import { statusLabel, statusStyle } from "@/utils/admissionStatus";

import Modal from "@/components/Modal";
import AddStudent from "./AddStudent";

const Admissions = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const { data } = await getAdmissions();
      setApplications(data?.data?.admissions || []);
    } catch (error) {
      toast.error(
        "Admissions list failed to load (backend issue)"
      );
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Admissions
          </h1>
          <p className="text-sm text-gray-500">
            Manage student admission applications
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchAdmissions}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg"
          >
            <FaSync />
            Load Admissions
          </button>

          <button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center gap-2 bg-[color:var(--color-primary)] text-white px-4 py-2 rounded-lg"
          >
            <FaPlus />
            Add Student
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
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
            {loading && (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  Loading admissions…
                </td>
              </tr>
            )}

            {!loading &&
              applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="p-4 flex gap-2 items-center">
                    <FaUserGraduate />
                    {app.student?.name}
                  </td>
                  <td className="p-4">
                    {app.course?.name}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${statusStyle(
                        app.status
                      )}`}
                    >
                      {statusLabel[app.status]}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/admissions/${app.id}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && applications.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No admissions loaded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add & Admit Student"
      >
        <AddStudent
          onSuccess={(admissionId) => {
            setOpenAddModal(false);

            if (admissionId) {
              navigate(`/admin/admissions/${admissionId}`);
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Admissions;
