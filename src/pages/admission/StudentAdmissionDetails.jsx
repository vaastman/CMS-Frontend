import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaBookOpen,
  FaCalendarAlt,
  FaIdCard,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getAdmissions } from "@/api/admissions.api";

/* ================= COMPONENTS ================= */

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 border-b py-3 last:border-b-0">
    <Icon className="text-[color:var(--color-primary)]" />
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">
        {value || "—"}
      </span>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-[color:var(--color-surface)] border rounded-2xl p-6">
    <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

/* ================= PAGE ================= */

const StudentAdmissionDetails = () => {
  const { id } = useParams(); // studentId
  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ADMISSION ================= */

  const fetchAdmission = async () => {
    try {
      setLoading(true);

      const res = await getAdmissions({ studentId: id });
      const admissions = res?.data?.data?.admissions || [];

      if (!admissions.length) {
        setAdmission(null);
        return;
      }

      // ✅ Get latest admission
      const latestAdmission = [...admissions].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0];

      setAdmission(latestAdmission);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load admission details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmission();
  }, [id]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading admission details...
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="p-10 text-center text-gray-500">
        No admission found for this student
      </div>
    );
  }

  const { student, course, session, status } = admission;

  // ✅ IMPORTANT: Define this to avoid crash
  const hasSuccessfulPayment =
    Array.isArray(admission.payments) &&
    admission.payments.some((p) => p.status === "SUCCESS");

  return (
    <div className="space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Student Admission Profile
          </h1>
          <p className="text-sm text-gray-500">
            Admission ID: {admission.id}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium
                     text-[color:var(--color-primary)] hover:underline"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* ===== GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          <Section title="Student Information">
            <InfoRow icon={FaUserGraduate} label="Name" value={student?.name} />
            <InfoRow icon={FaEnvelope} label="Email" value={student?.email} />
            <InfoRow icon={FaPhone} label="Phone" value={student?.phone} />
            <InfoRow icon={FaIdCard} label="Registration No" value={student?.reg_no} />
            <InfoRow icon={FaIdCard} label="UAN No" value={student?.uan_no} />
          </Section>

          <Section title="Academic Information">
            <InfoRow icon={FaBookOpen} label="Course" value={course?.name} />
            <InfoRow icon={FaBookOpen} label="Course Code" value={course?.code} />
            <InfoRow icon={FaCalendarAlt} label="Session" value={session?.name} />
            <InfoRow icon={FaCalendarAlt} label="Admission Status" value={status} />
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          <div className="bg-[color:var(--color-surface)] border rounded-2xl p-5 space-y-3">

            <button
              onClick={() =>
                navigate(`/admin/admissions/${admission.id}`)
              }
              className="w-full bg-[color:var(--color-primary)]
                         text-white py-2.5 rounded-lg
                         font-medium hover:opacity-90 transition"
            >
              View Admission
            </button>

            <button
              onClick={() =>
                navigate(`/admin/admissions/${admission.id}/verify`)
              }
              className="w-full bg-[color:var(--color-secondary)]
                         text-white py-2.5 rounded-lg
                         font-medium hover:opacity-90 transition"
            >
              Verify Documents
            </button>

            {/* ✅ PAY ADMISSION FEE */}
            {!hasSuccessfulPayment &&
              ["INITIATED", "PAYMENT_PENDING"].includes(status) && (
                <button
                  onClick={() =>
                    navigate(`/student/admission/${admission.id}/payment`)
                  }
                  className="w-full bg-[color:var(--color-success)]
                             text-white py-2.5 rounded-lg
                             font-medium hover:opacity-90 transition"
                >
                  Pay Admission Fee
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionDetails;
