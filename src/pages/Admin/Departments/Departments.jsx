import {
  FaUniversity,
  FaUsers,
  FaBook,
  FaChevronRight,
} from "react-icons/fa";

const Departments = () => {
  const departments = [
    {
      id: 1,
      name: "Computer Science",
      hod: "Dr. Amit Kumar",
      staffCount: 12,
      courses: 4,
    },
    {
      id: 2,
      name: "Mathematics",
      hod: "Dr. Neha Singh",
      staffCount: 9,
      courses: 3,
    },
    {
      id: 3,
      name: "English",
      hod: "Dr. Ritu Sharma",
      staffCount: 7,
      courses: 2,
    },
    {
      id: 4,
      name: "Physics",
      hod: "Dr. Sandeep Verma",
      staffCount: 10,
      courses: 3,
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
          Departments
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
          Academic departments and administration overview
        </p>
      </div>

      {/* ================= DEPARTMENT GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="
              bg-[color:var(--color-surface)]
              rounded-2xl shadow-sm
              hover:shadow-md transition
              p-6 flex flex-col justify-between
            "
          >
            {/* Top */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="
                  w-12 h-12 rounded-xl
                  flex items-center justify-center
                  bg-[color:var(--color-primary)]
                  text-white text-lg
                "
              >
                <FaUniversity />
              </div>

              <div>
                <h3 className="font-semibold text-lg text-[color:var(--color-text-primary)]">
                  {dept.name}
                </h3>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Head: {dept.hod}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="flex items-center gap-2">
                <FaUsers className="text-[color:var(--color-primary)]" />
                <span>{dept.staffCount} Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBook className="text-[color:var(--color-primary)]" />
                <span>{dept.courses} Courses</span>
              </div>
            </div>

            {/* Action */}
            <button
              className="
                mt-auto
                flex items-center justify-between
                px-4 py-2 rounded-lg
                bg-[color:var(--color-background)]
                text-[color:var(--color-primary)]
                font-medium
                hover:bg-[color:var(--color-primary)]
                hover:text-white
                transition
              "
            >
              View Department
              <FaChevronRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
