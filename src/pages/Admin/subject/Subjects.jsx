import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getStudentSubjects,
  deleteStudentSubject,
} from "@/api/subject.api";

import SubjectModal from "@/components/admin/SubjectModal";

const Subjects = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [studentId, setStudentId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  /* ================= FETCH ASSIGNMENTS ================= */
  const fetchAssignments = async () => {
    if (!studentId || !semesterId) {
      setRows([]);
      return;
    }

    try {
      setLoading(true);
      const res = await getStudentSubjects({
        studentId,
        semesterId,
      });

      setRows(res?.data?.data || []);
    } catch {
      toast.error("Failed to load student subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [studentId, semesterId]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this subject assignment?")) return;

    try {
      await deleteStudentSubject(id);
      toast.success("Assignment removed");
      fetchAssignments();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 bg-[var(--color-page)] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Assign Subjects
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Manage subject allocation for students
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-[var(--color-primary)] text-white
                     hover:opacity-90 transition"
          onClick={() => setOpen(true)}
        >
          <FaPlus />
          Assign Subject
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[var(--color-surface)] rounded-xl shadow border border-[var(--color-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-page)] border-b border-[var(--color-divider)]">
            <tr className="text-left text-[var(--color-text-secondary)]">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Subject</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan="3"
                  className="px-5 py-6 text-center text-[var(--color-text-secondary)]"
                >
                  Loading assignments…
                </td>
              </tr>
            )}

            {!loading &&
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-[var(--color-divider)] hover:bg-[var(--color-page)] transition"
                >
                  <td className="px-5 py-3 text-[var(--color-text-primary)]">
                    {r.student?.name || "-"}
                  </td>
                  <td className="px-5 py-3 text-[var(--color-text-primary)]">
                    {r.subject?.name || "-"}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-[var(--color-danger)] hover:opacity-80 transition"
                      title="Remove Assignment"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && !rows.length && (
              <tr>
                <td
                  colSpan="3"
                  className="px-5 py-6 text-center text-[var(--color-text-secondary)]"
                >
                  No subject assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <SubjectModal
        open={open}
        onClose={() => setOpen(false)}
        onAssigned={fetchAssignments}
      />
    </div>
  );
};

export default Subjects;
