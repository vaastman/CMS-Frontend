import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCertificate } from "@/api/certificate.api";
import { toast } from "react-toastify";
import {
  DEPARTMENT_OPTIONS,
  COURSE_OPTIONS,
  SEMESTER_OPTIONS,
  SESSION_OPTIONS,
  CERTIFICATE_TYPES,
  CERTIFICATE_FEES,
} from "@/utils/certificate.constants";

const CertificateForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    universityRoll: "",
    registrationNo: "",
    collegeRoll: "",
    courseName: "",
    departmentName: "",
    semester: "",
    session: "",
    dob: "",
    examMonth: "",
    examYear: "",
    resultDivision: "",
    character: "",
    purpose: "",
    certificateType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Student name is required";
    else if (formData.name.trim().length < 3) errors.name = "Name must be at least 3 characters";

    if (!formData.fatherName.trim()) errors.fatherName = "Father's name is required";
    else if (formData.fatherName.trim().length < 3) errors.fatherName = "Father's name must be at least 3 characters";

    if (!formData.certificateType) errors.certificateType = "Certificate type is required";
    if (!formData.courseName) errors.courseName = "Course is required";
    if (!formData.departmentName) errors.departmentName = "Department is required";
    if (!formData.semester) errors.semester = "Semester is required";
    if (!formData.session) errors.session = "Session is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);
      setFormErrors({});

      const payload = {
        type: formData.certificateType,
        name: formData.name.trim(),
        fatherName: formData.fatherName.trim(),
        motherName: formData.motherName.trim() || undefined,
        courseName: formData.courseName,
        departmentName: formData.departmentName,
        semester: formData.semester,
        session: formData.session,
        dob: formData.dob || undefined,
        universityRoll: formData.universityRoll.trim() || undefined,
        registrationNo: formData.registrationNo.trim() || undefined,
        collegeRoll: formData.collegeRoll.trim() || undefined,
        examMonth: formData.examMonth.trim() || undefined,
        examYear: formData.examYear.trim() || undefined,
        resultDivision: formData.resultDivision.trim() || undefined,
        character: formData.character.trim() || undefined,
        purpose: formData.purpose.trim() || undefined,
      };

      const response = await createCertificate(payload);
      const certificateId = response.data.certificateId;

      toast.success("Certificate application submitted successfully!");

      // Navigate to confirmation page
      navigate("/certificate/confirmation", {
        state: {
          certificateId,
          certificateData: formData,
          amount: CERTIFICATE_FEES[formData.certificateType],
        },
      });
    } catch (error) {
      console.error("Certificate submission error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit certificate request";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Apply for Certificate
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill in the details to apply for your certificate
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Student Name *"
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
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Academic Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="University Roll No"
                name="universityRoll"
                value={formData.universityRoll}
                onChange={handleChange}
                placeholder="Enter university roll number"
              />
              <Input
                label="Registration No"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                placeholder="Enter registration number"
              />
              <Input
                label="College Roll No"
                name="collegeRoll"
                value={formData.collegeRoll}
                onChange={handleChange}
                placeholder="Enter college roll number"
              />
              <SelectField
                label="Course *"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                options={COURSE_OPTIONS}
                required
                error={formErrors.courseName}
              />
              <SelectField
                label="Department *"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                options={DEPARTMENT_OPTIONS}
                required
                error={formErrors.departmentName}
              />
              <SelectField
                label="Semester *"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                options={SEMESTER_OPTIONS}
                required
                error={formErrors.semester}
              />
              <SelectField
                label="Session *"
                name="session"
                value={formData.session}
                onChange={handleChange}
                options={SESSION_OPTIONS}
                required
                error={formErrors.session}
              />
            </div>
          </div>

          {/* Certificate Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Certificate Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <SelectField
                label="Certificate Type *"
                name="certificateType"
                value={formData.certificateType}
                onChange={handleChange}
                options={CERTIFICATE_TYPES.map((type) => ({
                  value: type.value,
                  label: `${type.label} (₹${type.fee})`,
                }))}
                required
                error={formErrors.certificateType}
              />
              <Input
                label="Purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="e.g., For scholarship application"
              />
            </div>
          </div>

          {/* Fee Display */}
          {formData.certificateType && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Certificate Fee ({formData.certificateType})
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{CERTIFICATE_FEES[formData.certificateType]}
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            {loading ? "Submitting..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* Reusable Input Component */
const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  placeholder,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
        error
          ? "border-red-500 bg-red-50"
          : "border-gray-300"
      }`}
    />
    {error && (
      <p className="mt-1 text-xs text-red-600">{error}</p>
    )}
  </div>
);

/* Reusable Select Component */
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
        error
          ? "border-red-500 bg-red-50"
          : "border-gray-300"
      }`}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="mt-1 text-xs text-red-600">{error}</p>
    )}
  </div>
);

export default CertificateForm;
