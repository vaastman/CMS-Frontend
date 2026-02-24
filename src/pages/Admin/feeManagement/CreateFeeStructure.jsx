// src/pages/Admin/feeManagement/CreateFeeStructure.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const CreateFeeStructure = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    course: "",
    session: "",
    tuitionFee: "",
    admissionFee: "",
    examFee: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Fee Structure:", form);
    navigate("/admin/fees");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">
          Create Fee Structure
        </h2>

        <button
          onClick={() => navigate("/admin/fees")}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg"
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
          name="course"
          placeholder="Course Name"
          value={form.course}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="session"
          placeholder="Session"
          value={form.session}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="tuitionFee"
          placeholder="Tuition Fee"
          value={form.tuitionFee}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="admissionFee"
          placeholder="Admission Fee"
          value={form.admissionFee}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="examFee"
          placeholder="Exam Fee"
          value={form.examFee}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <FaSave />
          Save Structure
        </button>
      </form>
    </div>
  );
};

export default CreateFeeStructure;