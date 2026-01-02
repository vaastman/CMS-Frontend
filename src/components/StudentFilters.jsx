import React from "react";

const StudentFilters = ({ search, setSearch, filters, setFilters }) => {
  return (
    <div
      className="p-4 rounded-2xl border flex flex-wrap gap-4"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-divider)",
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name / Reg No"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64 px-4 py-2 text-sm rounded-xl border outline-none transition"
        style={{
          borderColor: "var(--color-divider)",
          color: "var(--color-text-primary)",
        }}
        onFocus={(e) =>
          (e.target.style.borderColor = "var(--color-primary)")
        }
        onBlur={(e) =>
          (e.target.style.borderColor = "var(--color-divider)")
        }
      />

      {/* Course Filter */}
      <select
        className="px-4 py-2 text-sm rounded-xl border outline-none transition"
        style={{
          borderColor: "var(--color-divider)",
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-surface)",
        }}
        onChange={(e) =>
          setFilters({ ...filters, course: e.target.value })
        }
      >
        <option value="">All Courses</option>
        <option>BCA</option>
        <option>BSc</option>
        <option>BA</option>
      </select>

      {/* Session Filter */}
      <select
        className="px-4 py-2 text-sm rounded-xl border outline-none transition"
        style={{
          borderColor: "var(--color-divider)",
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-surface)",
        }}
        onChange={(e) =>
          setFilters({ ...filters, session: e.target.value })
        }
      >
        <option value="">All Sessions</option>
        <option>2022-25</option>
        <option>2023-26</option>
      </select>

      {/* Status Filter */}
      <select
        className="px-4 py-2 text-sm rounded-xl border outline-none transition"
        style={{
          borderColor: "var(--color-divider)",
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-surface)",
        }}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option>Admitted</option>
        <option>Applied</option>
      </select>
    </div>
  );
};

export default StudentFilters;
