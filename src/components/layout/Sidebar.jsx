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
    <aside
      className="
        w-64 min-h-screen hidden md:flex flex-col
        bg-[color:var(--color-primary)] text-white
      "
    >
      {/* ===== LOGO / TITLE ===== */}
      <div className="px-6 py-5 text-xl font-semibold border-b border-white/20">
        SSDM Admin
      </div>

      {/* ===== NAV ===== */}
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            end
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10"
              }
            `
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* ===== FOOTER ===== */}
      <div className="px-6 py-4 border-t border-white/20 text-xs text-white/70">
        © {new Date().getFullYear()} SSDM College
      </div>
    </aside>
  );
};

export default Sidebar;
