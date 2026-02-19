import { useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
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
  FaGlobe,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);


  const handleLogoutConfirm = async() => {
   await logout(); // 🔐 clear auth
   setShowLogoutConfirm(false);
    navigate("/admin/login", { replace: true });
  };

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
        //   path: "/admin/admissions/verify-documents",
        //   icon: <FaFileAlt />,
        // },
        //        {
        //   name: "Add & Admit Student",
        //   path: "/admin/admissions/add-student",
        //   icon: <FaUserTie />,
        // }

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
        {
          name: "DCR1",
          path: "/admin/dcr1",
          icon: <FaReceipt />,
        },
        {
          name: "DCR2",
          path: "/admin/dcr2",
          icon: <FaReceipt />,
        },
        // {
        //   name: "DCR Section",
        //   path: "/admin/dcr-section",
        //   icon: <FaReceipt />,
        // },
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
          name: "Students",
          path: "/admin/students",
          icon: <FaUserTie />,
        },
        {
          name: "Courses",
          path: "/admin/courses",
          icon: <FaBook />,
        },
        {
          name: "Add Subjects",
          path: "/admin/add-subjects",
          icon: <FaFileAlt />,
        },
        {
          name: "Assign Subjects",
          path: "/admin/assign-subjects",
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
        {
          name: "Sessions",
          path: "/admin/sessions",
          icon: <FaGlobe />,
        },
      ],
    },
/* ===== CMS / WEBSITE ===== */
{
  section: "CMS / Website",
  items: [
   
    {
      name: "Add Gallery",
      path: "/admin/cms/gallery/create",
      icon: <FaFileAlt />,
    },
    {
      name: "Add News",
      path: "/admin/cms/news/create",
      icon: <FaBullhorn />,
    },
    
    {
      name: "Add Notice",
      path: "/admin/cms/notices/create",
      icon: <FaClipboardList />,
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
      <div className="px-6 py-4 border-t border-white/20 shrink-0">
        <div className="flex items-center justify-between">

          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="leading-tight">
              <h4 className="text-sm font-semibold text-white">
                {admin?.username || "Admin"}
              </h4>
              <p className="text-xs text-white/70">
                Super Admin
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="text-white/70 hover:text-red-400 transition"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>

        </div>
      </div>
      <ConfirmDialog
        open={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutConfirm}
      />


    </aside>


  );
};

export default Sidebar;
