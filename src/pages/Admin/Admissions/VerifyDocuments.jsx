import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFileAlt, FaCheckCircle, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

import { getAdmissionById } from "@/api/admissions.api";
import {
  getStudentDocuments,
  verifyDocument,
  getDocumentDownloadUrl,
  uploadStudentDocument
} from "@/api/files.api";


const badgeStyle = (verified) =>
  verified
    ? "bg-[color:var(--color-success)]/10 text-[color:var(--color-success)]"
    : "bg-[color:var(--color-warning)]/10 text-[color:var(--color-warning)]";

const VerifyDocuments = () => {
  const { id } = useParams(); // admission id
  const navigate = useNavigate();
const [uploading, setUploading] = useState(false);
const [documentType, setDocumentType] = useState("AADHAR");
const [file, setFile] = useState(null);

  const [documents, setDocuments] = useState([]);
  const [admissionStatus, setAdmissionStatus] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get admission → studentId
      const admissionRes = await getAdmissionById(id);
      const admission = admissionRes?.data?.data?.admission;

      if (!admission?.student?.id) {
        throw new Error("Student not linked with admission");
      }

      setAdmissionStatus(admission.status);
      setStudentId(admission.student.id);

      // 2️⃣ Get student documents
      const docsRes = await getStudentDocuments(admission.student.id);
      setDocuments(docsRes?.data?.data?.documents || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load documents");
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (docId) => {
    try {
      await verifyDocument(docId, true);
      toast.success("Document verified");
      fetchData();
    } catch {
      toast.error("Verification failed");
    }
  };
const handleUpload = async () => {
  if (!file) {
    toast.error("Please select a file");
    return;
  }

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", "document");
    formData.append("documentType", documentType);
    formData.append("studentId", studentId);

    await uploadStudentDocument(formData);

    toast.success("Document uploaded successfully");
    setFile(null);
    fetchData();
  } catch (err) {
    toast.error(err.response?.data?.message || "Upload failed");
  } finally {
    setUploading(false);
  }
};

  const handleView = async (docId) => {
    const res = await getDocumentDownloadUrl(docId, "document");
    window.open(res.data.data.downloadUrl, "_blank");
  };

  const allVerified =
    documents.length > 0 && documents.every((d) => d.isVerified);

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-8">
        Loading documents...
      </p>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
          Document Verification
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Student document verification
        </p>
      </div>
{/* ================= UPLOAD DOCUMENT ================= */}
{["PAYMENT_PENDING", "CONFIRMED"].includes(admissionStatus) && (
  <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)]
                  rounded-2xl p-6 space-y-4">

    <h3 className="font-semibold text-[color:var(--color-text-primary)]">
      Upload Document
    </h3>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Document Type */}
      <select
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      >
        <option value="AADHAR">Aadhar Card</option>
        <option value="MARKSHEET">Marksheet</option>
        <option value="TC">Transfer Certificate</option>
        <option value="OTHER">Other</option>
      </select>

      {/* File Input */}
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => setFile(e.target.files[0])}
        className="border rounded-lg px-3 py-2 text-sm col-span-2"
      />
    </div>

    <button
      onClick={handleUpload}
      disabled={uploading}
      className="flex items-center gap-2
                 bg-[color:var(--color-primary)]
                 text-white px-4 py-2 rounded-lg
                 text-sm font-medium
                 hover:opacity-90 transition"
    >
      <FaFileAlt />
      {uploading ? "Uploading..." : "Upload Document"}
    </button>
  </div>
)}

      {/* DOCUMENT LIST */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl p-6 space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                       border border-[color:var(--color-border)]
                       rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center
                               bg-[color:var(--color-primary)] text-white">
                <FaFileAlt />
              </span>

              <div>
                <p className="font-medium">{doc.type}</p>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyle(
                    doc.isVerified
                  )}`}
                >
                  {doc.isVerified ? "VERIFIED" : "PENDING"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleView(doc.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm"
              >
                <FaEye /> View
              </button>

              {!doc.isVerified &&
                ["PAYMENT_PENDING", "CONFIRMED"].includes(admissionStatus) && (
                  <button
                    onClick={() => handleVerify(doc.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg
                               bg-[color:var(--color-success)]
                               text-white text-sm"
                  >
                    <FaCheckCircle /> Verify
                  </button>
                )}
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No documents uploaded
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(`/admin/admissions/${id}`)}
          className="text-sm font-medium text-[color:var(--color-primary)] hover:underline"
        >
          ← Back to Admission
        </button>

        {allVerified && (
          <span className="text-sm font-medium text-[color:var(--color-success)]">
            All documents verified ✔
          </span>
        )}
      </div>
    </div>
  );
};

export default VerifyDocuments;
