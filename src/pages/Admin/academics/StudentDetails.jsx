import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getStudentById,
  updateStudent,
} from "@/api/student.api";

import { assignSemesterToStudent } from "@/api/semester.api";

const StudentDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const navigate = useNavigate();

  const readOnly = mode !== "edit";

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH STUDENT ================= */
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);

        const res = await getStudentById(id);
        console.log("🟢 Student API raw:", res.data);

        const data =
          res?.data?.data?.student ||
          res?.data?.data ||
          res?.data;

        if (!data?.id) throw new Error("Invalid student payload");

        const normalized = {
          id: data.id,
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          fatherName: data.fatherName || "",
          address: data.address || "",
          dob: data.dob || "",
          status: data.status,

          course: data.course || null,
          session: data.session || null,

          currentSemester: data.currentSemester || null,
          nextSemester: data.nextSemester || null,

          semesters: Array.isArray(data.semesters) ? data.semesters : [],
        };

        console.log("🟡 Normalized student:", normalized);

        setStudent(normalized);
      } catch (err) {
        console.error("❌ Fetch student error:", err);
        toast.error("Failed to load student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  /* ================= UPDATE BASIC DETAILS ================= */
  const handleUpdate = async () => {
    try {
      const payload = {
        name: student.name.trim(),
        fatherName: student.fatherName || undefined,
        address: student.address || undefined,
        dob: student.dob || undefined,
      };

      console.log("🟡 Update payload:", payload);

      await updateStudent(id, payload);

      toast.success("Student updated successfully");
      navigate("/admin/students");
    } catch (err) {
      console.error("❌ Update error:", err);
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  /* ================= PROMOTE SEMESTER ================= */
  const handlePromote = async () => {
    try {
      if (!student.nextSemester) return;

      const payload = {
        semesterId: student.nextSemester.id,
        startDate: new Date().toISOString(),
      };

      console.log("🟢 Promote payload:", payload);

      await assignSemesterToStudent(student.id, payload);

      toast.success("Student promoted successfully");
      window.location.reload();
    } catch (err) {
      console.error("❌ Promotion error:", err);
      toast.error(err?.response?.data?.message || "Promotion failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {readOnly ? "Student Details" : "Edit Student"}
      </h1>

      {/* ================= BASIC INFO ================= */}
      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 gap-6">
        <Field
          label="Name"
          value={student.name}
          readOnly={readOnly}
          onChange={(v) => setStudent({ ...student, name: v })}
        />

        <Field label="Email" value={student.email} readOnly />
        <Field label="Phone" value={student.phone} readOnly />

        <Field
          label="Father Name"
          value={student.fatherName}
          readOnly={readOnly}
          onChange={(v) => setStudent({ ...student, fatherName: v })}
        />

        <Field
          label="Date of Birth"
          type="date"
          value={student.dob}
          readOnly={readOnly}
          onChange={(v) => setStudent({ ...student, dob: v })}
        />

        <Field
          label="Address"
          value={student.address}
          readOnly={readOnly}
          onChange={(v) => setStudent({ ...student, address: v })}
        />
      </div>

      {/* ================= ACADEMIC INFO ================= */}
      <div className="grid grid-cols-3 gap-6 bg-white rounded-xl shadow p-6">
        <Info label="Session" value={student.session?.name} />
        <Info label="Course" value={student.course?.name} />
        <Info label="Current Semester" value={student.currentSemester?.name} />
      </div>

      {/* ================= SEMESTER HISTORY ================= */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Semester History</h2>

        {student.semesters.length === 0 ? (
          <p className="text-sm text-gray-500">No semester history found</p>
        ) : (
          <ol className="relative border-l border-gray-200 ml-2">
            {student.semesters.map((sem) => (
              <li key={sem.id} className="mb-6 ml-6">
                <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs">
                  {sem.name?.replace(/\D/g, "") || "S"}
                </span>

                <p className="font-medium">{sem.name}</p>
                <p className="text-xs text-gray-500">
                  {sem.startDate?.slice(0, 10)} →{" "}
                  {sem.endDate?.slice(0, 10) || "Present"}
                </p>

                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100">
                  {sem.status}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* ================= ACTIONS ================= */}
      {!readOnly && (
        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 text-white rounded"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Update Student
          </button>

          {student.nextSemester && (
            <button
              onClick={handlePromote}
              className="px-6 py-2 text-white rounded"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Promote to {student.nextSemester.name}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;

/* ================= HELPERS ================= */

const Field = ({ label, value, readOnly, onChange, type = "text" }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    {readOnly ? (
      <p className="text-sm">{value || "-"}</p>
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

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-medium">{value || "-"}</p>
  </div>
);
