import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFileAlt, FaCheckCircle, FaEye } from "react-icons/fa";

import { getAdmissionById } from "@/api/admissions.api";
import { getAdmissionFiles, verifyFile } from "@/api/files.api";

const badgeStyle = (verified) =>
  verified
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";

const VerifyDocuments = () => {
  const { id } = useParams(); // admission id
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [admissionStatus, setAdmissionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Fetch admission (for status)
      const admissionRes = await getAdmissionById(id);
      const admission = admissionRes?.data?.data?.admission;
      setAdmissionStatus(admission?.status || null);

      // 2️⃣ Fetch files (SEPARATE endpoint)
      const filesRes = await getAdmissionFiles(id);
      setFiles(filesRes?.data?.data?.files || []);
    } catch (error) {
      console.error("Failed to load documents", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (fileId) => {
    try {
      await verifyFile(fileId);
      fetchData();
    } catch (error) {
      console.error("File verification failed", error);
    }
  };

  const allVerified =
    files.length > 0 && files.every((file) => file.isVerified);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-6">
        Loading documents...
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
          Document Verification
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
          Verify uploaded documents before approving the application
        </p>
      </div>

      {/* ================= FILE LIST ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6 space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4"
          >
            {/* File Info */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-[color:var(--color-primary)] text-white">
                <FaFileAlt />
              </span>

              <div>
                <p className="font-medium">{file.type}</p>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyle(
                    file.isVerified
                  )}`}
                >
                  {file.isVerified ? "VERIFIED" : "PENDING"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={`/api/v1/files/${file.id}/download`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-gray-100"
              >
                <FaEye />
                View
              </a>

              {!file.isVerified &&
                admissionStatus === "PAYMENT_PENDING" && (
                  <button
                    onClick={() => handleVerify(file.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
                  >
                    <FaCheckCircle />
                    Verify
                  </button>
                )}
            </div>
          </div>
        ))}

        {files.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No documents uploaded.
          </p>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(`/admin/admissions/${id}`)}
          className="text-sm font-medium text-[color:var(--color-primary)] hover:underline"
        >
          ← Back to Admission Details
        </button>

        {allVerified && (
          <span className="text-sm text-green-600 font-medium">
            All documents verified ✔
          </span>
        )}
      </div>

      <div className="text-xs text-gray-500">
        All actions are recorded in audit logs.
      </div>
    </div>
  );
};

export default VerifyDocuments;
