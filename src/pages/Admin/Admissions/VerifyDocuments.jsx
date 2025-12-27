import React from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";

const VerifyDocuments = () => {
  const documents = [
    {
      name: "Aadhar Card",
      status: "PENDING",
    },
    {
      name: "10+2 Marksheet",
      status: "PENDING",
    },
    {
      name: "Passport Size Photo",
      status: "PENDING",
    },
  ];

  const statusBadge = (status) => {
    if (status === "APPROVED")
      return "bg-green-100 text-green-700";
    if (status === "REJECTED")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
          Document Verification
        </h1>
        <p className="text-sm text-[color:var(--color-text-secondary)] mt-1">
          Verify uploaded documents before approving the application
        </p>
      </div>

      {/* ================= DOCUMENT LIST ================= */}
      <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6 space-y-4">
        {documents.map((doc, i) => (
          <div
            key={i}
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-4
              border rounded-xl p-4
            "
          >
            {/* Document Info */}
            <div className="flex items-center gap-3">
              <span
                className="
                  w-10 h-10 rounded-lg
                  flex items-center justify-center
                  bg-[color:var(--color-primary)]
                  text-white
                "
              >
                <FaFileAlt />
              </span>

              <div>
                <p className="font-medium">
                  {doc.name}
                </p>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${statusBadge(
                    doc.status
                  )}`}
                >
                  {doc.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="
                  flex items-center gap-2
                  px-3 py-2 rounded-lg
                  border text-sm
                  hover:bg-gray-100
                "
              >
                <FaEye />
                View
              </button>

              <button
                className="
                  flex items-center gap-2
                  px-3 py-2 rounded-lg
                  bg-green-600 text-white text-sm
                  hover:bg-green-700
                "
              >
                <FaCheckCircle />
                Approve
              </button>

              <button
                className="
                  flex items-center gap-2
                  px-3 py-2 rounded-lg
                  bg-red-600 text-white text-sm
                  hover:bg-red-700
                "
              >
                <FaTimesCircle />
                Reject
              </button>
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No documents uploaded.
          </p>
        )}
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="text-xs text-gray-500">
        All actions will be recorded in audit logs.
      </div>

    </div>
  );
};

export default VerifyDocuments;
