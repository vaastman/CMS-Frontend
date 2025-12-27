import React, { useState } from "react";
import {
  FaUserEdit,
  FaTimes,
  FaCamera,
} from "react-icons/fa";

const Setting = () => {
  const [openModal, setOpenModal] = useState(false);

  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@ssdmcollege.edu",
    role: "System Administrator",
    phone: "0612-2353295",
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Profile:", admin);
    setOpenModal(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl space-y-8">

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6 flex items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Admin"
            className="w-24 h-24 rounded-2xl object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            {admin.name}
          </h2>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {admin.email}
          </p>
          <p className="text-xs mt-1 text-[color:var(--color-text-secondary)]">
            {admin.role}
          </p>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="
            flex items-center gap-2
            bg-[color:var(--color-primary)]
            text-white px-5 py-2 rounded-lg
            hover:opacity-90 transition
          "
        >
          <FaUserEdit /> Edit Profile
        </button>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="bg-[color:var(--color-surface)] w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">
                Account Details
              </h3>
              <button onClick={() => setOpenModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* LEFT MENU */}
              <aside className="border-r p-6 text-sm space-y-4 bg-gray-50">
                <p className="font-medium text-[color:var(--color-primary)]">
                  Account Details
                </p>
                <p className="text-gray-500 cursor-not-allowed">
                  Security (Coming soon)
                </p>
              </aside>

              {/* RIGHT FORM */}
              <div className="md:col-span-2 p-6 space-y-6">

                {/* Avatar Upload */}
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Avatar"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <button className="flex items-center gap-2 text-sm text-[color:var(--color-primary)]">
                    <FaCamera /> Change Photo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={admin.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border p-3 rounded-lg"
                  />
                  <input
                    name="email"
                    value={admin.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                  />
                  <input
                    value={admin.role}
                    disabled
                    className="border p-3 rounded-lg bg-gray-100"
                  />
                  <input
                    name="phone"
                    value={admin.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border p-3 rounded-lg"
                  />
                </div>

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
                    Update
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

export default Setting;
