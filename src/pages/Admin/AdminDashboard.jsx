import { FaUsers, FaBook, FaBullhorn, FaFileAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Staff", value: 124, icon: <FaUsers />, color: "bg-blue-600" },
    { title: "Courses", value: 18, icon: <FaBook />, color: "bg-green-600" },
    { title: "Notices", value: 42, icon: <FaBullhorn />, color: "bg-yellow-600" },
    { title: "Exams", value: 12, icon: <FaFileAlt />, color: "bg-red-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`${stat.color} text-white rounded-lg p-5 shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">{stat.title}</p>
                <h2 className="text-3xl font-bold">{stat.value}</h2>
              </div>
              <div className="text-3xl opacity-80">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded">
            Add New Notice
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded">
            Add Staff
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded">
            Create Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
