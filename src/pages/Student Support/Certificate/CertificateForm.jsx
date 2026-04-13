import { useState } from "react";
import { createCertificate } from "@/api/certificate.api";
import { toast } from "react-toastify";

const CertificateForm = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    studentId: "",
    departmentId: "",
    certificateType: "",
    purpose: "",
  });

  const certificateFees = {
    BONAFIDE: 200,
    CLC: 500,
    CHARACTER: 300,
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        studentId: form.studentId,
        departmentId: form.departmentId,
        type: form.certificateType,
        purpose: form.purpose,
      };

      console.log("Payload:", payload);

      await createCertificate(payload);

      toast.success("Certificate request submitted successfully");
    } catch (error) {
      console.error(error.response?.data);
      toast.error(
        error.response?.data?.message ||
          "Failed to submit certificate request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-8">
          Certificate Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* IDs Section */}
          <div className="grid md:grid-cols-2 gap-5">

            <Input
              label="Student ID (UUID)"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
            />

            <Input
              label="Department ID (UUID)"
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
            />

          </div>

          {/* Certificate Type */}
          <SelectField
            label="Certificate Type"
            name="certificateType"
            value={form.certificateType}
            onChange={handleChange}
            options={["BONAFIDE", "CLC","CHARACTER"]}
          />

          {/* Purpose */}
          <Textarea
            label="Purpose"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
          />

          {/* Fee */}
          {form.certificateType && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between items-center">
              <span>Certificate Fee</span>
              <span className="font-bold text-blue-700 text-lg">
                ₹{certificateFees[form.certificateType]}
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Submitting..." : "Submit & Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 outline-none"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 outline-none"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-3 py-2 outline-none"
    />
  </div>
);

export default CertificateForm;