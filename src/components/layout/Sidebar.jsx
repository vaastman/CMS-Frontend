import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaFileAlt,
  FaMoneyCheckAlt,
  FaReceipt,
  FaUserTie,
  FaBook,
  FaBullhorn,
  FaUniversity,
  FaCogs,
  FaHistory,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    /* ===== CORE ===== */
    {
      section: "Core",
      items: [
        {
          name: "Dashboard",
          path: "/admin",
          icon: <FaTachometerAlt />,
        },
      ],
    },

    /* ===== ADMISSIONS FLOW ===== */
    {
      section: "Admissions",
      items: [
        {
          name: "Applications",
          path: "/admin/admissions",
          icon: <FaClipboardList />,
        },
        // {
        //   name: "Document Verification",
        //   path: "/admin/admissions",
        //   icon: <FaFileAlt />,
        // },
      ],
    },

    /* ===== FINANCE ===== */
    {
      section: "Finance",
      items: [
        {
          name: "Payments",
          path: "/admin/payments",
          icon: <FaMoneyCheckAlt />,
        },
        {
          name: "Receipts",
          path: "/admin/receipts",
          icon: <FaReceipt />,
        },
      ],
    },

    /* ===== ACADEMICS ===== */
    {
      section: "Academics",
      items: [
        {
          name: "Departments",
          path: "/admin/departments",
          icon: <FaUniversity />,
        },
        {
          name: "Staff",
          path: "/admin/staff",
          icon: <FaUserTie />,
        },
        {
          name: "Courses",
          path: "/admin/courses",
          icon: <FaBook />,
        },
        {
          name: "Examinations",
          path: "/admin/exams",
          icon: <FaFileAlt />,
        },
      ],
    },

    /* ===== COMMUNICATION ===== */
    {
      section: "Communication",
      items: [
        {
          name: "Notices",
          path: "/admin/notices",
          icon: <FaBullhorn />,
        },
      ],
    },

    /* ===== SYSTEM ===== */
    {
      section: "System",
      items: [
        {
          name: "Audit Logs",
          path: "/admin/audit-logs",
          icon: <FaHistory />,
        },
        {
          name: "Settings",
          path: "/admin/settings",
          icon: <FaCogs />,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col bg-[color:var(--color-primary)] text-white">

      {/* Logo (Fixed) */}
      <div className="px-6 py-5 text-xl font-semibold border-b border-white/20 shrink-0">
        SSDM Admin
      </div>

      {/* Scrollable Menu ONLY */}
      <nav className="flex-1 px-4 py-4 space-y-6 text-sm overflow-y-auto no-scrollbar">
        {menu.map((group, i) => (
          <div key={i}>
            <p className="px-3 mb-2 text-xs uppercase tracking-wide text-white/60">
              {group.section}
            </p>

            <div className="space-y-1">
              {group.items.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `
                  flex items-center gap-3 px-4 py-2.5 rounded-lg transition
                  ${isActive
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
            </div>
          </div>
        ))}
      </nav>

      {/* Footer (Fixed) */}
      <div className="px-6 py-4 border-t border-white/20 text-xs text-white/70 shrink-0">
        © {new Date().getFullYear()} SSDM College
      </div>
    </aside>


  );
};

export default Sidebar;
