import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile } from "@/api/files.api";

const DocumentUpload = () => {

  const { admissionId } = useParams();

  const [documentType, setDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {

    const file = e.target.files?.[0];
    if (!file) return;

    // Backend limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {

    if (!selectedFile) {
      toast.error("Please select file");
      return;
    }

    if (!documentType) {
      toast.error("Select document type");
      return;
    }

    try {

      setLoading(true);

      await uploadFile({
        file: selectedFile,
        fileType: "document",
        studentId: admissionId,
        documentType
      });

      toast.success("Document uploaded successfully");

      setSelectedFile(null);
      setDocumentType("");

      document.querySelector("input[type='file']").value = "";

    } catch (err) {

      console.error("Upload error:", err.response?.data || err);

      toast.error(
        err.response?.data?.message || "Upload failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-6">
          Upload Student Document
        </h2>

        {/* Document Type */}

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
            <option value="TC">Transfer Certificate</option>
            <option value="OTHER">Other</option>
          </select>

        </div>

        {/* File Upload */}

        <div className="border-2 border-dashed p-10 text-center rounded mb-4">

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileChange}
            disabled={loading}
          />

          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name}
            </p>
          )}

        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>

      </div>

    </div>
  );
};

export default DocumentUpload;