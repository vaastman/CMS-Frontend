import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "@/api/subjectMaster.api";

import { getCourses } from "@/api/course.api";
import { getSemesters } from "@/api/semester.api";

const SubjectMaster = () => {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "",
    courseId: "",
    semesterId: "",
  });

  /* ================= FETCH ================= */
  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res?.data?.data?.subjects || []);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res?.data?.data?.courses || []);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const fetchSemesters = async (courseId) => {
    if (!courseId) return setSemesters([]);
    try {
      const res = await getSemesters({ courseId });
      setSemesters(res?.data?.data?.semesters || []);
    } catch {
      toast.error("Failed to load semesters");
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchCourses();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset semester when course changes
    if (name === "courseId") {
      setForm({ ...form, courseId: value, semesterId: "" });
      fetchSemesters(value);
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      code: "",
      type: "",
      courseId: "",
      semesterId: "",
    });
    setEditing(null);
    setSemesters([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editing) {
        await updateSubject(editing.id || editing._id, form);
        toast.success("Subject updated");
      } else {
        await createSubject(form);
        toast.success("Subject created");
      }

      setOpen(false);
      resetForm();
      fetchSubjects();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject) => {
    setEditing(subject);
    setForm({
      name: subject.name,
      code: subject.code,
      type: subject.type,
      courseId: subject.courseId,
      semesterId: subject.semesterId,
    });
    fetchSemesters(subject.courseId);
    setOpen(true);
  };

  const handleDelete = async (subject) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      await deleteSubject(subject.id || subject._id);
      toast.success("Subject deleted");
      fetchSubjects();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Subject Master</h1>
        <button
          className="btn-primary flex items-center gap-2"
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="th">Name</th>
              <th className="th">Code</th>
              <th className="th">Type</th>
              <th className="th">Semester</th>
              <th className="th">Course</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id || s._id} className="border-t">
                <td className="td">{s.name}</td>
                <td className="td">{s.code}</td>
                <td className="td">{s.type}</td>
                <td className="td">Sem {s.semester?.number}</td>
                <td className="td">{s.course?.name}</td>
                <td className="td flex gap-3">
                  <button onClick={() => handleEdit(s)}>
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(s)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {!subjects.length && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No subjects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Edit Subject" : "Create Subject"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Subject Name"
                value={form.name}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="code"
                placeholder="Subject Code"
                value={form.code}
                onChange={handleChange}
                required
                className="input"
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select Type</option>
                <option value="MJC">MJC</option>
                <option value="MIC">MIC</option>
                <option value="MDC">MDC</option>
                <option value="SEC">SEC</option>
                <option value="VAC">VAC</option>
              </select>

              <select
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                name="semesterId"
                value={form.semesterId}
                onChange={handleChange}
                required
                disabled={!form.courseId}
                className="input"
              >
                <option value="">Select Semester</option>
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    Semester {s.number}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-1/2 border rounded py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-1/2"
                >
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectMaster;
