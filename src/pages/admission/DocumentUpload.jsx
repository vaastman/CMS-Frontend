import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getStudentDocuments,
  uploadFile,
  deleteFile,
} from "@/api/files.api";

const DocumentUpload = () => {
  const { admissionId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [documentType, setDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DOCUMENTS ================= */

  const loadDocuments = async () => {
    try {
      const res = await getStudentDocuments(admissionId);

      const docs = res?.data?.data?.documents || [];

      const formatted = docs.map((doc) => {
        const fileName = doc.fileUrl.split("/").pop();

        return {
          id: doc.id,
          name: fileName,
          url: doc.fileUrl,
          verified: doc.verified,
          type: fileName.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
        };
      });

      setDocuments(formatted);
    } catch (err) {
      // toast.error("Failed to load documents");
    }
  };

  useEffect(() => {
    if (admissionId) {
      loadDocuments();
    }
  }, [admissionId]);

  /* ================= FILE SELECT ================= */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
  };

  /* ================= UPLOAD ================= */

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    if (!documentType) {
      toast.error("Please select document type");
      return;
    }

    try {
      setLoading(true);

      await uploadFile({
        file: selectedFile,
        fileType: "document",
        studentId: admissionId,
        documentType,
      });

      toast.success("File uploaded successfully");

      setSelectedFile(null);
      setDocumentType("");

      loadDocuments();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (doc) => {
    if (!window.confirm("Delete this file?")) return;

    try {
      await deleteFile(doc.id, "document");

      toast.success("File deleted");

      loadDocuments();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Document Upload</h2>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Back
          </button>
        </div>

        {/* DOCUMENT TYPE */}

        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Document Type
          </label>

          <select
            className="border px-3 py-2 rounded w-full"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select Document</option>
            <option value="AADHAR">Aadhar Card</option>
            <option value="MARKSHEET">Marksheet</option>
            <option value="PHOTO">Photo</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* FILE INPUT */}

        <div className="border-2 border-dashed p-10 text-center rounded mb-4">

          <input
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
            disabled={loading}
          />

          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name}
            </p>
          )}

        </div>

        {/* UPLOAD BUTTON */}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>

        {/* FILE LIST */}

        <h3 className="font-semibold mt-8 mb-3">
          Uploaded Files
        </h3>

        {documents.length === 0 && (
          <p className="text-gray-400">No files uploaded</p>
        )}

        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex justify-between items-center border-b py-3"
          >

            <p>{doc.name}</p>

            <div className="flex gap-3">

              <button
                onClick={() => setPreview(doc)}
                className="text-blue-600"
              >
                View
              </button>

              <button
                onClick={() => handleDelete(doc)}
                className="text-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* PREVIEW MODAL */}

      {preview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-white p-4 rounded w-[90%] max-w-4xl">

            <div className="flex justify-between mb-4">
              <h3>{preview.name}</h3>

              <button onClick={() => setPreview(null)}>
                Close
              </button>
            </div>

            {preview.type === "pdf" ? (
              <iframe
                src={preview.url}
                className="w-full h-[70vh]"
              />
            ) : (
              <img
                src={preview.url}
                className="w-full h-[70vh] object-contain"
              />
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default DocumentUpload;