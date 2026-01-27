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
  const navigate = useNavigate();

  const readOnly = searchParams.get("mode") !== "edit";

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH STUDENT ================= */
  const fetchStudent = async () => {
    try {
      setLoading(true);

      const res = await getStudentById(id);

      // ✅ EXACT BACKEND MATCH
      const data = res?.data?.data?.student;

      if (!data) {
        throw new Error("Student not found");
      }

      setStudent({
        id: data.id,

        // BASIC
        name: data.name || "",
        reg_no: data.reg_no || "",
        uan_no: data.uan_no || "",
        email: data.email || "",
        phone: data.phone || "",
        fatherName: data.fatherName || "",
        address: data.address || "",
        dob: data.dob || "",
        status: data.status || "",

        // RELATIONS
        course: data.course || null,
        session: data.session || null,

        semesters: Array.isArray(data.semesters) ? data.semesters : [],
        payments: Array.isArray(data.payments) ? data.payments : [],
        documents: Array.isArray(data.documents) ? data.documents : [],
        certificates: Array.isArray(data.certificates) ? data.certificates : [],
        admissions: Array.isArray(data.admissions) ? data.admissions : [],
      });
    } catch (err) {
      console.error("❌ Fetch student error:", err);
      toast.error(err?.response?.data?.message || "Failed to load student");
      navigate("/admin/students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      const payload = {
        name: student.name,
        fatherName: student.fatherName || undefined,
        address: student.address || undefined,
        dob: student.dob || undefined,
      };

      await updateStudent(id, payload);
      toast.success("Student updated successfully");

      navigate(`/admin/students/${id}`);
      fetchStudent();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!student) return <p className="p-6">Student not found</p>;

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {readOnly ? "Student Details" : "Edit Student"}
        </h1>

        <div className="flex gap-3">
          {readOnly && (
            <button
              onClick={() => navigate("?mode=edit")}
              className="px-4 py-2 border rounded"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => navigate("/admin/students")}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
        </div>
      </div>

      {/* ================= BASIC INFO ================= */}
      <Section title="Basic Information">
        <Grid>
          <Field label="Name" value={student.name} readOnly={readOnly}
            onChange={(v) => setStudent({ ...student, name: v })} />

          <Field label="Registration No" value={student.reg_no} readOnly />
          <Field label="UAN No" value={student.uan_no} readOnly />

          <Field label="Email" value={student.email} readOnly />
          <Field label="Phone" value={student.phone} readOnly />

          <Field label="Father Name" value={student.fatherName}
            readOnly={readOnly}
            onChange={(v) => setStudent({ ...student, fatherName: v })} />

          <Field label="Date of Birth" type="date"
            value={student.dob?.slice(0, 10)}
            readOnly={readOnly}
            onChange={(v) => setStudent({ ...student, dob: v })} />

          <Field label="Address" value={student.address}
            readOnly={readOnly}
            onChange={(v) => setStudent({ ...student, address: v })} />

          <Info label="Status" value={student.status} />
        </Grid>
      </Section>

      {/* ================= ACADEMIC ================= */}
      <Section title="Academic Information">
        <Grid cols={3}>
          <Info label="Course" value={student.course?.name} />
          <Info label="Session" value={student.session?.name} />
          <Info label="Total Semesters" value={student.semesters.length} />
        </Grid>
      </Section>

      {/* ================= SEMESTERS ================= */}
      <Section title="Semester History">
        {student.semesters.length === 0 ? (
          <Empty text="No semester history found" />
        ) : (
          <ul className="space-y-3">
            {student.semesters.map((s) => (
              <li key={s.id} className="p-3 border rounded">
                <p className="font-medium">
                  Semester {s.semester?.number}
                </p>
                <p className="text-xs text-gray-500">
                  {s.startDate?.slice(0, 10)} → {s.endDate?.slice(0, 10) || "Ongoing"}
                </p>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100">
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* ================= PAYMENTS ================= */}
      <Section title="Payments">
        {student.payments.length === 0 ? (
          <Empty text="No payments found" />
        ) : (
          <ul className="space-y-2">
            {student.payments.map((p) => (
              <li key={p.id} className="p-3 border rounded">
                <p className="font-medium">₹ {p.totalAmount}</p>
                <p className="text-xs">{p.status} • {p.receiptNo}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* ================= ACTIONS ================= */}
      {!readOnly && (
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 text-white rounded"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Update Student
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;

/* ================= UI HELPERS ================= */

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 space-y-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);

const Grid = ({ children, cols = 2 }) => (
  <div className={`grid grid-cols-${cols} gap-6`}>
    {children}
  </div>
);

const Field = ({ label, value, readOnly, onChange, type = "text" }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    {readOnly ? (
      <p className="text-sm">{value || "-"}</p>
    ) : (
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="input w-full"
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

const Empty = ({ text }) => (
  <p className="text-sm text-gray-500">{text}</p>
);
