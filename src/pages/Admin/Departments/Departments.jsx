import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaUserGraduate,
  FaUsers,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";

const Departments = () => {
  const departmentsData = [
    {
      id: "CSE",
      name: "Computer Science & Engineering",
      short: "CS",
      code: "CSE-01",
      students: 450,
      faculty: 24,
      established: 2005,
      description:
        "The CSE department focuses on computing systems, software development, and algorithmic processes.",
      courses: [
        { code: "CS-101", name: "Introduction to Programming", credits: 4, duration: "45 Hrs", status: "Active" },
        { code: "CS-102", name: "Data Structures & Algorithms", credits: 4, duration: "50 Hrs", status: "Active" },
        { code: "CS-201", name: "Database Management Systems", credits: 3, duration: "40 Hrs", status: "Active" },
        { code: "CS-205", name: "Web Technologies", credits: 3, duration: "35 Hrs", status: "Review" },
        { code: "CS-301", name: "Operating Systems", credits: 4, duration: "45 Hrs", status: "Inactive" },
      ],
    },
    {
      id: "ME",
      name: "Mechanical Engineering",
      short: "ME",
      code: "ME-01",
      students: 320,
      faculty: 18,
      established: 2002,
      description: "Focuses on mechanics, thermodynamics, and manufacturing processes.",
      courses: [
        { code: "ME-101", name: "Engineering Mechanics", credits: 4, duration: "45 Hrs", status: "Active" },
        { code: "ME-201", name: "Thermodynamics", credits: 3, duration: "40 Hrs", status: "Active" },
      ],
    },
  ];

  const [selectedDept, setSelectedDept] = useState(departmentsData[0]);
  const [deptSearch, setDeptSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  const filteredDepartments = departmentsData.filter((d) =>
    d.name.toLowerCase().includes(deptSearch.toLowerCase())
  );

  const filteredCourses = selectedDept.courses.filter((c) =>
    c.name.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Departments & Courses</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Manage academic structure, course allocation, and curriculum details.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* LEFT PANEL */}
        <div className="bg-white rounded-xl border p-4 space-y-4">

          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Departments
              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                Total: {departmentsData.length}
              </span>
            </h3>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              value={deptSearch}
              onChange={(e) => setDeptSearch(e.target.value)}
              placeholder="Find department..."
              className="w-full pl-9 py-2 border rounded-lg text-sm"
            />
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white text-sm">
            <FaPlus /> Add Department
          </button>

          <div className="space-y-2">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => setSelectedDept(dept)}
                className={`p-3 rounded-lg border cursor-pointer transition
                  ${
                    selectedDept.id === dept.id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {dept.short}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{dept.name}</p>
                    <p className="text-xs text-gray-500">
                      {dept.courses.length} Courses
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="xl:col-span-3 space-y-6">

          {/* DEPARTMENT DETAILS */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {selectedDept.short}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">{selectedDept.name}</h2>
                  <p className="text-sm text-gray-600 mt-1 max-w-xl">
                    {selectedDept.description}
                  </p>

                  <div className="flex gap-6 mt-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaUserGraduate /> {selectedDept.students} Students
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUsers /> {selectedDept.faculty} Faculty
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> Est. {selectedDept.established}
                    </span>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
                <FaEdit /> Edit Details
              </button>
            </div>
          </div>

          {/* COURSES TABLE */}
          <div className="bg-white rounded-xl border">
            <div className="flex justify-between px-6 py-4 border-b">
              <h3 className="font-semibold">
                Courses Offered
                <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                  {selectedDept.courses.length}
                </span>
              </h3>

              <div className="flex gap-3">
                <input
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  <FaPlus /> Add Course
                </button>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left">Code</th>
                  <th className="px-6 py-3 text-left">Course Name</th>
                  <th className="px-6 py-3 text-center">Credits</th>
                  <th className="px-6 py-3 text-center">Duration</th>
                  <th className="px-6 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-6 py-4">{course.code}</td>
                    <td className="px-6 py-4 font-medium">{course.name}</td>
                    <td className="px-6 py-4 text-center">{course.credits}</td>
                    <td className="px-6 py-4 text-center">{course.duration}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          course.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : course.status === "Review"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Departments;
