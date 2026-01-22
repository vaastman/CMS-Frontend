import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFileAlt, FaCheckCircle, FaEye } from "react-icons/fa";

import { getAdmissionById } from "@/api/admissions.api";
import { verifyFile } from "@/api/files.api";

const badgeStyle = (verified) => {
  return verified
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";
};

const VerifyDocuments = () => {
  const { id } = useParams(); // admission id
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, [id]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data } = await getAdmissionById(id);

      // ✅ BACKEND RETURNS `files`
      setFiles(data.data?.files || []);
    } catch (error) {
      console.error("Failed to fetch files", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (fileId) => {
    try {
      await verifyFile(fileId);
      fetchFiles(); // refresh after verification
    } catch (error) {
      console.error("File verification failed", error);
    }
  };

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

        {loading && (
          <p className="text-center text-gray-500 py-6">
            Loading documents...
          </p>
        )}

        {!loading &&
          files.map((file) => (
            <div
              key={file.id}
              className="
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-4
                border rounded-xl p-4
              "
            >
              {/* File Info */}
              <div className="flex items-center gap-3">
                <span
                  className="
                    w-10 h-10 rounded-lg
                    flex items-center justify-center
                    bg-[color:var(--color-primary)]
                    text-white
                  "
                >
                  <FaFileAlt />
                </span>

                <div>
                  <p className="font-medium">
                    {file.type}
                  </p>
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
                  className="
                    flex items-center gap-2
                    px-3 py-2 rounded-lg
                    border text-sm
                    hover:bg-gray-100
                  "
                >
                  <FaEye />
                  View
                </a>

                {!file.isVerified && (
                  <button
                    onClick={() => handleVerify(file.id)}
                    className="
                      flex items-center gap-2
                      px-3 py-2 rounded-lg
                      bg-green-600 text-white text-sm
                      hover:bg-green-700
                    "
                  >
                    <FaCheckCircle />
                    Verify
                  </button>
                )}
              </div>
            </div>
          ))}

        {!loading && files.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No documents uploaded.
          </p>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate(`/admin/admissions/${id}`)}
          className="
            text-sm font-medium
            text-[color:var(--color-primary)]
            hover:underline
          "
        >
          ← Back to Admission Details
        </button>
      </div>

      <div className="text-xs text-gray-500">
        All actions are recorded in audit logs.
      </div>
    </div>
  );
};

export default VerifyDocuments;
