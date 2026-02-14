import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import { getAdmissions } from "@/api/admissions.api";
import { statusLabel, statusStyle } from "@/utils/admissionStatus";

import Modal from "@/components/Modal";
import AddStudent from "./AddStudent";

const Admissions = () => {
  const navigate = useNavigate();

  const [allAdmissions, setAllAdmissions] = useState([]); // full data
  const [applications, setApplications] = useState([]);   // paginated data
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [openAddModal, setOpenAddModal] = useState(false);

  /* ================= FETCH ALL ================= */
  const fetchAdmissions = async () => {
    try {
      setLoading(true);

      const res = await getAdmissions();

      const admissions =
        res?.data?.data?.admissions || [];

      setAllAdmissions(admissions);

    } catch (error) {
      toast.error("Failed to load admissions");
      setAllAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION LOGIC ================= */
  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    setApplications(
      allAdmissions.slice(startIndex, endIndex)
    );
  }, [allAdmissions, page]);

  const totalPages = Math.ceil(allAdmissions.length / limit);

  /* ================= AUTO LOAD ================= */
  useEffect(() => {
    fetchAdmissions();
  }, []);

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

        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 bg-[color:var(--color-primary)] text-white px-4 py-2 rounded-lg"
        >
          <FaPlus />
          Add Student
        </button>
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
                    {app.student?.name || "-"}
                  </td>
                  <td className="p-4">
                    {app.course?.name || "-"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${statusStyle(
                        app.status
                      )}`}
                    >
                      {statusLabel[app.status] || app.status}
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
                  No admissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
            <p className="text-sm">
              Page <b>{page}</b> of <b>{totalPages}</b>
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
                className="px-4 py-1.5 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
                className="px-4 py-1.5 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add & Admit Student"
      >
        <div className="max-h-[80vh] overflow-y-auto px-1">
          <AddStudent
            onSuccess={() => {
              setOpenAddModal(false);
              setPage(1);
              fetchAdmissions();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Admissions;
