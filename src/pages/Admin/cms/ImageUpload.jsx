import { useState, useEffect } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import { generatePresignedUrl } from "@/api/cms.api";
import { toast } from "react-toastify";

const ImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();

    let mimeType;

    if (extension === "jpg" || extension === "jpeg") {
      mimeType = "image/jpeg";
    } else if (extension === "png") {
      mimeType = "image/png";
    } else {
      toast.error("Only JPG and PNG images are allowed");
      return;
    }

    // 🔥 Clean safe filename (avoid backend rejection)
    const safeFileName = `gallery-${Date.now()}.${extension}`;

   try {
  setLoading(true);

  const response = await generatePresignedUrl({
    fileName: safeFileName,
    mimeType,
    folder: "gallery",
  });

  const { uploadUrl, fileUrl } = response.data;

  if (!uploadUrl || !fileUrl) {
    throw new Error("Invalid presigned response");
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": mimeType,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Upload failed");
  }

  setPreview(fileUrl);
  onChange(fileUrl);

  toast.success("Image uploaded successfully");

} catch (error) {
  console.error(error);
  toast.error("Image upload failed");
} finally {
  setLoading(false);
}
  };

  const removeImage = () => {
    setPreview("");
    onChange("");
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-56 object-cover rounded-xl border"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 right-3 p-2 rounded-full bg-red-600 text-white hover:opacity-90 transition"
          >
            <FaTrash size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <FaUpload className="text-3xl text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-600">
            Click to upload image
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, JPEG, PNG supported
          </p>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      )}

      {loading && (
        <p className="text-sm text-[color:var(--color-primary)] font-medium">
          Uploading image...
        </p>
      )}
    </div>
  );
};

export default ImageUpload;