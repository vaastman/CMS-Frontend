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
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCloudUploadAlt,
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
      <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
        <FaCheckCircle className="text-[10px]" />
        Verified
      </span>
    );

  if (verified === false)
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-rose-50 text-rose-700 px-3 py-1.5 rounded-full border border-rose-200">
        <FaTimesCircle className="text-[10px]" />
        Rejected
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">
      <FaClock className="text-[10px]" />
      Pending
    </span>
  );
};

const DocumentUpload = () => {
  const { admissionId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [documentType, setDocumentType] = useState("AADHAR");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

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

  /* ================= DRAG & DROP ================= */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: [e.dataTransfer.files[0]] } }, category);
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
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    
    try {
      await deleteFile(doc.id, doc.backendType);
      toast.success("File deleted");
      loadDocuments();
    } catch {
      toast.error("You are not allowed to delete this file");
    }
  };

  /* ================= STATS ================= */
  const stats = {
    total: documents.length,
    verified: documents.filter(d => d.verified === true).length,
    pending: documents.filter(d => d.verified === null).length,
    rejected: documents.filter(d => d.verified === false).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <FaUserGraduate className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Document Verification Portal
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Admission ID: <span className="font-semibold text-slate-700">{admissionId}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <FaArrowLeft /> Back to Dashboard
            </button>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="text-xs font-medium text-slate-600 mb-1">Total Files</p>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <p className="text-xs font-medium text-emerald-700 mb-1">Verified</p>
              <p className="text-2xl font-bold text-emerald-800">{stats.verified}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <p className="text-xs font-medium text-amber-700 mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-800">{stats.pending}</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 border border-rose-200">
              <p className="text-xs font-medium text-rose-700 mb-1">Rejected</p>
              <p className="text-2xl font-bold text-rose-800">{stats.rejected}</p>
            </div>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= UPLOAD AREA ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* STUDENT PHOTO */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <FaUserGraduate className="text-lg" />
                  Student Photograph
                </h3>
                <p className="text-xs text-blue-100 mt-1">Upload a clear passport-size photo</p>
              </div>

              <div className="p-6">
                <label
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, "Photo")}
                  className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4">
                    <FaCloudUploadAlt className="text-3xl text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-800 mb-1">
                    Drop photo here or click to browse
                  </p>
                  <p className="text-xs text-slate-500">
                    Supports: JPG, PNG (Max 5MB)
                  </p>
                  <input
                    type="file"
                    hidden
                    accept="image/png,image/jpeg"
                    onChange={(e) => handleFileUpload(e, "Photo")}
                    disabled={loading}
                  />
                </label>
              </div>
            </div>

            {/* DOCUMENT UPLOAD */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <FaFilePdf className="text-lg" />
                  Required Documents
                </h3>
                <p className="text-xs text-indigo-100 mt-1">Upload official documents for verification</p>
              </div>

              <div className="p-6 space-y-4">
                {/* DOCUMENT TYPE SELECTOR */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="AADHAR">Aadhar Card</option>
                    <option value="MARKSHEET">Marksheet</option>
                    <option value="TC">Transfer Certificate</option>
                    <option value="OTHER">Other Documents</option>
                  </select>
                </div>

                {/* UPLOAD ZONE */}
                <label
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, "Document")}
                  className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                    <FaCloudUploadAlt className="text-3xl text-indigo-600" />
                  </div>
                  <p className="font-semibold text-slate-800 mb-1">
                    Drop document here or click to browse
                  </p>
                  <p className="text-xs text-slate-500">
                    Supports: PDF, JPG, PNG (Max 10MB)
                  </p>
                  <input
                    type="file"
                    hidden
                    accept="application/pdf,image/png,image/jpeg"
                    onChange={(e) => handleFileUpload(e, "Document")}
                    disabled={loading}
                  />
                </label>

                {/* PROGRESS BAR */}
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= FILE LIST ================= */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4">
              <h3 className="font-semibold text-white">Uploaded Documents</h3>
              <p className="text-xs text-slate-300 mt-1">{documents.length} file(s) uploaded</p>
            </div>

            <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto">
              {documents.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <FaFilePdf className="text-2xl text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">No documents uploaded yet</p>
                  <p className="text-xs text-slate-500 mt-1">Upload your first document to get started</p>
                </div>
              )}

              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="group border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-blue-300 transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        doc.type.includes("pdf")
                          ? "bg-red-50 text-red-600"
                          : "bg-blue-50 text-blue-600"
                      }`}>
                        {doc.type.includes("pdf") ? (
                          <FaFilePdf className="text-lg" />
                        ) : (
                          <FaImage className="text-lg" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {doc.documentType}
                        </p>
                        <div className="mt-2">
                          <StatusBadge verified={doc.verified} />
                        </div>
                        {doc.notes && (
                          <p className="text-xs text-slate-600 mt-2 italic">
                            Note: {doc.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setPreview(doc)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                        title="Preview"
                      >
                        <FaEye className="text-sm" />
                      </button>

                      <button
                        onClick={() => handleDelete(doc)}
                        className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h3 className="font-semibold text-slate-800">{preview.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{preview.documentType}</p>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-6 overflow-hidden">
              {preview.type.includes("pdf") ? (
                <iframe
                  src={preview.url}
                  className="w-full h-full rounded-xl border border-slate-200"
                  title="preview"
                />
              ) : (
                <img
                  src={preview.url}
                  alt="preview"
                  className="w-full h-full object-contain rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;