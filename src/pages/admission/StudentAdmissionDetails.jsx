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
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${highlight
      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
      }`}>
      <Icon className="text-lg" />
    </div>
    <div className="flex flex-col flex-1 min-w-0">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </span>
      <span className={`font-semibold ${highlight ? "text-slate-900 text-lg" : "text-slate-700"} break-words`}>
        {value || "—"}
      </span>
    </div>
  </div>
);

/* ================= SECTION ================= */
const Section = ({ title, icon: Icon, children, gradient = false }) => (
  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
    <div className={`px-6 py-4 ${gradient
      ? "bg-gradient-to-r from-slate-700 to-slate-900"
      : "bg-slate-50 border-b border-slate-200"
      }`}>
      <h3 className={`font-bold flex items-center gap-3 ${gradient ? "text-white" : "text-slate-800"
        }`}>
        {Icon && <Icon className="text-xl" />}
        {title}
      </h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

/* ================= PAGE ================= */
const StudentAdmissionDetails = () => {
  const { id } = useParams();
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

      // Get latest admission
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading admission details...</p>
        </div>
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <FaUserGraduate className="text-4xl text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">No Admission Found</h2>
          <p className="text-slate-600 mb-6">
            No admission record exists for this student
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { student, course, session, status } = admission;

  const hasSuccessfulPayment =
    Array.isArray(admission.payments) &&
    admission.payments.some((p) => p.status === "SUCCESS");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Student Admission Profile
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Admission ID: <span className="font-semibold text-slate-700">{admission.id}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>
          </div>

          {/* Status Badge */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                Current Status
              </p>
              <StatusBadge status={status} />
            </div>

            <div className="sm:text-right">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                Application Date
              </p>
              <p className="text-sm font-semibold text-slate-700">
                {new Date(admission.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* Student Information */}
            <Section title="Student Information" icon={FaUser} gradient={true}>
              <div className="space-y-1">
                <InfoRow
                  icon={FaUserGraduate}
                  label="Full Name"
                  value={student?.name}
                  highlight={true}
                />
                <InfoRow
                  icon={FaEnvelope}
                  label="Email Address"
                  value={student?.email}
                />
                <InfoRow
                  icon={FaPhone}
                  label="Phone Number"
                  value={student?.phone}
                />
                <InfoRow
                  icon={FaIdCard}
                  label="Registration Number"
                  value={student?.reg_no}
                />
                <InfoRow
                  icon={FaIdCard}
                  label="UAN Number"
                  value={student?.uan_no}
                />
              </div>
            </Section>

            {/* Academic Information */}
            <Section title="Academic Information" icon={FaBookOpen}>
              <div className="space-y-1">
                <InfoRow
                  icon={FaGraduationCap}
                  label="Course Name"
                  value={course?.name}
                  highlight={true}
                />
                <InfoRow
                  icon={FaBookOpen}
                  label="Course Code"
                  value={course?.code}
                />
                <InfoRow
                  icon={FaCalendarAlt}
                  label="Academic Session"
                  value={session?.name}
                />
              </div>
            </Section>

            {/* Payment Information (if available) */}
            {admission.payments && admission.payments.length > 0 && (
              <Section title="Payment History" icon={FaMoneyBillWave}>
                <div className="space-y-3">
                  {admission.payments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${payment.status === 'SUCCESS'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-amber-100 text-amber-600'
                          }`}>
                          <FaMoneyBillWave />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            ₹{payment.amount || '0'}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status === 'SUCCESS'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                        }`}>
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* ================= RIGHT COLUMN - ACTIONS ================= */}
          <div className="space-y-6">

            {/* Quick Actions Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

              {/* ================= QUICK ACTIONS (PUBLIC) ================= */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div
                  className="px-6 py-4"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <FaFileAlt />
                    Student Actions
                  </h3>
                </div>

                <div className="p-6 space-y-3">

                  {/* Upload / Verify Documents */}
                  <button
                    onClick={() =>
                      navigate(`/student/document-upload/${admission.id}/verify`)
                    }
                    className="w-full py-3.5 rounded-xl font-semibold text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    <FaCheckCircle />
                    Upload / Verify Documents
                  </button>

                  {/* Pay Admission Fee */}
                  {!hasSuccessfulPayment && (
                    <button
                      onClick={() =>
                        navigate(`/student/admission/${admission.id}/payment`)
                      }
                      className="w-full py-3.5 rounded-xl font-semibold text-white shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      style={{ backgroundColor: "var(--color-success)" }}
                    >
                      <FaMoneyBillWave />
                      Pay Admission Fee
                    </button>
                  )}

                  {/* Payment Completed */}
                  {hasSuccessfulPayment && (
                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      <FaCheckCircle />
                      Payment Completed
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Status Information Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FaExclamationCircle className="text-blue-600" />
                Important Information
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <p className="text-slate-600">
                    Ensure all documents are uploaded and verified
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <p className="text-slate-600">
                    Complete payment to confirm your admission
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                  <p className="text-slate-600">
                    Check your email regularly for updates
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Support Card */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-sm p-6 text-white">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <FaPhone />
                Need Help?
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Our support team is here to assist you with any queries
              </p>
              <button className="w-full bg-white text-slate-800 py-2.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionDetails;