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

const statusBadge = (status) => {
  switch (status) {
    case "APPLIED":
      return "bg-blue-100 text-blue-700";
    case "UNDER_VERIFICATION":
      return "bg-yellow-100 text-yellow-700";
    case "VERIFIED":
      return "bg-purple-100 text-purple-700";
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

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
      setAdmission(data.data);
    } catch (error) {
      console.error("Failed to load admission", error);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (status) => {
    try {
      await updateAdmissionStatus(id, status);
      fetchAdmission();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

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

  return (
    <div className="space-y-8">

      {/* HEADER */}
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
          className={`px-4 py-2 rounded-full text-sm font-medium ${statusBadge(
            admission.status
          )}`}
        >
          {admission.status.replaceAll("_", " ")}
        </span>
      </div>

      {/* STUDENT INFO */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <FaUserGraduate />
          Student Details
        </h3>

        <p><b>Name:</b> {admission.student?.name}</p>
        <p><b>Email:</b> {admission.student?.email}</p>
        <p><b>Course:</b> {admission.course?.name}</p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">

        {admission.status === "UNDER_VERIFICATION" && (
          <button
            onClick={() => navigate(`/admin/admissions/${id}/verify`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <FaFileAlt />
            Verify Documents
          </button>
        )}

        {admission.status === "VERIFIED" && (
          <button
            onClick={() => changeStatus("APPROVED")}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            <FaCheckCircle />
            Approve Admission
          </button>
        )}

        {admission.status !== "REJECTED" && (
          <button
            onClick={() => changeStatus("REJECTED")}
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
