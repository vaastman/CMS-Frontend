import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

import { createStudent, fetchStudents } from "@/api/student.api";
import { createAdmission } from "@/api/admissions.api";
import { getCourses } from "@/api/course.api";
import { getSessions } from "@/api/session.api";

const INITIAL_FORM = {
  studentId: "",
  name: "",
  email: "",
  phone: "",
  courseId: "",
  sessionId: "",
};

const AddStudent = ({ onSuccess }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [mode, setMode] = useState("existing"); // existing | new
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  /* ================= LOAD DATA ================= */

  const loadData = useCallback(async () => {
    try {
      const [studentsRes, coursesRes, sessionsRes] = await Promise.all([
        fetchStudents(),
        getCourses(),
        getSessions(),
      ]);

      setStudents(studentsRes?.data?.data?.students || []);
      setCourses(coursesRes?.data?.data?.courses || []);
      setSessions(sessionsRes?.data?.data?.sessions || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load students / courses / sessions");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* ================= HANDLERS ================= */

  const switchMode = (type) => {
    setMode(type);
    setForm(INITIAL_FORM);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    const student = students.find((s) => s.id === studentId);

    setForm((prev) => ({
      ...prev,
      studentId,
      courseId: student?.courseId || "",
    }));
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    if (!form.sessionId) return "Session is required";

    if (mode === "existing") {
      if (!form.studentId) return "Please select a student";
      if (!form.courseId)
        return "Selected student does not have a course";
    }

    if (mode === "new") {
      if (!form.name.trim()) return "Student name is required";
      if (!form.email.trim()) return "Email is required";
      if (!form.phone.trim()) return "Phone number is required";
      if (!form.courseId) return "Course is required";
    }

    return null;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);

      let studentId = form.studentId;

      // 🔹 Create student if NEW
      if (mode === "new") {
        const studentRes = await createStudent({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          courseId: form.courseId,
          sessionId: form.sessionId,
        });

        studentId = studentRes?.data?.data?.student?.id;
        if (!studentId) {
          throw new Error("Student creation failed");
        }
      }

      // 🔹 Create admission (STRICT payload)
      const admissionRes = await createAdmission({
        studentId,
        courseId: form.courseId,
        sessionId: form.sessionId,
      });

      const admissionId =
        admissionRes?.data?.data?.admission?.id;

      toast.success("Student admitted successfully 🎉");

      // Reset form after success
      setForm(INITIAL_FORM);
      setMode("existing");

      onSuccess?.(admissionId);
    } catch (err) {
      console.error("Admission error:", err);

      toast.error(
        err.response?.data?.message ||
          "Admission failed (student may already be admitted or window closed)"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* MODE SWITCH */}
      <div className="flex gap-3">
        {["existing", "new"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => switchMode(t)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
              ${
                mode === t
                  ? "bg-[color:var(--color-primary)] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
          >
            {t === "existing" ? "Existing Student" : "New Student"}
          </button>
        ))}
      </div>

      {/* EXISTING STUDENT */}
      {mode === "existing" && (
        <select
          value={form.studentId}
          onChange={handleStudentSelect}
          className="w-full border p-2 rounded bg-white"
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.email})
            </option>
          ))}
        </select>
      )}

      {/* NEW STUDENT */}
      {mode === "new" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded sm:col-span-2"
          />
        </div>
      )}

      {/* COURSE */}
      <select
        name="courseId"
        value={form.courseId}
        onChange={handleChange}
        disabled={mode === "existing"}
        className="w-full border p-2 rounded bg-white disabled:bg-gray-100"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.code})
          </option>
        ))}
      </select>

      {/* SESSION */}
      <select
        name="sessionId"
        value={form.sessionId}
        onChange={handleChange}
        className="w-full border p-2 rounded bg-white"
      >
        <option value="">Select Session</option>
        {sessions.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[color:var(--color-primary)] text-white py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Processing..." : "Add & Admit Student"}
      </button>
    </form>
  );
};

export default AddStudent;
