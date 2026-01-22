import { useState } from "react";
import { toast } from "react-toastify";
import { createSession } from "@/api/session.api";

const CreateSession = () => {
  const [form, setForm] = useState({
    name: "",
    startYear: "",
    endYear: "",
    courseId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Session name is required");
      return false;
    }
    if (!form.startYear || !form.endYear) {
      toast.error("Start year and end year are required");
      return false;
    }
    if (+form.startYear >= +form.endYear) {
      toast.error("End year must be greater than start year");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createSession({
        name: form.name,
        startYear: Number(form.startYear),
        endYear: Number(form.endYear),
        courseId: form.courseId || undefined,
      });

      toast.success("Session created successfully 🎉");
      setForm({ name: "", startYear: "", endYear: "", courseId: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create session");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div
        className="rounded-xl border p-6"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-xl font-semibold mb-6"
          style={{ color: "var(--text)" }}
        >
          Create Academic Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Session Name */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>
              Session Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 outline-none border bg-transparent"
              style={{
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
              placeholder="2024–2025"
            />
          </div>

          {/* Years */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>
                Start Year *
              </label>
              <input
                type="number"
                name="startYear"
                value={form.startYear}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 outline-none border bg-transparent"
                style={{
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              />
            </div>

            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>
                End Year *
              </label>
              <input
                type="number"
                name="endYear"
                value={form.endYear}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 outline-none border bg-transparent"
                style={{
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              />
            </div>
          </div>

          {/* Course ID */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "var(--muted)" }}>
              Course ID (Optional)
            </label>
            <input
              type="text"
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 outline-none border bg-transparent"
              style={{
                color: "var(--text)",
                borderColor: "var(--border)",
              }}
              placeholder="UUID"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-medium transition"
            style={{
              backgroundColor: "var(--primary)",
              color: "#fff",
            }}
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
