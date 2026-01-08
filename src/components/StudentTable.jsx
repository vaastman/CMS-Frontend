import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const studentsData = [
  {
    id: 1,
    regNo: "TPS202467066",
    name: "Sumit Kumar",
    course: "BCA",
    session: "2024-2028",
    status: "Admitted",
  },
  {
    id: 2,
    regNo: "TPS202467055",
    name: "Birendra Kumar",
    course: "BSc",
    session: "2024-2028",
    status: "Applied",
  },
];

const statusStyles = {
  Admitted: "bg-green-100 text-green-700",
  Applied: "bg-yellow-100 text-yellow-700",
  Deleted: "bg-red-100 text-red-700",
};

const StudentTable = ({ search, filters }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const perPage = 5;

  /* ===== FILTER DATA ===== */
  const filtered = useMemo(() => {
    return studentsData.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) &&
        (filters.course ? s.course === filters.course : true) &&
        (filters.session ? s.session === filters.session : true) &&
        (filters.status ? s.status === filters.status : true)
    );
  }, [search, filters]);

  /* ===== RESET PAGE ON FILTER CHANGE ===== */
  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-divider)",
      }}
    >
      <table className="w-full text-sm">
        <thead
          className="border-b"
          style={{ backgroundColor: "var(--color-page)" }}
        >
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
          {paginated.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-10"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No students found
              </td>
            </tr>
          ) : (
            paginated.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
                style={{ borderColor: "var(--color-divider)" }}
                onClick={() =>
                  navigate(`/academics/students/${s.id}`)
                }
              >
                <td className="p-4">{s.regNo}</td>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>{s.session}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[s.status]
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                {/* ===== ACTION ===== */}
                <td className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/admin/students/${s.id}?mode=edit`
                      );
                    }}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ backgroundColor: "var(--color-page)" }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-1.5 text-sm rounded-lg border disabled:opacity-50"
              style={{ borderColor: "var(--color-divider)" }}
            >
              Prev
            </button>

            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={page === totalPages}
              className="px-4 py-1.5 text-sm rounded-lg border disabled:opacity-50"
              style={{ borderColor: "var(--color-divider)" }}
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
