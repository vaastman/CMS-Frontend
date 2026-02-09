import { useState } from "react";
import { createNews } from "@/api/cms.api";
import { toast } from "react-toastify";
import { FaSave, FaBullhorn, FaLink } from "react-icons/fa";

const NewsCreate = () => {
  const [form, setForm] = useState({
    title: "",
    body: "",
    isPublished: false,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      await createNews(form);
      toast.success("News created successfully");
      setForm({
        title: "",
        body: "",
        isPublished: false,
        url: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--color-primary)] flex items-center gap-2">
          <FaBullhorn />
          Create News
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Publish important announcements and updates
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
            News Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="e.g. Semester Examination Notice"
            className="
              w-full px-4 py-2.5 rounded-lg border
              focus:outline-none focus:ring-2
              focus:ring-[color:var(--color-primary)]
            "
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            News Content
          </label>
          <textarea
            value={form.body}
            onChange={(e) =>
              setForm({ ...form, body: e.target.value })
            }
            placeholder="Write full news content here..."
            rows={8}
            className="
              w-full px-4 py-2.5 rounded-lg border resize-none
              focus:outline-none focus:ring-2
              focus:ring-[color:var(--color-primary)]
            "
          />
        </div>

        {/* Optional URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Reference Link (optional)
          </label>
          <div className="relative">
            <FaLink className="absolute left-3 top-3 text-gray-400" />
            <input
              type="url"
              value={form.url}
              onChange={(e) =>
                setForm({ ...form, url: e.target.value })
              }
              placeholder="https://example.com"
              className="
                w-full pl-10 pr-4 py-2.5 rounded-lg border
                focus:outline-none focus:ring-2
                focus:ring-[color:var(--color-secondary)]
              "
            />
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3 pt-2">
          <input
            id="publish"
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) =>
              setForm({ ...form, isPublished: e.target.checked })
            }
            className="w-5 h-5 accent-[color:var(--color-primary)]"
          />
          <label
            htmlFor="publish"
            className="text-sm font-medium text-gray-700"
          >
            Publish immediately
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() =>
              setForm({
                title: "",
                body: "",
                isPublished: false,
                url: "",
              })
            }
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
            {loading ? "Publishing..." : "Save News"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsCreate;
