import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";

import { createStudent, updateStudent } from "@/api/student.api";
import { getSessions } from "@/api/session.api";
import { getCourses } from "@/api/course.api";

const Students = () => {
  /* ================= INITIAL FORM ================= */
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    fatherName: "",
    address: "",
    sessionId: "",
    courseId: "",
  };

  /* ================= STATE ================= */
  const [form, setForm] = useState(initialForm);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    session: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  /* ================= LOAD SESSIONS ================= */
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getSessions();
        setSessions(res?.data?.data?.sessions || res?.data?.data || []);
      } catch {
        toast.error("Failed to load sessions");
      }
    };
    fetchSessions();
  }, []);

  /* ================= LOAD COURSES (CREATE MODE) ================= */
  useEffect(() => {
    if (!form.sessionId || isEdit) return;

    const fetchCourses = async () => {
      try {
        const res = await getCourses({ sessionId: form.sessionId });
        setCourses(res?.data?.data?.courses || res?.data?.data || []);
      } catch {
        toast.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, [form.sessionId, isEdit]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sessionId") {
      setForm({ ...form, sessionId: value, courseId: "" });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  /* ================= CLOSE MODAL ================= */
  const closeModal = () => {
    setOpenStudentModal(false);
    setForm(initialForm);
    setIsEdit(false);
    setEditingStudentId(null);
    setCourses([]);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["name", "email", "phone", "sessionId", "courseId"];
    for (const key of required) {
      if (!form[key]) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      dob: form.dob || undefined,
      fatherName: form.fatherName || undefined,
      address: form.address || undefined,
      sessionId: form.sessionId,
      courseId: form.courseId,
    };

    try {
      setLoading(true);

      if (isEdit) {
        await updateStudent(editingStudentId, payload);
        toast.success("Student updated successfully ✅");
      } else {
        await createStudent(payload);
        toast.success("Student registered successfully 🎉");
      }

      closeModal();
      setRefreshKey((k) => k + 1);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0] ||
          "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT (PROFESSIONAL FIX) ================= */
  const handleEdit = async (student) => {
    setIsEdit(true);
    setEditingStudentId(student.id);

    const sessionId = student.session?.id || "";
    const courseId = student.course?.id || "";

    // Step 1: Set base form (course empty)
    setForm({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      dob: student.dob ? student.dob.split("T")[0] : "",
      fatherName: student.fatherName || "",
      address: student.address || "",
      sessionId,
      courseId: "",
    });

    // Step 2: Load courses FIRST
    if (sessionId) {
      try {
        const res = await getCourses({ sessionId });
        const list = res?.data?.data?.courses || res?.data?.data || [];
        setCourses(list);

        // Step 3: Set course AFTER options exist
        setForm((prev) => ({
          ...prev,
          courseId,
        }));
      } catch {
        toast.error("Failed to load courses");
      }
    }

    setOpenStudentModal(true);
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p className="text-sm text-gray-500">
            Academics / Student Management
          </p>
        </div>

        <button
          onClick={() => {
            setIsEdit(false);
            setEditingStudentId(null);
            setForm(initialForm);
            setCourses([]);
            setOpenStudentModal(true);
          }}
          className="px-5 py-2 rounded-xl text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          + Add Student
        </button>
      </div>

      {/* FILTERS */}
      <StudentFilters
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      {/* TABLE */}
      <StudentTable
        search={search}
        filters={filters}
        refreshKey={refreshKey}
        onEdit={handleEdit}
      />

      {/* MODAL */}
      {openStudentModal && (
        <div
          key={editingStudentId || "create"}
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl grid grid-cols-2 gap-4 w-full max-w-3xl"
          >
            <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" />
            <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email *" />
            <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone *" />
            <input className="input" type="date" name="dob" value={form.dob} onChange={handleChange} />
            <input className="input" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father Name" />
            <textarea className="input col-span-2" name="address" value={form.address} onChange={handleChange} placeholder="Address" />

            <select
              className="input"
              name="sessionId"
              value={form.sessionId}
              onChange={handleChange}
              disabled={isEdit}   // professional UX
            >
              <option value="">Select Session *</option>
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.startYear}-{s.endYear})
                </option>
              ))}
            </select>

            <select
              className="input"
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
            >
              <option value="">Select Course *</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="col-span-2 flex justify-end gap-3">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>

              <button
                type="submit"
                className="text-white px-5 py-2 rounded"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {loading
                  ? isEdit ? "Updating..." : "Registering..."
                  : isEdit ? "Update Student" : "Register Student"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Students;
