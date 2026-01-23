import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchStudents } from "@/api/student.api";
import { toast } from "react-toastify";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  ADMITTED: "bg-green-100 text-green-700",
  APPLIED: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const StudentTable = ({ search, filters }) => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 5;
  const { course, session, status } = filters;

  /* 🔁 Reset page on filter/search change */
  useEffect(() => {
    setPage(1);
  }, [search, course, session, status]);

  /* ===== FETCH STUDENTS ===== */
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const res = await fetchStudents({
          search,
          courseId: course,
          sessionId: session,
          status,
          page,
          limit: perPage,
        });

        console.log("🟢 Students API response:", res.data);

        const list =
          Array.isArray(res?.data?.data?.students)
            ? res.data.data.students
            : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];

        console.log("🟣 Parsed students list:", list);

        setStudents(list);
        setTotalPages(res?.data?.data?.pagination?.totalPages || 1);
      } catch (err) {
        console.error("❌ Fetch students error:", err);
        toast.error("Failed to load students");
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search, course, session, status, page]);

  return (
    <div className="rounded-2xl border overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left font-medium">Reg No</th>
            <th className="text-left font-medium">Name</th>
            <th className="text-left font-medium">Course</th>
            <th className="text-left font-medium">Session</th>
            <th className="text-left font-medium">Status</th>
            <th className="text-center font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-10">
                Loading...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-10">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/admin/students/${s.id}`)}
              >
                <td className="p-4">{s.regNo || "-"}</td>
                <td>{s.name}</td>
                <td>{s.course?.name || "-"}</td>
                <td>{s.session?.name || "-"}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[s.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {s.status || "N/A"}
                  </span>
                </td>
                <td
                  className="text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() =>
                      navigate(`/admin/students/${s.id}?mode=edit`)
                    }
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-between px-4 py-3 bg-gray-50">
          <p className="text-sm">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-1.5 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-1.5 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
