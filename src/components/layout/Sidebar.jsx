import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBullhorn,
  FaUserTie,
  FaBook,
  FaFileAlt,
  FaCogs,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Notices", path: "/admin/notices", icon: <FaBullhorn /> },
    { name: "Staff", path: "/admin/staff", icon: <FaUserTie /> },
    { name: "Courses", path: "/admin/courses", icon: <FaBook /> },
    { name: "Examination", path: "/admin/exams", icon: <FaFileAlt /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white hidden md:flex flex-col">
      <div className="p-5 text-xl font-bold border-b border-blue-700">
        SSDM Admin
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded 
               hover:bg-blue-700 transition
               ${isActive ? "bg-blue-700" : ""}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
