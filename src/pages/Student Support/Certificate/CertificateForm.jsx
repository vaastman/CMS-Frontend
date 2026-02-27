import { useState } from "react";

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    degree: "",
    course: "",
    subject: "",
    certificateType: "",
    rollNo: "",
    name: "",
    fatherName: "",
    motherName: "",
    gender: "Male",
    dob: "",
    domicile: "",
    universityRegNo: "",
    universityRollNo: "",
    academicStartYear: "",
    academicEndYear: "",
    passingYear: "",
    passingMonth: "",
    division: "",
    characterCertificate: "No",
  });

  const certificateFees = {
    Bonafide: 200,
    CLC: 500,
    Character: 300,
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    // Next:
    // 1. Call backend API
    // 2. Redirect to payment page
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* ================= Academic Details ================= */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Academic Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Degree *</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Degree</option>
              <option value="BA">BA</option>
              <option value="BSc">BSc</option>
              <option value="BCom">BCom</option>
            </select>
          </div>

          <div>
            <label className="form-label">Course *</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">Certificate Type *</label>
            <select
              name="certificateType"
              value={formData.certificateType}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Certificate</option>
              <option value="Bonafide">Bonafide Certificate</option>
              <option value="CLC">CLC / Transfer Certificate</option>
              <option value="Character">Character Certificate</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= Personal Details ================= */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Personal Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Class Roll No *" name="rollNo" value={formData.rollNo} onChange={handleChange} />
          <Input label="Student Name *" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Father's Name *" name="fatherName" value={formData.fatherName} onChange={handleChange} />
          <Input label="Mother's Name *" name="motherName" value={formData.motherName} onChange={handleChange} />
          <Input label="Domicile *" name="domicile" value={formData.domicile} onChange={handleChange} />
          <Input type="date" label="Date of Birth *" name="dob" value={formData.dob} onChange={handleChange} />

          <div>
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-input"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= University Details ================= */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          University Details
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="University Registration No *" name="universityRegNo" value={formData.universityRegNo} onChange={handleChange} />
          <Input label="University Roll No *" name="universityRollNo" value={formData.universityRollNo} onChange={handleChange} />
          <Input label="Academic Start Year *" name="academicStartYear" value={formData.academicStartYear} onChange={handleChange} />
          <Input label="Academic End Year *" name="academicEndYear" value={formData.academicEndYear} onChange={handleChange} />
          <Input label="Passing Year *" name="passingYear" value={formData.passingYear} onChange={handleChange} />
          <Input label="Division *" name="division" value={formData.division} onChange={handleChange} />
        </div>
      </div>

      {/* ================= Document Upload ================= */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">
          Required Documents (PDF only)
        </h2>

        <div className="space-y-3">
          <FileUpload label="No Dues Certificate (PDF)" />
          <FileUpload label="Final Year Fee Receipt (PDF)" />
          <FileUpload label="Final Year Marksheet (PDF)" />
        </div>
      </div>

      {/* ================= Fee Display ================= */}
      {formData.certificateType && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm">
          Certificate Fee: ₹ {certificateFees[formData.certificateType]}
        </div>
      )}

      {/* ================= Submit ================= */}
      <button
        type="submit"
        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] 
                   text-white py-3 rounded-lg font-semibold transition"
      >
        Submit & Proceed to Payment
      </button>
    </form>
  );
};

/* ================= Reusable Components ================= */

const Input = ({ label, type = "text", name, value, onChange }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
      required
    />
  </div>
);

const FileUpload = ({ label }) => (
  <div>
    <label className="form-label">{label}</label>
    <input
      type="file"
      accept=".pdf"
      className="form-input"
    />
  </div>
);

export default CertificateForm;