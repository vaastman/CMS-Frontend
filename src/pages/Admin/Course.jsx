import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/api/course.api";

const Course = () => {
  const [courses, setCourses] = useState([]);
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

  /* ================= FETCH COURSES ================= */
  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch {
      toast.error("Failed to load courses");
      setCourses([]);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.code ||
      !formData.durationYears ||
      !formData.departmentId
    ) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, formData);
        toast.success("Course updated successfully");
      } else {
        await createCourse(formData);
        toast.success("Course added successfully");
      }

      setShowForm(false);
      setEditingCourse(null);
      setFormData(initialForm);
      loadCourses();
    } catch (err) {
      toast.error(
        err?.response?.data?.errors?.[0] ||
          err?.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
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
      loadCourses();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Course Management</h1>
          <p className="text-sm text-gray-500">
            Manage academic courses offered by the institution
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingCourse(null);
            setFormData(initialForm);
          }}
          className="flex items-center gap-2 text-white px-5 py-2 rounded-lg"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <FaPlus /> Add Course
        </button>
      </div>

      {/* ================= FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
        >
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
            value={formData.durationYears}
            onChange={handleChange}
            placeholder="Duration (Years)"
            className="border p-3 rounded-lg"
          />

          <input
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            placeholder="Department UUID"
            className="border p-3 rounded-lg"
          />

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
                : "Add Course"}
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

      {/* ================= TABLE ================= */}
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
                  <td className="p-4">{course.departmentId}</td>
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
