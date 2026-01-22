import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/api/course.api";

import { getDepartments } from "@/api/department.api";
import { getSessions } from "@/api/session.api";

const Course = () => {
  /* ================= STATES ================= */
  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialForm = {
    name: "",
    code: "",
    durationYears: "",
    departmentId: "",
  };

  const [formData, setFormData] = useState(initialForm);

  /* ================= FETCH SESSIONS ================= */
  const loadSessions = async () => {
    try {
      const res = await getSessions();

      const list =
        Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data?.data?.sessions)
          ? res.data.data.sessions
          : [];

      setSessions(list);
    } catch {
      toast.error("Failed to load sessions");
      setSessions([]);
    }
  };

  /* ================= FETCH COURSES ================= */
  const loadCourses = async (activeSession) => {
    if (!activeSession) {
      setCourses([]);
      return;
    }

    try {
      const res = await getCourses({ sessionId: activeSession });

      const list =
        Array.isArray(res?.data?.data?.courses)
          ? res.data.data.courses
          : Array.isArray(res?.data?.courses)
          ? res.data.courses
          : [];

      setCourses(list);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load courses");
      setCourses([]);
    }
  };

  /* ================= FETCH DEPARTMENTS ================= */
  const loadDepartments = async () => {
    try {
      const res = await getDepartments();

      const list =
        Array.isArray(res?.data?.data?.departments)
          ? res.data.data.departments
          : Array.isArray(res?.data?.departments)
          ? res.data.departments
          : Array.isArray(res?.data?.data)
          ? res.data.data
          : [];

      setDepartments(list);
    } catch {
      toast.error("Failed to load departments");
      setDepartments([]);
    }
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    loadSessions();
    loadDepartments();
  }, []);

  useEffect(() => {
    if (sessionId) loadCourses(sessionId);
  }, [sessionId]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionId) {
      toast.error("Please select academic session");
      return;
    }

    const payload = {
      sessionId,
      name: formData.name.trim(),
      code: formData.code.trim(),
      durationYears: Number(formData.durationYears),
      departmentId: formData.departmentId,
    };

    if (
      !payload.name ||
      !payload.code ||
      payload.durationYears < 1 ||
      !payload.departmentId
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      if (editingCourse) {
        await updateCourse(editingCourse.id, payload);
        toast.success("Course updated successfully");
      } else {
        await createCourse(payload);
        toast.success("Course created successfully");
      }

      setShowForm(false);
      setEditingCourse(null);
      setFormData(initialForm);
      loadCourses(sessionId);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setSessionId(course.sessionId);

    setFormData({
      name: course.name,
      code: course.code,
      durationYears: course.durationYears,
      departmentId: course.departmentId,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await deleteCourse(id);
      toast.success("Course deleted");
      loadCourses(sessionId);
    } catch {
      toast.error("Delete failed");
    }
  };

  const getDepartmentName = (id) => {
    const dept = departments.find((d) => d.id === id);
    return dept ? dept.name : "-";
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Course Management</h1>
          <p className="text-sm text-gray-500">
            Manage academic courses by session
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingCourse(null);
            setFormData(initialForm);
            setSessionId("");
          }}
          className="flex items-center gap-2 text-white px-5 py-2 rounded-lg"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <FaPlus /> Add Course
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* SESSION */}
          <select
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="border p-3 rounded-lg md:col-span-2"
          >
            <option value="">Select Academic Session *</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.startYear}-{s.endYear})
              </option>
            ))}
          </select>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Course Name"
            className="border p-3 rounded-lg"
          />

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Course Code (CS101)"
            className="border p-3 rounded-lg"
          />

          <input
            name="durationYears"
            type="number"
            min="1"
            value={formData.durationYears}
            onChange={handleChange}
            placeholder="Duration (Years)"
            className="border p-3 rounded-lg"
          />

          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Department *</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <div className="md:col-span-4 flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {loading
                ? "Saving..."
                : editingCourse
                ? "Update Course"
                : "Create Course"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: "var(--color-danger)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="border-t">
                  <td className="p-4">{course.name}</td>
                  <td className="p-4">{course.code}</td>
                  <td className="p-4">{course.durationYears} Years</td>
                  <td className="p-4">
                    {getDepartmentName(course.departmentId)}
                  </td>
                  <td className="p-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
