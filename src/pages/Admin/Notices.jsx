import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Notices = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "UG Semester-1 Admission Open",
      date: "2025-01-10",
      status: "Active",
    },
    {
      id: 2,
      title: "Examination Form Submission Deadline",
      date: "2025-01-05",
      status: "Inactive",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    status: "Active",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (editingNotice) {
      setNotices(
        notices.map((notice) =>
          notice.id === editingNotice.id
            ? { ...notice, ...formData }
            : notice
        )
      );
    } else {
      setNotices([
        ...notices,
        { id: Date.now(), ...formData },
      ]);
    }

    setFormData({ title: "", date: "", status: "Active" });
    setEditingNotice(null);
    setShowForm(false);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData(notice);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices(notices.filter((notice) => notice.id !== id));
    }
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
            Notices Management
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Create, update, and manage college notices
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingNotice(null);
            setFormData({ title: "", date: "", status: "Active" });
          }}
          className="
            flex items-center gap-2
            bg-[color:var(--color-primary)]
            text-white px-5 py-2 rounded-lg
            hover:opacity-90 transition
          "
        >
          <FaPlus /> Add Notice
        </button>
      </div>

      {/* ================= ADD / EDIT FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleAddOrUpdate}
          className="
            bg-[color:var(--color-surface)]
            p-6 rounded-2xl shadow-sm
            grid grid-cols-1 md:grid-cols-3 gap-4
          "
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Notice Title"
            required
            className="border p-3 rounded-lg md:col-span-2"
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
            className="border p-3 rounded-lg md:col-span-1"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="md:col-span-3 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {editingNotice ? "Update Notice" : "Add Notice"}
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

      {/* ================= NOTICE TABLE ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notices.map((notice) => (
              <tr
                key={notice.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{notice.title}</td>
                <td className="p-4">{notice.date}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      notice.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {notice.status}
                  </span>
                </td>
                <td className="p-4 text-center flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {notices.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No notices available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Notices;
