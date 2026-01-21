import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById, updateStudent } from "@/api/student.api";
import { toast } from "react-toastify";

const StudentDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  const readOnly = mode !== "edit";

  useEffect(() => {
    getStudentById(id)
      .then((res) => setStudent(res.data))
      .catch(() => toast.error("Failed to load student"));
  }, [id]);

 const handleUpdate = async () => {
  try {
    const payload = {
      name: student.name,
      guardianName: student.guardianName,
      address: student.address,
      dob: student.dob || undefined,
    };

    await updateStudent(id, payload);

    toast.success("Student updated");
    navigate("/admin/students");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Update failed");
  }
};


  if (!student) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {readOnly ? "Student Details" : "Edit Student"}
      </h1>

      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 gap-6">
        <Field label="Name" value={student.name} readOnly={readOnly}
          onChange={(v) => setStudent({ ...student, name: v })} />
        <Field label="Email" value={student.email} readOnly />
        <Field label="Phone" value={student.phone} readOnly />
        <Field label="Guardian Name" value={student.guardianName} readOnly={readOnly}
          onChange={(v) => setStudent({ ...student, guardianName: v })} />
      </div>

      {!readOnly && (
        <div className="flex justify-end">
          <button onClick={handleUpdate} className="px-6 py-2 text-white rounded"
            style={{ backgroundColor: "var(--color-primary)" }}>
            Update Student
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;

const Field = ({ label, value, readOnly, onChange }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    {readOnly ? <p>{value}</p> : <input value={value} onChange={(e) => onChange(e.target.value)} className="input" />}
  </div>
);
