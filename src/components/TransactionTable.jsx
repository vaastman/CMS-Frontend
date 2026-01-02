import { useState } from "react";

const TransactionTable = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (txn) =>
      txn.student.toLowerCase().includes(search.toLowerCase()) ||
      txn.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="rounded-2xl shadow-sm p-6"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Transaction History
        </h3>

        <input
          type="text"
          placeholder="Search by Name / ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border outline-none"
          style={{
            borderColor: "var(--color-divider)",
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead
            style={{ backgroundColor: "var(--color-page)" }}
          >
            <tr>
              <th className="p-3 text-left">Txn ID</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Mode</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((txn) => (
              <tr
                key={txn.id}
                className="border-b hover:bg-gray-50"
                style={{ borderColor: "var(--color-divider)" }}
              >
                <td className="p-3">{txn.id}</td>
                <td className="p-3">{txn.student}</td>
                <td className="p-3">{txn.date}</td>
                <td className="p-3 font-medium">
                  ₹ {txn.amount}
                </td>
                <td className="p-3">{txn.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
