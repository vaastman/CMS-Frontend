import { useState } from "react";
import { createNews } from "@/api/cms.api";
import { toast } from "react-toastify";
import { FaSave, FaBullhorn, FaLink } from "react-icons/fa";

const NewsCreate = () => {
  const initialState = {
    title: "",
    body: "",
    isPublished: false,
    url: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title.trim(),
        body: form.body.trim(),
        isPublished: form.isPublished,
        url: form.url?.trim() ? form.url.trim() : undefined,
      };

      await createNews(payload);

      toast.success("News created successfully");
      setForm(initialState);
    } catch (err) {
      console.error("Create News Error:", err);

      const status = err.response?.status;

      if (status === 404) {
        toast.error("API route not found.");
      } else if (status === 401) {
        toast.error("Unauthorized. Please login again.");
      } else if (status === 403) {
        toast.error("You do not have permission.");
      } else {
        toast.error(
          err.response?.data?.message || "Failed to create news"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[color:var(--color-primary)] flex items-center gap-2">
          <FaBullhorn />
          Create News
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Publish important announcements and updates
        </p>
      </div>

      <form
        onSubmit={submit}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            News Title
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            News Content
          </label>
          <textarea
            required
            rows={8}
            value={form.body}
            onChange={(e) =>
              setForm({ ...form, body: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          />
        </div>

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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[color:var(--color-secondary)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) =>
              setForm({ ...form, isPublished: e.target.checked })
            }
            className="w-5 h-5 accent-[color:var(--color-primary)]"
          />
          <label className="text-sm font-medium text-gray-700">
            Publish immediately
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => setForm(initialState)}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition disabled:opacity-60"
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
