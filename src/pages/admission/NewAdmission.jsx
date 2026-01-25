import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createStudent } from "@/api/student.api";
import { getDepartments } from "@/api/department.api";
import { getCourses } from "@/api/course.api";
import { getSessions } from "@/api/session.api";
import { getSemesters } from "@/api/semester.api";

/* ================= INITIAL STATE ================= */

const initialForm = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  fatherName: "",
  gender: "",
  category: "",
  address: "",
  departmentId: "",
  courseId: "",
  sessionId: "",
  semesterId: "",
  admissionType: "NEW",
  academicYear: "",
};

const NewAdmission = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters, setSemesters] = useState([]);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    loadInitialData();
  }, []);

 const loadInitialData = async () => {
  try {
    const deptRes = await getDepartments();
    const sessionRes = await getSessions();

    console.log("Departments RAW:", deptRes.data);
    console.log("Sessions RAW:", sessionRes.data);

    setDepartments(
      Array.isArray(deptRes?.data?.data?.departments)
        ? deptRes.data.data.departments
        : []
    );

    setSessions(
      Array.isArray(sessionRes?.data?.data?.sessions)
        ? sessionRes.data.data.sessions
        : []
    );
  } catch (err) {
    console.error("Initial load error:", err);
    toast.error("Failed to load admission data");
  }
};


  /* ================= DEPENDENT DROPDOWNS ================= */

  useEffect(() => {
  if (!form.departmentId) {
    setCourses([]);
    setSemesters([]);
    setForm((p) => ({ ...p, courseId: "", semesterId: "" }));
    return;
  }

  getCourses({ departmentId: form.departmentId })
    .then((res) => {
      console.log("Courses RAW:", res.data);

      setCourses(
        Array.isArray(res?.data?.data?.courses)
          ? res.data.data.courses
          : []
      );
    })
    .catch(() => {
      setCourses([]);
      toast.error("Failed to load courses");
    });
}, [form.departmentId]);


useEffect(() => {
  if (!form.courseId) {
    setSemesters([]);
    setForm((p) => ({ ...p, semesterId: "" }));
    return;
  }

  getSemesters({ courseId: form.courseId })
    .then((res) => {
      console.log("Semesters RAW:", res.data);

      setSemesters(
        Array.isArray(res?.data?.data?.semesters)
          ? res.data.data.semesters
          : []
      );
    })
    .catch(() => {
      setSemesters([]);
      toast.error("Failed to load semesters");
    });
}, [form.courseId]);


  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (form.name.length < 2) return "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email";
    if (!/^[0-9]{10}$/.test(form.phone)) return "Phone must be 10 digits";
    if (!form.departmentId || !form.courseId || !form.sessionId || !form.semesterId)
      return "All academic fields are required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    try {
      setLoading(true);
      await createStudent(form);
      toast.success("Admission submitted successfully 🎉");
      setForm(initialForm);
      setCourses([]);
      setSemesters([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">New Admission Form</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[color:var(--color-surface)] p-8 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* BASIC */}
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input type="date" label="DOB" name="dob" value={form.dob} onChange={handleChange} />

        {/* STATIC */}
        <SelectSimple
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          options={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Other", value: "OTHER" },
          ]}
        />

        <SelectSimple
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          options={[
            { label: "General", value: "GENERAL" },
            { label: "BC-I", value: "BC_I" },
            { label: "BC-II", value: "BC_II" },
            { label: "SC", value: "SC" },
            { label: "ST", value: "ST" },
            { label: "EWS", value: "EWS" },
          ]}
        />

        {/* BACKEND */}
        <SelectSimple
          label="Department"
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
          options={departments.map((d) => ({
            label: d.name || d.departmentName,
            value: d.id || d._id,
          }))}
        />

        <SelectSimple
          label="Course"
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
          disabled={!form.departmentId}
          options={courses.map((c) => ({
            label: c.name || c.courseName,
            value: c.id || c._id,
          }))}
        />

        <SelectSimple
          label="Session"
          name="sessionId"
          value={form.sessionId}
          onChange={handleChange}
          options={sessions.map((s) => ({
            label: s.name || s.sessionName || s.year,
            value: s.id || s._id,
          }))}
        />

        <SelectSimple
          label="Semester"
          name="semesterId"
          value={form.semesterId}
          onChange={handleChange}
          disabled={!form.courseId}
          options={semesters.map((s) => ({
            label: s.name || s.semesterName,
            value: s.id || s._id,
          }))}
        />

        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={loading}
            className="px-8 py-3 rounded-lg bg-[color:var(--color-primary)] text-white"
          >
            {loading ? "Submitting..." : "Submit Admission"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAdmission;

/* ================= SIMPLE COMPONENTS ================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input {...props} className="w-full px-3 py-2 border rounded-lg" />
  </div>
);

const SelectSimple = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <select {...props} className="w-full px-3 py-2 border rounded-lg bg-white text-black">
      <option value="">Select</option>
      {options.map((o, i) => (
        <option key={o.value || i} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);
