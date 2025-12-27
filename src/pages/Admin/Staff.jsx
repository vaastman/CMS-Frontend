import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Staff = () => {
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: "Dr. Amit Kumar",
      role: "Professor",
      department: "Computer Science",
      email: "amit@college.edu",
    },
    {
      id: 2,
      name: "Ms. Neha Singh",
      role: "Assistant Professor",
      department: "Mathematics",
      email: "neha@college.edu",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (editingStaff) {
      setStaffList(
        staffList.map((staff) =>
          staff.id === editingStaff.id
            ? { ...staff, ...formData }
            : staff
        )
      );
    } else {
      setStaffList([
        ...staffList,
        { id: Date.now(), ...formData },
      ]);
    }

    setFormData({ name: "", role: "", department: "", email: "" });
    setEditingStaff(null);
    setShowForm(false);
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setFormData(staff);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      setStaffList(staffList.filter((staff) => staff.id !== id));
    }
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
            Staff Management
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Manage college teaching & non-teaching staff
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingStaff(null);
            setFormData({ name: "", role: "", department: "", email: "" });
          }}
          className="
            flex items-center gap-2
            bg-[color:var(--color-primary)]
            text-white px-5 py-2 rounded-lg
            hover:opacity-90 transition
          "
        >
          <FaPlus /> Add Staff
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
            placeholder="Full Name"
            required
            className="border p-3 rounded-lg"
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="border p-3 rounded-lg"
          />

          <div className="md:col-span-4 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {editingStaff ? "Update Staff" : "Add Staff"}
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

      {/* ================= STAFF TABLE ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Department</th>
              <th className="text-left p-4">Email</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr
                key={staff.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{staff.name}</td>
                <td className="p-4">{staff.role}</td>
                <td className="p-4">{staff.department}</td>
                <td className="p-4">{staff.email}</td>
                <td className="p-4 text-center flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {staffList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No staff records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Staff;
