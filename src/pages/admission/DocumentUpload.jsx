import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaEye,
  FaTimes,
  FaArrowLeft,
  FaUserGraduate,
  FaFilePdf,
  FaImage,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  uploadStudentDocument,
  getStudentDocuments,
  deleteFile,
} from "@/api/files.api";

/* ================= STATUS BADGE ================= */
const StatusBadge = ({ verified }) => {
  if (verified === true)
    return (
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
        Verified
      </span>
    );

  if (verified === false)
    return (
      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
        Rejected
      </span>
    );

  return (
    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
      Pending
    </span>
  );
};

const DocumentUpload = () => {
  const { admissionId } = useParams(); // studentId
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("AADHAR");
  const [uploadProgress, setUploadProgress] = useState(0);

  /* ================= LOAD DOCUMENTS ================= */
  useEffect(() => {
    loadDocuments();
  }, [admissionId]);

  const loadDocuments = async () => {
    try {
      const res = await getStudentDocuments(admissionId);
      setDocuments(
        res.data.data.documents.map((doc) => ({
          id: doc.id,
          name: doc.fileUrl.split("/").pop(),
          url: doc.fileUrl,
          type: doc.fileUrl.includes(".pdf")
            ? "application/pdf"
            : "image/jpeg",
          verified: doc.verified,
          notes: doc.notes,
          documentType: doc.type,
          backendType: "document",
        }))
      );
    } catch {
      toast.error("Failed to load documents");
    }
  };

  /* ================= UPLOAD ================= */
  const handleFileUpload = async (e, category) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG, PNG allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "fileType",
      category === "Photo" ? "photo" : "document"
    );
    formData.append("studentId", admissionId);

    if (category === "Document") {
      formData.append("documentType", documentType);
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      await uploadStudentDocument(formData, setUploadProgress);

      toast.success("File uploaded successfully");
      loadDocuments();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (doc) => {
    try {
      await deleteFile(doc.id, doc.backendType);
      toast.success("File deleted");
      loadDocuments();
    } catch {
      toast.error("You are not allowed to delete this file");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Document Verification
          </h1>
          <p className="text-sm text-gray-500">
            Admission ID: {admissionId}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:opacity-80"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= UPLOAD AREA ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* STUDENT PHOTO */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4 flex gap-2">
              <FaUserGraduate /> Student Photo
            </h3>

            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:bg-gray-50">
              <FaUpload className="text-2xl mb-2 text-gray-400" />
              <p className="font-medium">Upload Photo</p>
              <input
                type="file"
                hidden
                accept="image/png,image/jpeg"
                onChange={(e) =>
                  handleFileUpload(e, "Photo")
                }
              />
            </label>
          </div>

          {/* DOCUMENT UPLOAD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">
              Required Documents
            </h3>

            {/* DOCUMENT TYPE */}
            <select
              value={documentType}
              onChange={(e) =>
                setDocumentType(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            >
              <option value="AADHAR">Aadhar Card</option>
              <option value="MARKSHEET">Marksheet</option>
              <option value="TC">Transfer Certificate</option>
              <option value="OTHER">Other</option>
            </select>

            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:bg-gray-50">
              <FaUpload className="text-2xl mb-2 text-gray-400" />
              <p className="font-medium">Upload Document</p>
              <input
                type="file"
                hidden
                accept="application/pdf,image/png,image/jpeg"
                onChange={(e) =>
                  handleFileUpload(e, "Document")
                }
              />
            </label>

            {/* PROGRESS BAR */}
            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ================= FILE LIST ================= */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">
            Uploaded Files
          </h3>

          {documents.length === 0 && (
            <p className="text-sm text-gray-500">
              No documents uploaded
            </p>
          )}

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {doc.type.includes("pdf") ? (
                  <FaFilePdf className="text-red-500" />
                ) : (
                  <FaImage className="text-blue-500" />
                )}

                <div>
                  <p className="text-sm font-medium truncate max-w-[140px]">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {doc.documentType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge verified={doc.verified} />

                <button
                  onClick={() => setPreview(doc)}
                  className="text-blue-600"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => handleDelete(doc)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] md:w-[70%] h-[80%] p-4 relative">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>

            {preview.type.includes("pdf") ? (
              <iframe
                src={preview.url}
                className="w-full h-full rounded-lg"
                title="preview"
              />
            ) : (
              <img
                src={preview.url}
                alt="preview"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
