import React, { useState } from "react";
import { FaSearch, FaTable, FaThLarge, FaCalendar } from "react-icons/fa";

const initialSessions = [
  {
    id: 1,
    course: "B.Sc Computer Science",
    semester: "Sem 1",
    date: "2025-01-12",
    time: "10:00 – 11:30",
    students: 60,
    status: "Active",
  },
  {
    id: 2,
    course: "B.A Economics",
    semester: "Sem 3",
    date: "2025-01-14",
    time: "12:00 – 01:30",
    students: 45,
    status: "Upcoming",
  },
  {
    id: 3,
    course: "B.Com Accounting",
    semester: "Sem 5",
    date: "2025-01-12",
    time: "02:00 – 03:30",
    students: 52,
    status: "Completed",
  },
];

const Sessions = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("card"); // card | table | calendar
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  /* ================= FILTER ================= */
  const filtered = sessions.filter((s) =>
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= GROUP BY DATE (CALENDAR) ================= */
  const groupedByDate = filtered.reduce((acc, curr) => {
    acc[curr.date] = acc[curr.date] || [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  /* ================= SAVE SESSION ================= */
  const handleSave = () => {
    if (form.id) {
      setSessions(sessions.map(s => (s.id === form.id ? form : s)));
    } else {
      setSessions([...sessions, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Sessions</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded ${view === "card" && "bg-blue-600 text-white"}`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded ${view === "table" && "bg-blue-600 text-white"}`}
          >
            <FaTable />
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`p-2 rounded ${view === "calendar" && "bg-blue-600 text-white"}`}
          >
            <FaCalendar />
          </button>

          <button
            onClick={() => {
              setForm({});
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create
          </button>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
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
            <div key={s.id} className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-semibold">{s.course}</h2>
              <p className="text-sm text-gray-500">{s.semester}</p>
              <p className="mt-2 text-sm">{s.date} | {s.time}</p>
              <p className="text-sm">{s.students} Students</p>

              <button
                onClick={() => {
                  setForm(s);
                  setModalOpen(true);
                }}
                className="mt-4 text-blue-600 text-sm"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= TABLE VIEW ================= */}
      {view === "table" && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Course</th>
                <th>Date</th>
                <th>Time</th>
                <th>Students</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.course}</td>
                  <td>{s.date}</td>
                  <td>{s.time}</td>
                  <td>{s.students}</td>
                  <td>
                    <button
                      onClick={() => {
                        setForm(s);
                        setModalOpen(true);
                      }}
                      className="text-blue-600"
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

      {/* ================= CALENDAR VIEW ================= */}
      {view === "calendar" && (
        <div className="space-y-6">
          {Object.keys(groupedByDate).map(date => (
            <div key={date}>
              <h3 className="font-semibold mb-2">{date}</h3>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {groupedByDate[date].map(s => (
                  <div key={s.id} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-medium">{s.course}</h4>
                    <p className="text-sm">{s.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">
              {form.id ? "Edit Session" : "Create Session"}
            </h2>

            {["course", "semester", "date", "time", "students"].map((field) => (
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
                className="px-4 py-2 bg-blue-600 text-white rounded"
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
