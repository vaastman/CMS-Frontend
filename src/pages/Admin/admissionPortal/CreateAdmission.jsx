// src/pages/Admin/admissionPortal/CreateAdmission.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const CreateAdmission = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        courseName: "",
        session: "",
        startDate: "",
        lastDate: "",
        status: "OPEN",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();

        console.log("Admission Created:", form); // 🔥 Replace with API later
        navigate("/admin/admission-portal");
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">
                        Create Admission Portal
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Add a new admission cycle for students
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/admin/admission-portal")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    <FaArrowLeft size={14} />
                    Back
                </button>
            </div>

            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-xl shadow border space-y-4"
            >
                <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={form.courseName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="text"
                    name="session"
                    placeholder="Session (e.g. 2025 - 2029)"
                    value={form.session}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="date"
                    name="lastDate"
                    value={form.lastDate}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                >
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>

                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 rounded-lg text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    <FaSave />
                    Save Admission
                </button>
            </form>
        </div>
    );
};

export default CreateAdmission;