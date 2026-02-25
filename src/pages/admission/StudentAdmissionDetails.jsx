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
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaFileAlt,
  FaMoneyBillWave,
  FaGraduationCap,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
// import { getAdmissionById } from "@/api/admissions.api";
import { getAdmissions } from "@/api/admissions.api";

/* ================= STATUS BADGE ================= */
const StatusBadge = ({ status }) => {
  const statusConfig = {
    INITIATED: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: FaClock,
      label: "Initiated",
    },
    PAYMENT_PENDING: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: FaExclamationCircle,
      label: "Payment Pending",
    },
    APPROVED: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: FaCheckCircle,
      label: "Approved",
    },
    REJECTED: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: FaExclamationCircle,
      label: "Rejected",
    },
    COMPLETED: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      icon: FaCheckCircle,
      label: "Completed",
    },
  };

  const config = statusConfig[status] || statusConfig.INITIATED;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm ${config.bg} ${config.text} border ${config.border}`}
    >
      <Icon className="text-sm" />
      {config.label}
    </span>
  );
};

/* ================= INFO ROW ================= */
const InfoRow = ({ icon: Icon, label, value, highlight = false }) => (
  <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-b-0 group hover:bg-slate-50 px-4 -mx-4 rounded-lg transition-colors">
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
        highlight
          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
      }`}
    >
      <Icon className="text-lg" />
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </span>
      <span
        className={`font-semibold ${
          highlight ? "text-slate-900 text-lg" : "text-slate-700"
        } break-words`}
      >
        {value || "—"}
      </span>
    </div>
  </div>
);

/* ================= SECTION ================= */
const Section = ({ title, icon: Icon, children, gradient = false }) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
    <div
      className={`px-6 py-4 ${
        gradient
          ? "bg-gradient-to-r from-slate-700 to-slate-900"
          : "bg-slate-50 border-b border-slate-200"
      }`}
    >
      <h3
        className={`font-bold flex items-center gap-3 ${
          gradient ? "text-white" : "text-slate-800"
        }`}
      >
        {Icon && <Icon className="text-xl" />}
        {title}
      </h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

/* ================= PAGE ================= */
const StudentAdmissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);

  // const fetchAdmission = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await getAdmissions({ studentId: id });
  //     const admissions = res?.data?.data?.admissions || [];

  //     if (!admissions.length) {
  //       setAdmission(null);
  //       return;
  //     }

  //     const latestAdmission = [...admissions].sort(
  //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //     )[0];

  //     setAdmission(latestAdmission);
  //   } catch (err) {
  //     toast.error("Failed to load admission details");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const fetchAdmission = async () => {
  try {
    setLoading(true);

    console.log("Student ID:", id);

    const res = await getAdmissions({ studentId: id });

    const admissions = res?.data?.data?.admissions || [];

    if (!admissions.length) {
      setAdmission(null);
      return;
    }

    // Already ordered by createdAt desc from backend
    setAdmission(admissions[0]);

  } catch (err) {
    console.error("Admission fetch error:", err);
    toast.error("Failed to load admission details");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchAdmission();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <FaUserGraduate className="text-4xl text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold">No Admission Found</h2>
        </div>
      </div>
    );
  }

  const { student, course, session, status } = admission;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Student Admission Profile
            </h1>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg"
            >
              <FaArrowLeft />
              Back
            </button>
          </div>

          <div className="mt-4">
            <StatusBadge status={status} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            <Section title="Student Information" icon={FaUser} gradient>
              <InfoRow icon={FaUserGraduate} label="Full Name" value={student?.name} highlight />
              <InfoRow icon={FaEnvelope} label="Email" value={student?.email} />
              <InfoRow icon={FaPhone} label="Phone" value={student?.phone} />
              <InfoRow icon={FaIdCard} label="Registration No" value={student?.reg_no} />
              <InfoRow icon={FaIdCard} label="UAN No" value={student?.uan_no} />
            </Section>

            <Section title="Academic Information" icon={FaBookOpen}>
              <InfoRow icon={FaGraduationCap} label="Course" value={course?.name} highlight />
              <InfoRow icon={FaBookOpen} label="Course Code" value={course?.code} />
              <InfoRow icon={FaCalendarAlt} label="Session" value={session?.name} />
            </Section>

          </div>

          {/* Right Column */}
          <div className="space-y-6">

            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-blue-600">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <FaFileAlt />
                  Student Actions
                </h3>
              </div>

              <div className="p-6 space-y-3">

                <button
                  onClick={() =>
                    navigate(`/student/document-upload/${admission.id}/verify`)
                  }
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Upload / Verify Documents
                </button>

                <button
                  onClick={() =>
                    navigate(`/student/admission/${admission.id}/payment`)
                  }
                  className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <FaMoneyBillWave />
                  Pay Admission Fee
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionDetails;