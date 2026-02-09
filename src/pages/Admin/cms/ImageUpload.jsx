import { useState } from "react";

const ImageUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(value);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔥 integrate with your existing file upload API
    // const url = await uploadFile(file);

    const url = URL.createObjectURL(file); // demo only
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="space-y-2">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg border"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="block w-full"
      />
    </div>
  );
};

export default ImageUpload;
