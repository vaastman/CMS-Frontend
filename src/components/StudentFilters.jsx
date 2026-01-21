const StudentFilters = ({ search, setSearch, filters, setFilters }) => {
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
        <option value="COURSE_UUID_1">BCA</option>
        <option value="COURSE_UUID_2">BSc</option>
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
        <option value="SESSION_UUID_1">2024–2028</option>
        <option value="SESSION_UUID_2">2023–2026</option>
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
        <option value="ADMITTED">Admitted</option>
        <option value="APPLIED">Applied</option>
      </select>
    </div>
  );
};

export default StudentFilters;
