import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getAdmissionById,
  updateAdmissionStatus,
} from "@/api/admissions.api";

import { statusLabel, statusStyle } from "@/utils/admissionStatus";

const AdmissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmission();
  }, [id]);

  const fetchAdmission = async () => {
    try {
      setLoading(true);
      const { data } = await getAdmissionById(id);
      setAdmission(data?.data?.admission || null);
    } catch (error) {
      console.error("Failed to load admission", error);
      setAdmission(null);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (status) => {
    try {
      await updateAdmissionStatus(id, {
        status,
      });
      fetchAdmission();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading admission details...
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="p-6 text-center text-gray-500">
        Admission not found
      </div>
    );
  }

  const canApprove = admission.status === "PAYMENT_PENDING";

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Admission Application
          </h1>
          <p className="text-sm text-gray-500">
            ID: #{admission.id}
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${statusStyle(
            admission.status
          )}`}
        >
          {statusLabel[admission.status] || admission.status}
        </span>
      </div>

      {/* ================= STUDENT INFO ================= */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <FaUserGraduate />
          Student Details
        </h3>

        <p><b>Name:</b> {admission.student?.name || "N/A"}</p>
        <p><b>Email:</b> {admission.student?.email || "N/A"}</p>
        <p><b>Course:</b> {admission.course?.name || "N/A"}</p>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex flex-wrap gap-4">
        {/* Verify Documents */}
        {admission.status === "PAYMENT_PENDING" && (
          <button
            onClick={() => navigate(`/admin/admissions/${id}/verify`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <FaFileAlt />
            Verify Documents
          </button>
        )}

        {/* Approve */}
        {admission.status === "PAYMENT_PENDING" && (
          <button
            onClick={() => changeStatus("CONFIRMED")}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            <FaCheckCircle />
            Approve Admission
          </button>
        )}

        {/* Reject */}
        {admission.status !== "CANCELLED" && (
          <button
            onClick={() => changeStatus("CANCELLED")}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded"
          >
            <FaTimesCircle />
            Reject Admission
          </button>
        )}
      </div>
    </div>
  );
};

export default AdmissionDetails;
