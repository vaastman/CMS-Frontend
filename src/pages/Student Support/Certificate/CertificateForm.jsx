import { useState } from "react";

const CertificateForm = () => {
  const [isOldStudent, setIsOldStudent] = useState(true); // default old form

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
    universityRegNo: "",
    universityRollNo: "",
    academicStartYear: "",
    academicEndYear: "",
    passingYear: "",
    division: "",
  });

  const certificateFees = {
    BONAFIDE: 200,
    CLC: 500,
    Bonafide: 200,
    Character: 300,
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isOldStudent ? oldForm : currentForm);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white  rounded-2xl p-8">

        {/* ================= TOGGLE ================= */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-gray-100 p-1 rounded-full shadow-inner">
            <button
              type="button"
              onClick={() => setIsOldStudent(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                !isOldStudent
                  ? "bg-[var(--color-primary)] text-white shadow"
                  : "text-gray-600"
              }`}
            >
              Current Student
            </button>

            <button
              type="button"
              onClick={() => setIsOldStudent(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                isOldStudent
                  ? "bg-[var(--color-primary)] text-white shadow"
                  : "text-gray-600"
              }`}
            >
              Old Student
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ================= CURRENT STUDENT FORM ================= */}
          {!isOldStudent && (
            <Section title="Current Student Details">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Student ID *" name="studentId" value={currentForm.studentId} onChange={handleCurrentChange} />
                <Input label="Department ID *" name="departmentId" value={currentForm.departmentId} onChange={handleCurrentChange} />

                <SelectField
                  label="Certificate Type *"
                  name="certificateType"
                  value={currentForm.certificateType}
                  onChange={handleCurrentChange}
                  options={["BONAFIDE", "CLC"]}
                />

                <Input label="Purpose (Optional)" name="purpose" value={currentForm.purpose} onChange={handleCurrentChange} />
              </div>
            </Section>
          )}

          {/* ================= OLD STUDENT FORM ================= */}
          {isOldStudent && (
            <>
              <Section title="Academic Details">
                <div className="grid md:grid-cols-2 gap-6">
                  <SelectField
                    label="Degree *"
                    name="degree"
                    value={oldForm.degree}
                    onChange={handleOldChange}
                    options={["BA", "BSc", "BCom"]}
                  />
                  <Input label="Course *" name="course" value={oldForm.course} onChange={handleOldChange} />
                  <Input label="Subject *" name="subject" value={oldForm.subject} onChange={handleOldChange} />
                  <SelectField
                    label="Certificate Type *"
                    name="certificateType"
                    value={oldForm.certificateType}
                    onChange={handleOldChange}
                    options={["Bonafide", "CLC", "Character"]}
                  />
                </div>
              </Section>

              <Section title="Personal Details">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Class Roll No *" name="rollNo" value={oldForm.rollNo} onChange={handleOldChange} />
                  <Input label="Student Name *" name="name" value={oldForm.name} onChange={handleOldChange} />
                  <Input label="Father's Name *" name="fatherName" value={oldForm.fatherName} onChange={handleOldChange} />
                  <Input label="Mother's Name *" name="motherName" value={oldForm.motherName} onChange={handleOldChange} />
                  <Input label="Domicile *" name="domicile" value={oldForm.domicile} onChange={handleOldChange} />
                  <Input type="date" label="Date of Birth *" name="dob" value={oldForm.dob} onChange={handleOldChange} />
                </div>
              </Section>
            </>
          )}

          {/* ================= Fee Display ================= */}
          {((isOldStudent && oldForm.certificateType) ||
            (!isOldStudent && currentForm.certificateType)) && (
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg text-sm flex justify-between items-center">
              <span className="font-medium text-gray-700">
                Certificate Fee
              </span>
              <span className="text-lg font-semibold text-[var(--color-primary)]">
                ₹{" "}
                {certificateFees[
                  isOldStudent
                    ? oldForm.certificateType
                    : currentForm.certificateType
                ]}
              </span>
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
      </div>
    </div>
  );
};

/* ================= Reusable Components ================= */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold border-b pb-2 mb-6">
      {title}
    </h2>
    {children}
  </div>
);

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

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="form-label">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
      required
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