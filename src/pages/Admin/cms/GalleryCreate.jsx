import { useState } from "react";
import { createGallery } from "@/api/cms.api";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import { FaImage, FaSave } from "react-icons/fa";

const GalleryCreate = () => {
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Gallery title is required");
      return;
    }

    try {
      setLoading(true);
      await createGallery({ title, coverUrl });
      toast.success("Gallery item created successfully");
      setTitle("");
      setCoverUrl("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create gallery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">
          Create Gallery Item
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload images to be displayed on the website gallery
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={submit}
        className="
          bg-white rounded-2xl border border-gray-200 shadow-sm
          p-6 space-y-6
        "
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Gallery Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Annual Sports Day 2025"
            className="
              w-full px-4 py-2.5 rounded-lg border
              focus:outline-none focus:ring-2
              focus:ring-[color:var(--color-primary)]
            "
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gallery Image
          </label>
          <div className="border border-dashed rounded-xl p-4 bg-gray-50">
            <ImageUpload value={coverUrl} onChange={setCoverUrl} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setCoverUrl("");
            }}
            className="
              px-5 py-2.5 rounded-lg font-semibold
              border border-gray-300 text-gray-700
              hover:bg-gray-100 transition
            "
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold
              text-white transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
            style={{
              backgroundColor: "var(--color-primary)",
            }}
          >
            <FaSave />
            {loading ? "Saving..." : "Save Gallery"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryCreate;
