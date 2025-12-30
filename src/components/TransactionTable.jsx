import { useState } from "react";

const TransactionTable = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(txn =>
    txn.student.toLowerCase().includes(search.toLowerCase()) ||
    txn.id.includes(search)
  );

  return (
    <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <input
          type="text"
          placeholder="Search by Name / ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
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
              <tr key={txn.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{txn.id}</td>
                <td className="p-3">{txn.student}</td>
                <td className="p-3">{txn.date}</td>
                <td className="p-3 font-medium">₹ {txn.amount}</td>
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
