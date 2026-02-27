import { useState } from "react";

const TransactionTable = ({ data = [] }) => {
  const [search, setSearch] = useState("");

  // 🔎 Improved Search (Student Name, Txn ID, Admission No)
  const filteredData = data.filter((txn) =>
    txn.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    txn.id?.toLowerCase().includes(search.toLowerCase()) ||
    txn.admissionNo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="rounded-2xl shadow-sm p-6"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h3 className="text-lg font-semibold">
          Admission Payment Transactions
        </h3>

        <input
          type="text"
          placeholder="Search by Name / Admission No / Txn ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border outline-none w-64"
          style={{ borderColor: "var(--color-divider)" }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "var(--color-page)" }}>
            <tr>
              <th className="p-3 text-left">Txn ID</th>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Admission No</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Semester</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Mode</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b hover:bg-gray-50 transition"
                  style={{ borderColor: "var(--color-divider)" }}
                >
                  <td className="p-3">{txn.id}</td>
                  <td className="p-3 font-medium">{txn.studentName}</td>
                  <td className="p-3">{txn.admissionNo}</td>
                  <td className="p-3">{txn.course}</td>
                  <td className="p-3">{txn.semester}</td>
                  <td className="p-3">{txn.date}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ₹ {txn.amount?.toLocaleString()}
                  </td>
                  <td className="p-3">{txn.paymentMode}</td>

                  {/* Status Badge */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        txn.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : txn.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;