import { useState } from "react";
import { createCertificate } from "@/api/certificate.api";
import { toast } from "react-toastify";

const CertificateForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    departmentId: "",
    certificateType: "",
    purpose: "",
  });

  const certificateFees = {
    BONAFIDE: 200,
    CLC: 500,
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.departmentId) {
      toast.error("Student ID and Department ID are required");
      return;
    }

    if (!formData.certificateType) {
      toast.error("Please select certificate type");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        studentId: formData.studentId,
        departmentId: formData.departmentId,
        type: formData.certificateType,
        purpose:
          formData.purpose ||
          `${formData.certificateType} Certificate`,
      };

      await createCertificate(payload);

      toast.success("Certificate Request Submitted Successfully 🎉");

      setFormData({
        studentId: "",
        departmentId: "",
        certificateType: "",
        purpose: "",
      });

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to submit certificate request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Apply for Certificate
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Submit certificate request using Student & Department ID
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID *
            </label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter Student UUID"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Example: d1a9e7e9-775d-45d7-96a2-9b13f10c09d4
            </p>
          </div>

          {/* Department ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department ID *
            </label>
            <input
              type="text"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              placeholder="Enter Department UUID"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              required
            />
          </div>

          {/* Certificate Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Type *
            </label>
            <select
              name="certificateType"
              value={formData.certificateType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              required
            >
              <option value="">Select Certificate</option>
              <option value="BONAFIDE">Bonafide Certificate</option>
              <option value="CLC">CLC / Transfer Certificate</option>
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose (Optional)
            </label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Example: Bank Loan, Passport"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            />
          </div>

          {/* Fee Box */}
          {formData.certificateType && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm flex justify-between items-center">
              <span className="font-medium text-gray-700">
                Certificate Fee
              </span>
              <span className="text-lg font-semibold text-[var(--color-primary)]">
                ₹ {certificateFees[formData.certificateType]}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:opacity-90 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Submitting..." : "Submit Certificate Request"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CertificateForm;