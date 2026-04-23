import { useState } from "react";
import { toast } from "react-toastify";

const CertificateEditModal = ({ certificate, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: certificate.name || "",
    fatherName: certificate.fatherName || "",
    motherName: certificate.motherName || "",
    universityRoll: certificate.universityRoll || "",
    registrationNo: certificate.registrationNo || "",
    collegeRoll: certificate.collegeRoll || "",
    courseName: certificate.courseName || "",
    departmentName: certificate.departmentName || "",
    semester: certificate.semester || "",
    session: certificate.session || "",
    dob: certificate.dob ? certificate.dob.split("T")[0] : "",
    remarks: certificate.remarks || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.fatherName) {
      toast.error("Name and Father's Name are required");
      return;
    }

    try {
      setSaving(true);
      await onSave(formData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Edit Certificate Application</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Father's Name *"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
              <Input
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
              <Input
                type="date"
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
              Academic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="University Roll"
                name="universityRoll"
                value={formData.universityRoll}
                onChange={handleChange}
              />
              <Input
                label="Registration No"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
              />
              <Input
                label="College Roll"
                name="collegeRoll"
                value={formData.collegeRoll}
                onChange={handleChange}
              />
              <Input
                label="Course Name"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
              />
              <Input
                label="Department Name"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
              />
              <Input
                label="Semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              />
              <Input
                label="Session"
                name="session"
                value={formData.session}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
              Remarks
            </h3>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Add any remarks or notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
    />
  </div>
);

export default CertificateEditModal;
