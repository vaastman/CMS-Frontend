import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStudents, deleteStudent } from "@/api/student.api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDialog from "../components/ConfirmDialog";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  ADMITTED: "bg-green-100 text-green-700",
  APPLIED: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const StudentTable = ({ search, filters, refreshKey, onEdit }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);            // 1-based page index
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // delete dialog
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const perPage = 5;
  const { course, session, status } = filters;

  /* ================= RESET PAGE ON FILTER CHANGE ================= */
  useEffect(() => {
    setPage(1);
  }, [search, course, session, status]);

  /* ================= FETCH STUDENTS ================= */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchStudents({
          search,
          courseId: course,
          sessionId: session,
          status,
          page,              // ✅ 1-based page
          limit: perPage,
        });

        const data = res?.data?.data || {};
        const list = data.students || data || [];

        setStudents(list);

        // ✅ SAFE pagination handling (works with most backends)
        const pagination = data.pagination;

        if (pagination?.totalPages) {
          setTotalPages(pagination.totalPages);
        } else if (pagination?.total && pagination?.limit) {
          setTotalPages(Math.ceil(pagination.total / pagination.limit));
        } else {
          setTotalPages(1);
        }
      } catch (err) {
        console.error("❌ Fetch students error:", err);
        toast.error("Failed to load students");
        setStudents([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search, course, session, status, page, refreshKey]);

  /* ================= CONFIRM DELETE ================= */
  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteStudent(deleteId);

      toast.success("Student deleted successfully 🗑️");

      setStudents((prev) => {
        const updated = prev.filter((s) => s.id !== deleteId);

        // ✅ fix pagination edge case
        if (updated.length === 0 && page > 1) {
          setPage((p) => p - 1);
        }

        return updated;
      });

      setDeleteId(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="rounded-2xl border overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left">Reg No</th>
            <th>UAN</th>
            <th>Name</th>
            <th>Course</th>
            <th>Session</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-10">
                Loading...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-10">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/admin/students/${s.id}`)}
              >
                <td className="p-4">{s.regNo || "SSM123DEMO"}</td>
                <td className="p-4">
                  {s.uan_no || "N/A"}
                </td>
                <td>{s.name}</td>
                <td>{s.course?.name || "-"}</td>
                <td>{s.session?.name || "-"}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${statusStyles[s.status] ||
                      "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {s.status || "N/A"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td
                  className="text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-center gap-4">
                    {/* EDIT */}
                    <button
                      onClick={() => onEdit(s)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Student"
                    >
                      <FaEdit />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => setDeleteId(s.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Student"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
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

      {/* ================= CONFIRM DELETE DIALOG ================= */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        confirmText="Delete"
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
};

export default StudentTable;
