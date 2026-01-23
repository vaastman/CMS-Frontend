import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";

import { createStudent } from "@/api/student.api";
import { getSessions } from "@/api/session.api";
import { getCourses } from "@/api/course.api";

const Students = () => {
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

  const [form, setForm] = useState(initialForm);
  const [openStudentModal, setOpenStudentModal] = useState(false);
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
        console.log("🔵 Fetching sessions");
        const res = await getSessions();

        const list =
          Array.isArray(res?.data?.data?.sessions)
            ? res.data.data.sessions
            : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];

        console.log("✅ Sessions:", list);
        setSessions(list);
      } catch (err) {
        console.error("❌ Session fetch error:", err);
        toast.error("Failed to load sessions");
      }
    };

    fetchSessions();
  }, []);

  /* ================= LOAD COURSES ================= */
  useEffect(() => {
    const fetchCourses = async () => {
      if (!form.sessionId) {
        setCourses([]);
        return;
      }

      try {
        console.log("🔵 Fetching courses for session:", form.sessionId);
        const res = await getCourses({ sessionId: form.sessionId });

        const list =
          Array.isArray(res?.data?.data?.courses)
            ? res.data.data.courses
            : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];

        console.log("✅ Courses:", list);
        setCourses(list);
      } catch (err) {
        console.error("❌ Course fetch error:", err);
        toast.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, [form.sessionId]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sessionId") {
      setForm({ ...form, sessionId: value, courseId: "" });
      return;
    }

    setForm({ ...form, [name]: value });
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

    if (form.dob && new Date(form.dob) > new Date()) {
      toast.error("Date of birth cannot be in the future");
      return;
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

      console.log("🟡 Create student payload:", payload);

      const res = await createStudent(payload);

      console.log("🟢 Create student response:", res.data);

      toast.success("Student registered successfully 🎉");
      setForm(initialForm);
      setOpenStudentModal(false);
    } catch (err) {
      console.error("❌ Student create error:", err);
      console.error("❌ Backend error:", err?.response?.data);

      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0] ||
          "Student registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p className="text-sm text-gray-500">Academics / Student Management</p>
        </div>

        <button
          onClick={() => setOpenStudentModal(true)}
          className="px-5 py-2 rounded-xl text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          + Add Student
        </button>
      </div>

      <StudentFilters
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      <StudentTable search={search} filters={filters} refreshKey={refreshKey} />

      {openStudentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
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

            <select className="input" name="sessionId" value={form.sessionId} onChange={handleChange}>
              <option value="">Select Session *</option>
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.startYear}-{s.endYear})
                </option>
              ))}
            </select>

            <select className="input" name="courseId" value={form.courseId} onChange={handleChange}>
              <option value="">Select Course *</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="col-span-2 flex justify-end gap-3">
              <button type="button" onClick={() => setOpenStudentModal(false)}>
                Cancel
              </button>
              <button type="submit" className="text-white px-5 py-2 rounded" style={{ backgroundColor: "var(--color-primary)" }}>
                {loading ? "Registering..." : "Register Student"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Students;
