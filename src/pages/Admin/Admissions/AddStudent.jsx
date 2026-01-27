import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createStudent } from "@/api/student.api";
import { getCourses } from "@/api/course.api";
import { getSessions } from "@/api/session.api";
import { getDepartments } from "@/api/department.api";
import { getSemesters } from "@/api/semester.api";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  uan_no: "",

  fatherName: "",
  gender: "OTHER",
  category: "GENERAL",
  address: "",

  departmentId: "",
  courseId: "",
  sessionId: "",
  semesterId: "",

  admissionType: "NEW",
  academicYear: "2025-26",
};

const AddStudent = ({ onSuccess }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters, setSemesters] = useState([]);

  /* ================= LOAD MASTER DATA ================= */

  useEffect(() => {
    Promise.all([getDepartments(), getCourses(), getSessions()])
      .then(([d, c, s]) => {
        setDepartments(d?.data?.data?.departments || []);
        setCourses(c?.data?.data?.courses || []);
        setSessions(s?.data?.data?.sessions || []);
      })
      .catch(() => toast.error("Failed to load master data"));
  }, []);

  /* ================= LOAD SEMESTERS ================= */

  useEffect(() => {
    if (!form.courseId) {
      setSemesters([]);
      return;
    }

    getSemesters({ courseId: form.courseId })
      .then(res => setSemesters(res?.data?.data?.semesters || []))
      .catch(() => toast.error("Failed to load semesters"));
  }, [form.courseId]);

  /* ================= HANDLER ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FRONTEND VALIDATION (MATCH JOI)
    if (!form.name) return toast.error("Name required");
    if (!form.email) return toast.error("Email required");
    if (!form.phone) return toast.error("Phone required");
    if (!form.uan_no) return toast.error("UAN required");
    if (!form.departmentId) return toast.error("Department required");
    if (!form.courseId) return toast.error("Course required");
    if (!form.sessionId) return toast.error("Session required");
    if (!form.semesterId) return toast.error("Semester required");

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        uan_no: form.uan_no.trim(),

        fatherName: form.fatherName || "NA",
        gender: form.gender,
        category: form.category,
        address: form.address || "NA",

        departmentId: form.departmentId,
        courseId: form.courseId,
        sessionId: form.sessionId,
        semesterId: form.semesterId,

        admissionType: form.admissionType,
        academicYear: form.academicYear,
      };

      await createStudent(payload);

      toast.success("Student admitted successfully 🎉");
      setForm(INITIAL_FORM);
      onSuccess?.();

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Admission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input name="name" placeholder="Student Name" value={form.name} onChange={handleChange} className="input" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
      <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} className="input" />
      <input name="uan_no" placeholder="UAN Number" value={form.uan_no} onChange={handleChange} className="input" />

      <input name="fatherName" placeholder="Father Name" value={form.fatherName} onChange={handleChange} className="input" />
      <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} className="input" />

      <select name="gender" value={form.gender} onChange={handleChange} className="input">
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>

      <select name="category" value={form.category} onChange={handleChange} className="input">
        <option value="GENERAL">General</option>
        <option value="BC_I">BC-I</option>
        <option value="BC_II">BC-II</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
        <option value="EWS">EWS</option>
      </select>

      <select name="departmentId" value={form.departmentId} onChange={handleChange} className="input">
        <option value="">Select Department</option>
        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <select name="courseId" value={form.courseId} onChange={handleChange} className="input">
        <option value="">Select Course</option>
        {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <select name="semesterId" value={form.semesterId} onChange={handleChange} className="input">
        <option value="">Select Semester</option>
        {semesters.map(s => <option key={s.id} value={s.id}>Semester {s.number}</option>)}
      </select>

      <select name="sessionId" value={form.sessionId} onChange={handleChange} className="input">
        <option value="">Select Session</option>
        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Processing..." : "Create Admission"}
      </button>

    </form>
  );
};

export default AddStudent;
