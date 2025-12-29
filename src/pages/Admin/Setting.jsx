import React, { useState } from "react";
import { FaUserEdit, FaTimes, FaCamera } from "react-icons/fa";

const Setting = () => {
  const [openModal, setOpenModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@ssdmcollege.edu",
    role: "System Administrator",
    phone: "0612-2353295",
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    console.log("Updated Profile:", admin);
    setSaved(true);
    setTimeout(() => setOpenModal(false), 800);
  };

  return (
    <div className="max-w-5xl space-y-8">

      {/* ================= PROFILE OVERVIEW ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl border shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">

        {/* Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Admin"
            className="w-24 h-24 rounded-2xl object-cover"
          />
          <button
            title="Change photo"
            className="
              absolute bottom-2 right-2
              w-8 h-8 rounded-full
              bg-[color:var(--color-primary)]
              text-white text-xs
              flex items-center justify-center
              shadow
            "
          >
            <FaCamera />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[color:var(--color-text-primary)]">
            {admin.name}
          </h2>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {admin.email}
          </p>
          <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full
            bg-blue-100 text-blue-700">
            {admin.role}
          </span>
        </div>

        {/* Action */}
        <button
          onClick={() => setOpenModal(true)}
          className="
            flex items-center gap-2
            bg-[color:var(--color-primary)]
            text-white px-5 py-2 rounded-lg
            hover:opacity-90 transition
          "
        >
          <FaUserEdit />
          Edit Profile
        </button>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="bg-[color:var(--color-surface)] w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">
                  Account Settings
                </h3>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  Update your personal and contact information
                </p>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* LEFT NAV */}
              <aside className="border-r p-6 text-sm space-y-4 bg-gray-50">
                <p className="font-medium text-[color:var(--color-primary)]">
                  Profile Information
                </p>
                <p className="text-gray-400 cursor-not-allowed">
                  Security Settings
                </p>
                <p className="text-gray-400 cursor-not-allowed">
                  Notifications
                </p>
              </aside>

              {/* FORM */}
              <div className="md:col-span-2 p-6 space-y-6">

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Avatar"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <button className="text-sm text-[color:var(--color-primary)] flex items-center gap-2">
                    <FaCamera /> Change profile picture
                  </button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={admin.name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    value={admin.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Role"
                    value={admin.role}
                    disabled
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={admin.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Feedback */}
                {saved && (
                  <p className="text-sm text-green-600">
                    ✔ Profile updated successfully
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="px-5 py-2 rounded-lg bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="
                      px-6 py-2 rounded-lg
                      bg-[color:var(--color-primary)]
                      text-white
                    "
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= REUSABLE INPUT ================= */

const Input = ({ label, disabled, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      {...props}
      disabled={disabled}
      className={`w-full p-3 rounded-lg border
        ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
    />
  </div>
);

export default Setting;
