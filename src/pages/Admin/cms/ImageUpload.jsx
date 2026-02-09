import { useState, useEffect } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";

const ImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      // 🔥 Integrate real upload API here later
      // const uploadedUrl = await uploadFile(file);

      const uploadedUrl = URL.createObjectURL(file); // demo only
      setPreview(uploadedUrl);
      onChange(uploadedUrl);
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
      {/* Preview */}
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-56 object-cover rounded-xl border"
          />

          {/* Remove */}
          <button
            type="button"
            onClick={removeImage}
            className="
              absolute top-3 right-3 p-2 rounded-full
              bg-red-600 text-white opacity-90
              hover:opacity-100 transition
            "
            title="Remove image"
          >
            <FaTrash size={14} />
          </button>
        </div>
      ) : (
        /* Upload Box */
        <label
          className="
            flex flex-col items-center justify-center
            w-full h-44 border-2 border-dashed rounded-xl
            cursor-pointer transition
            bg-gray-50 hover:bg-gray-100
            border-gray-300
          "
        >
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

      {/* Loading */}
      {loading && (
        <p className="text-sm text-[color:var(--color-primary)] font-medium">
          Uploading image...
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
