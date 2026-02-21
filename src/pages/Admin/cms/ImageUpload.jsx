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

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Get presigned upload URL from backend
      const response = await generatePresignedUrl({
        fileType: "gallery",      // 🔥 MUST match backend folderMap key
        fileName: file.name,
        mimeType: file.type,
      });

      // Backend returns: { status, data }
      const { uploadUrl, fileUrl } = response.data;

      if (!uploadUrl || !fileUrl) {
        throw new Error("Invalid presigned response");
      }

      // 2️⃣ Upload file directly to R2
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload to R2 failed");
      }

      // 3️⃣ Save permanent URL
      setPreview(fileUrl);
      onChange(fileUrl);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
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
            PNG, JPG, JPEG supported
          </p>

          <input
            type="file"
            accept="image/*"
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