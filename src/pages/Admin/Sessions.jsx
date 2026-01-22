import { useEffect, useState } from "react";
import { FaSearch, FaTable, FaThLarge } from "react-icons/fa";
import { toast } from "react-toastify";
import { getSessions, createSession, updateSession } from "@/api";



const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("card");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    startYear: "",
    endYear: "",
    courseId: "",
  });

  /* ================= FETCH ================= */
  const fetchSessions = async () => {
  try {
    const res = await getSessions();

    const data =
      Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data?.data?.sessions)
        ? res.data.data.sessions
        : Array.isArray(res.data)
        ? res.data
        : [];

    setSessions(data);
  } catch (err) {
    setSessions([]);
    toast.error("Failed to load sessions");
  }
};


  useEffect(() => {
    fetchSessions();
  }, []);

  /* ================= FILTER ================= */
  const filtered = Array.isArray(sessions)
  ? sessions.filter((s) =>
      s.name?.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!form.name || !form.startYear || !form.endYear) {
      toast.error("All required fields must be filled");
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
      if (form.id) {
        await updateSession(form.id, payload);
        toast.success("Session updated");
      } else {
        await createSession(payload);
        toast.success("Session created");
      }
      setModalOpen(false);
      fetchSessions();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Academic Sessions</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded ${
              view === "card" &&
              "bg-[color:var(--primary)] text-white"
            }`}
          >
            <FaThLarge />
          </button>

          <button
            onClick={() => setView("table")}
            className={`p-2 rounded ${
              view === "table" &&
              "bg-[color:var(--primary)] text-white"
            }`}
          >
            <FaTable />
          </button>

          <button
            onClick={() => {
              setForm({
                name: "",
                startYear: "",
                endYear: "",
                courseId: "",
              });
              setModalOpen(true);
            }}
            className="bg-[color:var(--primary)] text-white px-5 py-2 rounded-lg"
          >
            + Create
          </button>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          placeholder="Search session..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg w-full"
        />
      </div>

      {/* ================= CARD VIEW ================= */}
      {view === "card" && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-xl border"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <h2 className="font-semibold text-lg">{s.name}</h2>
              <p className="text-sm text-[color:var(--muted)]">
                {s.startYear} – {s.endYear}
              </p>

              <button
                onClick={() => {
                  setForm({
                    id: s.id,
                    name: s.name,
                    startYear: s.startYear,
                    endYear: s.endYear,
                    courseId: s.courseId || "",
                  });
                  setModalOpen(true);
                }}
                className="mt-4 text-sm text-[color:var(--primary)]"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= TABLE VIEW ================= */}
      {view === "table" && (
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.name}</td>
                  <td>{s.startYear}</td>
                  <td>{s.endYear}</td>
                  <td>
                    <button
                      onClick={() => {
                        setForm({
                          id: s.id,
                          name: s.name,
                          startYear: s.startYear,
                          endYear: s.endYear,
                          courseId: s.courseId || "",
                        });
                        setModalOpen(true);
                      }}
                      className="text-[color:var(--primary)]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">
              {form.id ? "Edit Session" : "Create Session"}
            </h2>

            {["name", "startYear", "endYear", "courseId"].map((field) => (
              <input
                key={field}
                placeholder={field}
                value={form[field] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            ))}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white rounded"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Sessions;
