import { useParams, useSearchParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const mockStudents = [
  {
    id: 1,
    name: "Sumit Kumar",
    regNo: "TPS202467066",
    course: "BCA",
    session: "2024-2028",
    fatherName: "Manoj Prasad",
    dob: "2000-01-01",
    status: "Admitted",
  },
  {
    id: 2,
    name: "Birendra Kumar",
    regNo: "TPS202467055",
    course: "BSc",
    session: "2024-2028",
    fatherName: "Ramesh Kumar",
    dob: "2001-02-10",
    status: "Applied",
  },
];

const StudentDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // edit | null
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const data = mockStudents.find(
      (s) => s.id === Number(id)
    );
    setStudent(data);
  }, [id]);

  if (!student) return <p>Loading...</p>;

  const readOnly = mode !== "edit";

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {readOnly ? "Student Details" : "Edit Student"}
        </h1>

        {readOnly && (
          <button
            onClick={() =>
              window.location.replace(
                `/academics/students/${id}?mode=edit`
              )
            }
            className="px-4 py-2 rounded-lg text-sm text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Edit
          </button>
        )}
      </div>

      {/* ===== DETAILS CARD ===== */}
      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="Name"
          value={student.name}
          readOnly={readOnly}
          onChange={(v) =>
            setStudent({ ...student, name: v })
          }
        />

        <Field label="Reg No" value={student.regNo} readOnly />

        <Field
          label="Course"
          value={student.course}
          readOnly={readOnly}
          onChange={(v) =>
            setStudent({ ...student, course: v })
          }
        />

        <Field label="Session" value={student.session} readOnly />

        <Field
          label="Father's Name"
          value={student.fatherName}
          readOnly={readOnly}
          onChange={(v) =>
            setStudent({ ...student, fatherName: v })
          }
        />

        <Field
          label="DOB"
          type="date"
          value={student.dob}
          readOnly={readOnly}
          onChange={(v) =>
            setStudent({ ...student, dob: v })
          }
        />

        <Field label="Status" value={student.status} readOnly />
      </div>

      {/* ===== ACTION ===== */}
      {!readOnly && (
        <div className="flex justify-end">
          <button
            className="px-6 py-2 rounded-lg text-sm text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
            onClick={() => {
              alert("Student Updated");
              navigate("/admin/students");
            }}
          >
            Update Student
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;

/* ===== Reusable Field Component ===== */
const Field = ({
  label,
  value,
  type = "text",
  readOnly,
  onChange,
}) => (
  <div className="space-y-1">
    <p className="text-xs text-gray-500">{label}</p>
    {readOnly ? (
      <p className="font-medium">{value}</p>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    )}
  </div>
);
