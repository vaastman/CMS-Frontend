import React from "react";
import {
  FaUserShield,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaCogs,
} from "react-icons/fa";

const AuditLogs = () => {
  const logs = [
    {
      id: 1,
      action: "Payment Successful",
      module: "Payments",
      user: "Admin",
      icon: <FaMoneyCheckAlt />,
      date: "2025-01-12 10:45 AM",
    },
    {
      id: 2,
      action: "Admission Approved",
      module: "Admissions",
      user: "Admin",
      icon: <FaClipboardList />,
      date: "2025-01-12 09:30 AM",
    },
    {
      id: 3,
      action: "Staff Added",
      module: "Staff",
      user: "Super Admin",
      icon: <FaUserShield />,
      date: "2025-01-11 06:15 PM",
    },
    {
      id: 4,
      action: "Settings Updated",
      module: "System",
      user: "Admin",
      icon: <FaCogs />,
      date: "2025-01-11 03:20 PM",
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
          Audit Logs
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
          Track all administrative and system activities
        </p>
      </div>

      {/* ================= LOG TABLE ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Module</th>
              <th className="p-4 text-left">Performed By</th>
              <th className="p-4 text-left">Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 flex items-center gap-3">
                  <span
                    className="
                      w-9 h-9 rounded-lg
                      flex items-center justify-center
                      bg-[color:var(--color-primary)]
                      text-white
                    "
                  >
                    {log.icon}
                  </span>
                  <span className="font-medium">
                    {log.action}
                  </span>
                </td>

                <td className="p-4">{log.module}</td>
                <td className="p-4">{log.user}</td>
                <td className="p-4">{log.date}</td>
              </tr>
            ))}

            {logs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No audit logs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AuditLogs;
