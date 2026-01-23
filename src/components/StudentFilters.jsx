import { useEffect, useState } from "react";
import { getCourses } from "@/api/course.api";
import { getSessions } from "@/api/session.api";
import { toast } from "react-toastify";

const StudentFilters = ({ search, setSearch, filters, setFilters }) => {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  /* ================= LOAD COURSES ================= */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        const list =
          Array.isArray(res?.data?.data?.courses)
            ? res.data.data.courses
            : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];

        setCourses(list);
      } catch {
        toast.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  /* ================= LOAD SESSIONS ================= */
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getSessions();
        const list =
          Array.isArray(res?.data?.data?.sessions)
            ? res.data.data.sessions
            : Array.isArray(res?.data?.data)
            ? res.data.data
            : [];

        setSessions(list);
      } catch {
        toast.error("Failed to load sessions");
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="p-4 rounded-2xl border flex flex-wrap gap-4 bg-white">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name / Reg No"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64 px-4 py-2 text-sm rounded-xl border"
      />

      {/* Course */}
      <select
        className="px-4 py-2 text-sm rounded-xl border"
        value={filters.course}
        onChange={(e) =>
          setFilters({ ...filters, course: e.target.value })
        }
      >
        <option value="">All Courses</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Session */}
      <select
        className="px-4 py-2 text-sm rounded-xl border"
        value={filters.session}
        onChange={(e) =>
          setFilters({ ...filters, session: e.target.value })
        }
      >
        <option value="">All Sessions</option>
        {sessions.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.startYear}-{s.endYear})
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        className="px-4 py-2 text-sm rounded-xl border"
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="ADMITTED">Admitted</option>
        <option value="SUSPENDED">Suspended</option>
        <option value="DROPOUT">Dropout</option>
      </select>
    </div>
  );
};

export default StudentFilters;
