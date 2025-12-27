import React from "react";

const Attendance = () => {
  const attendanceData = [
    {
      id: 1,
      name: "Rohit Kumar",
      subject: "Computer Science",
      percentage: 85,
      image: "https://i.pravatar.cc/150?img=12",
      description: "Consistent attendance with active class participation."
    },
    {
      id: 2,
      name: "Priya Sharma",
      subject: "Mathematics",
      percentage: 72,
      image: "https://i.pravatar.cc/150?img=32",
      description: "Needs improvement in regular class attendance."
    }
  ];

  return (
    <div className="w-full bg-gray-100">
      {/* ================= HERO SECTION ================= */}
      <div
        className="relative h-[280px] md:h-[360px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1623303366639-0e330d7c3d9f')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex items-center px-8 md:px-24">
          <h1 className="text-white text-4xl md:text-5xl font-semibold">
            Attendance Log
          </h1>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {attendanceData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {/* Profile Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 mb-4"
              />

              {/* Name */}
              <h2 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                {item.subject}
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">
                {item.description}
              </p>

              {/* Attendance Progress */}
              <div className="flex justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full rotate-[-90deg]">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke={item.percentage >= 75 ? "#16a34a" : "#dc2626"}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={
                        2 * Math.PI * 40 -
                        (item.percentage / 100) * 2 * Math.PI * 40
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                    {item.percentage}%
                  </div>
                </div>
              </div>

              <p
                className={`mt-4 font-medium ${
                  item.percentage >= 75
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                Attendance Status
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
