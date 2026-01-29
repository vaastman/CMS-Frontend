import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUpload,
  FaEye,
  FaTimes,
  FaArrowLeft,
  FaUserGraduate,
  FaFilePdf,
  FaImage,
  FaTrash
} from "react-icons/fa";
import { toast } from "react-toastify";

const DocumentUpload = () => {
  const { admissionId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [preview, setPreview] = useState(null);

  const handleFileUpload = (e, category) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG, PNG files are allowed");
      return;
    }

    const newFile = {
      name: file.name,
      type: file.type,
      category,
      url: URL.createObjectURL(file),
    };

    setDocuments((prev) => [...prev, newFile]);
    toast.success(`${category} uploaded successfully`);
  };
  
  const handleDelete = (index) => {
  setDocuments((prev) => prev.filter((_, i) => i !== index));
  toast.success("File removed");
};


  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ===== HEADER ===== */}
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
          className="flex items-center gap-2 text-sm font-medium
                     text-[color:var(--color-primary)] hover:opacity-80"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* ===== GRID LAYOUT ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== LEFT: UPLOAD AREA ===== */}
        <div className="lg:col-span-2 space-y-6">

          {/* STUDENT PHOTO */}
          <div className="bg-[color:var(--color-surface)] border rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserGraduate />
              Student Photo
            </h3>

            <label className="group border-2 border-dashed rounded-xl p-8
                              flex flex-col items-center justify-center
                              cursor-pointer text-center
                              hover:border-[color:var(--color-primary)]
                              hover:bg-gray-50 transition">
              <FaUpload className="text-2xl mb-2 text-gray-400 group-hover:text-[color:var(--color-primary)]" />
              <p className="font-medium">Upload Student Photo</p>
              <p className="text-xs text-gray-500 mt-1">JPG or PNG only</p>

              <input
                type="file"
                accept="image/png,image/jpeg"
                hidden
                onChange={(e) => handleFileUpload(e, "Photo")}
              />
            </label>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-[color:var(--color-surface)] border rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Required Documents
            </h3>

            <label className="group border-2 border-dashed rounded-xl p-8
                              flex flex-col items-center justify-center
                              cursor-pointer text-center
                              hover:border-[color:var(--color-primary)]
                              hover:bg-gray-50 transition">
              <FaUpload className="text-2xl mb-2 text-gray-400 group-hover:text-[color:var(--color-primary)]" />
              <p className="font-medium">Upload Document</p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG, or PNG
              </p>

              <input
                type="file"
                accept="application/pdf,image/png,image/jpeg"
                hidden
                onChange={(e) => handleFileUpload(e, "Document")}
              />
            </label>
          </div>
        </div>

        {/* ===== RIGHT: FILE SUMMARY ===== */}
        <div className="bg-[color:var(--color-surface)] border rounded-2xl p-6 space-y-4">

          <h3 className="font-semibold text-gray-800">
            Uploaded Files
          </h3>

          {documents.length === 0 && (
            <p className="text-sm text-gray-500">
              No documents uploaded yet
            </p>
          )}

          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between
                         border rounded-lg p-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {doc.type.includes("pdf") ? (
                  <FaFilePdf className="text-red-500" />
                ) : (
                  <FaImage className="text-blue-500" />
                )}

                <div>
                  <p className="text-sm font-medium truncate max-w-[160px]">
                    {doc.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {doc.category}
                  </span>
                </div>
              </div>
<div className="flex items-center gap-3">
  {/* Preview */}
  <button
    onClick={() => setPreview(doc)}
    className="text-[color:var(--color-primary)] hover:opacity-80"
    title="Preview"
  >
    <FaEye />
  </button>

  {/* Delete */}
  <button
    onClick={() => handleDelete(index)}
    className="text-red-500 hover:text-red-600"
    title="Delete"
  >
    <FaTrash />
  </button>
</div>

            </div>
          ))}

          <button
            className="w-full mt-4 bg-[color:var(--color-success)]
                       text-white py-2.5 rounded-lg
                       font-medium hover:opacity-90 transition"
            onClick={() =>
              toast.success("Documents submitted for verification")
            }
          >
            Submit for Verification
          </button>
        </div>
      </div>

      {/* ===== MODAL PREVIEW ===== */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-60
                        flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl
                          w-[90%] md:w-[70%] h-[80%]
                          p-5 relative shadow-xl">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>

            <h3 className="font-semibold mb-4">{preview.name}</h3>

            {preview.type.includes("pdf") ? (
              <iframe
                src={preview.url}
                className="w-full h-full rounded-lg"
                title="PDF Preview"
              />
            ) : (
              <img
                src={preview.url}
                alt="Preview"
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
