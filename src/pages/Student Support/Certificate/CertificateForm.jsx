import { useState } from "react";
import { createCertificate } from "@/api/certificate.api";
import { toast } from "react-toastify";

const CertificateForm = () => {
  const [isOldStudent, setIsOldStudent] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ================= CURRENT STUDENT ================= */

  const [currentForm, setCurrentForm] = useState({
    studentId: "",
    departmentId: "",
    certificateType: "",
    purpose: "",
  });

  /* ================= OLD STUDENT ================= */

  const [oldForm, setOldForm] = useState({
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
  });

  const certificateFees = {
    BONAFIDE: 200,
    CLC: 500,
    Bonafide: 200,
    Character: 300,
  };

  /* ================= INPUT HANDLERS ================= */

  const handleOldChange = (e) => {
    setOldForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCurrentChange = (e) => {
    setCurrentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= SUBMIT ================= */

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    let payload;

    if (isOldStudent) {
      // OLD STUDENT FORMAT
      payload = {
        type: oldForm.certificateType.toUpperCase(),
        purpose: "Old student certificate request",

        // optional data (backend may ignore)
        studentDetails: {
          degree: oldForm.degree,
          course: oldForm.course,
          subject: oldForm.subject,
          rollNo: oldForm.rollNo,
          name: oldForm.name,
          fatherName: oldForm.fatherName,
          motherName: oldForm.motherName,
          gender: oldForm.gender,
          dob: oldForm.dob,
          domicile: oldForm.domicile
        }
      };

    } else {
      // CURRENT STUDENT FORMAT
      payload = {
        studentId: currentForm.studentId,
        departmentId: currentForm.departmentId,
        type: currentForm.certificateType,
        purpose: currentForm.purpose
      };
    }

    console.log("Payload:", payload);

    await createCertificate(payload);

    toast.success("Certificate request submitted successfully");

  } catch (error) {
    console.error(error.response?.data);
    toast.error(
      error.response?.data?.message || "Failed to submit certificate request"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl p-8">

        {/* Toggle */}

        <div className="flex justify-center mb-10">
          <div className="flex bg-gray-100 p-1 rounded-full">

            <button
              type="button"
              onClick={() => setIsOldStudent(false)}
              className={`px-6 py-2 rounded-full ${
                !isOldStudent
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Current Student
            </button>

            <button
              type="button"
              onClick={() => setIsOldStudent(true)}
              className={`px-6 py-2 rounded-full ${
                isOldStudent
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Old Student
            </button>

          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* CURRENT STUDENT */}

          {!isOldStudent && (
            <div>
              <h2 className="font-semibold mb-4">Current Student</h2>

              <div className="grid md:grid-cols-2 gap-4">

                <Input
                  label="Student ID"
                  name="studentId"
                  value={currentForm.studentId}
                  onChange={handleCurrentChange}
                />

                <Input
                  label="Department ID"
                  name="departmentId"
                  value={currentForm.departmentId}
                  onChange={handleCurrentChange}
                />

                <SelectField
                  label="Certificate Type"
                  name="certificateType"
                  value={currentForm.certificateType}
                  onChange={handleCurrentChange}
                  options={["BONAFIDE", "CLC"]}
                />

                <Input
                  label="Purpose"
                  name="purpose"
                  value={currentForm.purpose}
                  onChange={handleCurrentChange}
                />

              </div>
            </div>
          )}

          {/* OLD STUDENT */}

          {isOldStudent && (
            <div>
              <h2 className="font-semibold mb-4">Old Student</h2>

              <div className="grid md:grid-cols-2 gap-4">

                <Input
                  label="Roll No"
                  name="rollNo"
                  value={oldForm.rollNo}
                  onChange={handleOldChange}
                />

                <Input
                  label="Student Name"
                  name="name"
                  value={oldForm.name}
                  onChange={handleOldChange}
                />

                <Input
                  label="Father Name"
                  name="fatherName"
                  value={oldForm.fatherName}
                  onChange={handleOldChange}
                />

                <Input
                  label="Mother Name"
                  name="motherName"
                  value={oldForm.motherName}
                  onChange={handleOldChange}
                />

                <Input
                  label="Domicile"
                  name="domicile"
                  value={oldForm.domicile}
                  onChange={handleOldChange}
                />

                <Input
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  value={oldForm.dob}
                  onChange={handleOldChange}
                />

                <SelectField
                  label="Certificate Type"
                  name="certificateType"
                  value={oldForm.certificateType}
                  onChange={handleOldChange}
                  options={["Bonafide", "CLC", "Character"]}
                />

              </div>
            </div>
          )}

          {/* Fee Display */}

          {((isOldStudent && oldForm.certificateType) ||
            (!isOldStudent && currentForm.certificateType)) && (

            <div className="bg-blue-50 p-4 rounded flex justify-between">

              <span>Certificate Fee</span>

              <span className="font-semibold">
                ₹{
                  certificateFees[
                    isOldStudent
                      ? oldForm.certificateType
                      : currentForm.certificateType
                  ]
                }
              </span>

            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit & Proceed to Payment"}
          </button>

        </form>
      </div>
    </div>
  );
};

/* Reusable Components */

const Input = ({ label, type = "text", name, value, onChange }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border rounded px-3 py-2"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border rounded px-3 py-2"
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

export default CertificateForm;