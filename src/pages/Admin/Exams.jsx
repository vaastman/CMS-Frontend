import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Exams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: "UG Semester-1 Examination",
      course: "B.Sc Computer Science",
      date: "2025-03-15",
      status: "Open",
    },
    {
      id: 2,
      name: "PG Semester-3 Examination",
      course: "M.A English",
      date: "2025-02-20",
      status: "Closed",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    date: "",
    status: "Open",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (editingExam) {
      setExams(
        exams.map((exam) =>
          exam.id === editingExam.id
            ? { ...exam, ...formData }
            : exam
        )
      );
    } else {
      setExams([...exams, { id: Date.now(), ...formData }]);
    }

    setFormData({ name: "", course: "", date: "", status: "Open" });
    setEditingExam(null);
    setShowForm(false);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData(exam);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setExams(exams.filter((exam) => exam.id !== id));
    }
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
            Examination Management
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Create and manage examinations
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingExam(null);
            setFormData({ name: "", course: "", date: "", status: "Open" });
          }}
          className="
            flex items-center gap-2
            bg-[color:var(--color-primary)]
            text-white px-5 py-2 rounded-lg
            hover:opacity-90 transition
          "
        >
          <FaPlus /> Add Exam
        </button>
      </div>

      {/* ================= ADD / EDIT FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleAddOrUpdate}
          className="
            bg-[color:var(--color-surface)]
            p-6 rounded-2xl shadow-sm
            grid grid-cols-1 md:grid-cols-4 gap-4
          "
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Exam Name"
            required
            className="border p-3 rounded-lg md:col-span-2"
          />

          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            required
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="md:col-span-4 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {editingExam ? "Update Exam" : "Add Exam"}
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

      {/* ================= EXAMS TABLE ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Exam Name</th>
              <th className="text-left p-4">Course</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr
                key={exam.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{exam.name}</td>
                <td className="p-4">{exam.course}</td>
                <td className="p-4">{exam.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exam.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {exam.status}
                  </span>
                </td>
                <td className="p-4 text-center flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(exam)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {exams.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No examinations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Exams;
