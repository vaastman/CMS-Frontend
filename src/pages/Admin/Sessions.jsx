import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from "@/api";

const emptyForm = {
  id: null,
  name: "",
  startYear: "",
  endYear: "",
  courseId: "",
};

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [openForm, setOpenForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  /* ================= FETCH ================= */
  const fetchSessions = async () => {
    try {
      const res = await getSessions();
      const data =
        res.data?.data?.sessions ||
        res.data?.data ||
        res.data ||
        [];
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load sessions");
      setSessions([]);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  /* ================= FILTER ================= */
  const filteredSessions = sessions.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.name || !form.startYear || !form.endYear) {
      toast.error("All required fields are mandatory");
      return;
    }

    if (+form.startYear >= +form.endYear) {
      toast.error("End year must be greater than start year");
      return;
    }

    const payload = {
      name: form.name,
      startYear: Number(form.startYear),
      endYear: Number(form.endYear),
      courseId: form.courseId || undefined,
    };

    try {
      form.id
        ? await updateSession(form.id, payload)
        : await createSession(payload);

      toast.success(form.id ? "Session updated" : "Session created");
      setOpenForm(false);
      setForm(emptyForm);
      fetchSessions();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      await deleteSession(deleteId);
      toast.success("Session deleted");
      setDeleteId(null);
      fetchSessions();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= TOOLBAR ================= */}
      <div
        className="p-4 rounded-xl flex flex-wrap gap-4 justify-between items-center border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <h1 className="text-xl font-semibold">Academic Sessions</h1>

        <div className="flex gap-3 items-center">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search session..."
              className="pl-9 pr-3 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={() => {
              setForm(emptyForm);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white
                       bg-[color:var(--color-primary)]"
          >
            <FaPlus /> Add Session
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div
        className="border rounded-xl overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Session Name</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSessions.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No sessions found
                </td>
              </tr>
            )}

            {filteredSessions.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3 font-medium">{s.name}</td>
                <td>{s.startYear}</td>
                <td>{s.endYear}</td>
                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => {
                      setForm({
                        id: s.id,
                        name: s.name,
                        startYear: s.startYear,
                        endYear: s.endYear,
                        courseId: s.courseId || "",
                      });
                      setOpenForm(true);
                    }}
                    className="text-[color:var(--primary)]"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => setDeleteId(s.id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">
              {form.id ? "Edit Session" : "Add Session"}
            </h2>

            {[
              ["name", "Session Name"],
              ["startYear", "Start Year"],
              ["endYear", "End Year"],
              ["courseId", "Course ID (optional)"],
            ].map(([key, label]) => (
              <div key={key} className="space-y-1">
                <label className="text-sm font-medium">{label}</label>
                <input
                  value={form[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg
                             focus:outline-none focus:ring-2
                             focus:ring-[color:var(--primary)]"
                />
              </div>
            ))}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setOpenForm(false);
                  setForm(emptyForm);
                }}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded text-white
                           bg-[color:var(--color-primary)]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold">Delete Session?</h3>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;
