import { useState } from "react";
import { createNotice } from "@/api/cms.api";
import { toast } from "react-toastify";
import { FaSave, FaClipboardList } from "react-icons/fa";

const NoticeCreate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.error("Title and notice content are required");
      return;
    }

    try {
      setLoading(true);
      await createNotice({ title, body });
      toast.success("Notice created successfully");
      setTitle("");
      setBody("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--color-primary)] flex items-center gap-2">
          <FaClipboardList />
          Create Notice
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Publish official notices for students and staff
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={submit}
        className="
          bg-white border border-gray-200 rounded-2xl shadow-sm
          p-6 space-y-6
        "
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Notice Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Holiday Notice – Holi Festival"
            className="
              w-full px-4 py-2.5 rounded-lg border
              focus:outline-none focus:ring-2
              focus:ring-[color:var(--color-primary)]
            "
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Notice Content
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write complete notice details here..."
            rows={6}
            className="
              w-full px-4 py-2.5 rounded-lg border resize-none
              focus:outline-none focus:ring-2
              focus:ring-[color:var(--color-primary)]
            "
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setBody("");
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
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <FaSave />
            {loading ? "Saving..." : "Save Notice"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeCreate;
