import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaBookOpen,
  FaMoneyBillWave,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getAdmissionById,
  updateAdmissionStatus,
} from "@/api/admissions.api";

import { statusLabel, statusStyle } from "@/utils/admissionStatus";

/* ================= REUSABLE UI ================= */

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
    <h3 className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)] mb-4">
      <Icon className="text-[var(--color-primary)]" />
      {title}
    </h3>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm py-1">
    <span className="text-[var(--color-text-secondary)]">{label}</span>
    <span className="font-medium text-[var(--color-text-primary)]">
      {value || "—"}
    </span>
  </div>
);

/* ================= MAIN ================= */

const AdmissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmission = async () => {
    try {
      const res = await getAdmissionById(id);
      setAdmission(res?.data?.data?.admission || null);
    } catch {
      toast.error("Failed to load admission");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmission();
  }, [id]);

  const changeStatus = async (status) => {
    try {
      await updateAdmissionStatus(id, status);
      toast.success("Admission status updated");
      fetchAdmission();
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-[var(--color-text-secondary)]">
        Loading admission details...
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="p-10 text-center text-[var(--color-text-secondary)]">
        Admission not found
      </div>
    );
  }

  const { student, course, payments, history } = admission;

  const showActions =
    admission.status === "PAYMENT_PENDING" ||
    admission.status === "CONFIRMED";

  /* ================= UI ================= */

  return (
    <div className="space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Admission Overview
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Application ID: {admission.id}
          </p>
        </div>

        <span
          className={`px-5 py-2 rounded-full text-sm font-semibold ${statusStyle(
            admission.status
          )}`}
        >
          {statusLabel[admission.status]}
        </span>
      </div>

      {/* ===== GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <Section title="Student Information" icon={FaUserGraduate}>
            <InfoRow label="Name" value={student?.name} />
            <InfoRow label="Email" value={student?.email} />
            <InfoRow label="Phone" value={student?.phone} />
            <InfoRow label="Registration No" value={student?.reg_no} />
            <InfoRow label="Address" value={student?.address} />
          </Section>

          <Section title="Course Information" icon={FaBookOpen}>
            <InfoRow label="Course Name" value={course?.name} />
            <InfoRow label="Course Code" value={course?.code} />
            <InfoRow
              label="Duration"
              value={`${course?.durationYears} Years`}
            />
          </Section>

          <Section title="Payment Details" icon={FaMoneyBillWave}>
            {payments?.length === 0 && (
              <p className="text-sm text-[var(--color-text-secondary)]">
                No payments recorded yet.
              </p>
            )}

            {payments?.map((p) => (
              <div
                key={p.id}
                className="border border-[var(--color-border)] rounded-lg p-4 mb-3 text-sm"
              >
                <InfoRow label="Amount" value={`₹${p.totalAmount}`} />
                <InfoRow label="Status" value={p.status} />
                <InfoRow label="Receipt No" value={p.receiptNo} />
              </div>
            ))}
          </Section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <Section title="Status Timeline" icon={FaHistory}>
            {history?.map((h) => (
              <div
                key={h.id}
                className="border-l-4 border-[var(--color-primary)] pl-4 mb-4"
              >
                <p className="text-sm font-medium">
                  {h.fromStatus} → {h.toStatus}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {h.changedBy?.name} •{" "}
                  {new Date(h.changedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </Section>

          {/* ===== ACTIONS ===== */}
          {showActions && (
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 space-y-3">

              {/* VERIFY / UPLOAD DOCUMENTS */}
              <button
                onClick={() => navigate(`/admin/admissions/${id}/verify`)}
                className="
                  w-full flex items-center justify-center gap-2
                  bg-[var(--color-primary)]
                  text-white py-2.5 rounded-lg
                  font-medium hover:opacity-90 transition
                "
              >
                <FaFileAlt />
                Upload / Verify Documents
              </button>

              {/* APPROVE */}
              {admission.status === "PAYMENT_PENDING" && (
                <button
                  onClick={() => changeStatus("CONFIRMED")}
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-[var(--color-success)]
                    text-white py-2.5 rounded-lg
                    font-medium hover:opacity-90 transition
                  "
                >
                  <FaCheckCircle />
                  Approve Admission
                </button>
              )}

              {/* REJECT */}
              {admission.status !== "CANCELLED" && (
                <button
                  onClick={() => changeStatus("CANCELLED")}
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-[var(--color-danger)]
                    text-white py-2.5 rounded-lg
                    font-medium hover:opacity-90 transition
                  "
                >
                  <FaTimesCircle />
                  Reject Admission
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetails;
