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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Next Step:
    // 1. Call backend API
    // 2. Redirect to payment page
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Degree */}
      <select
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Degree</option>
        <option value="BA">BA</option>
        <option value="BSc">BSc</option>
        <option value="BCom">BCom</option>
      </select>

      {/* Course */}
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Certificate Type */}
      <select
        name="certificateType"
        value={formData.certificateType}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Certificate Type</option>
        <option value="Bonafide">Bonafide</option>
        <option value="CLC">CLC / Transfer Certificate</option>
        <option value="Character">Character Certificate</option>
      </select>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Father Name */}
      <input
        type="text"
        name="fatherName"
        placeholder="Father's Name"
        value={formData.fatherName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Roll No */}
      <input
        type="text"
        name="rollNo"
        placeholder="Class Roll No"
        value={formData.rollNo}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* DOB */}
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Upload Documents */}
      <div>
        <label className="block mb-1 font-medium">
          Upload No Dues (PDF)
        </label>
        <input type="file" accept=".pdf" className="w-full" />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit & Proceed to Payment
      </button>
    </form>
  );
};

export default CertificateForm;