import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Course = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "B.Sc Computer Science",
      duration: "3 Years",
      department: "Science",
      seats: 60,
    },
    {
      id: 2,
      name: "B.A English",
      duration: "3 Years",
      department: "Arts",
      seats: 80,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    department: "",
    seats: "",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id
            ? { ...course, ...formData }
            : course
        )
      );
    } else {
      setCourses([
        ...courses,
        { id: Date.now(), ...formData },
      ]);
    }

    setFormData({
      name: "",
      duration: "",
      department: "",
      seats: "",
    });
    setEditingCourse(null);
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
            Course Management
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Manage academic courses offered by the college
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingCourse(null);
            setFormData({
              name: "",
              duration: "",
              department: "",
              seats: "",
            });
          }}
          className="
            flex items-center gap-2
            bg-[color:var(--color-primary)]
            text-white px-5 py-2 rounded-lg
            hover:opacity-90 transition
          "
        >
          <FaPlus /> Add Course
        </button>
      </div>

      {/* ================= ADD / EDIT FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleAddOrUpdate}
          className="bg-[color:var(--color-surface)] p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Course Name"
            required
            className="border p-3 rounded-lg"
          />
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (e.g. 3 Years)"
            required
            className="border p-3 rounded-lg"
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
            className="border p-3 rounded-lg"
          />
          <input
            name="seats"
            type="number"
            value={formData.seats}
            onChange={handleChange}
            placeholder="Total Seats"
            required
            className="border p-3 rounded-lg"
          />

          <div className="md:col-span-4 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {editingCourse ? "Update Course" : "Add Course"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ================= COURSE TABLE ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Course Name</th>
              <th className="text-left p-4">Duration</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Seats</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{course.name}</td>
                <td className="p-4">{course.duration}</td>
                <td className="p-4">{course.department}</td>
                <td className="p-4">{course.seats}</td>
                <td className="p-4 text-center flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {courses.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Course;
