import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchStudents } from "@/api/student.api";
import { getSemesters } from "@/api/semester.api";
import { getSubjects } from "@/api/subjectMaster.api";
import { createStudentSubject } from "@/api/subject.api";

const SubjectModal = ({
  open,
  onClose,
  onAssigned,
  mode = "create",          // "create" | "update"
  initialData = null,       // for update mode
}) => {
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [student, setStudent] = useState(null);
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD STUDENTS ================= */
  useEffect(() => {
    if (!open) return;

    const loadStudents = async () => {
      try {
        const res = await fetchStudents();
        setStudents(res?.data?.data?.students || []);
      } catch {
        toast.error("Failed to load students");
      }
    };

    loadStudents();
  }, [open]);

  /* ================= PREFILL (UPDATE MODE) ================= */
  useEffect(() => {
    if (mode === "update" && initialData) {
      setStudent(initialData.student);
      setSemesterId(initialData.semesterId);
      setSubjectId(initialData.subjectId);
    }
  }, [mode, initialData]);

  /* ================= STUDENT CHANGE ================= */
  const handleStudentChange = async (studentId) => {
    const selectedStudent = students.find((s) => s.id === studentId);

    setStudent(selectedStudent);
    setSemesterId("");
    setSubjectId("");
    setSubjects([]);
    setSemesters([]);

    if (!selectedStudent?.courseId) {
      toast.error("Student course not found");
      return;
    }

    try {
      const res = await getSemesters({ courseId: selectedStudent.courseId });
      setSemesters(res?.data?.data?.semesters || []);
    } catch {
      toast.error("Failed to load semesters");
    }
  };

  /* ================= SEMESTER CHANGE ================= */
  const handleSemesterChange = async (id) => {
    setSemesterId(id);
    setSubjectId("");
    setSubjects([]);

    try {
      const res = await getSubjects({ semesterId: id });
      setSubjects(res?.data?.data?.subjects || []);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student?.id || !semesterId || !subjectId) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createStudentSubject({
        studentId: student.id,
        semesterId,
        subjectId,
      });

      toast.success(
        mode === "update"
          ? "Subject updated successfully"
          : "Subject assigned successfully"
      );

      onAssigned?.();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-[var(--color-surface)] w-full max-w-lg rounded-xl shadow-xl border border-[var(--color-border)]"
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-[var(--color-divider)]">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {mode === "update" ? "Update Subject Assignment" : "Assign Subject"}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Select student, semester and subject
          </p>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* STUDENT */}
          <select
            className="input border border-[var(--color-border)]"
            onChange={(e) => handleStudentChange(e.target.value)}
            required
            disabled={mode === "update"}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* SEMESTER */}
          <select
            className="input border border-[var(--color-border)]"
            disabled={!student || mode === "update"}
            onChange={(e) => handleSemesterChange(e.target.value)}
            value={semesterId}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>
                Semester {s.number}
              </option>
            ))}
          </select>

          {/* SUBJECT */}
          <select
            className="input border border-[var(--color-border)]"
            disabled={!semesterId}
            onChange={(e) => setSubjectId(e.target.value)}
            value={subjectId}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.type})
              </option>
            ))}
          </select>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-divider)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-page)] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : mode === "update"
                ? "Update"
                : "Assign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
