// src/pages/Admin/feeManagement/FeeHistory.jsx

const FeeHistory = () => {
  const data = [
    { id: 1, student: "Rahul Sharma", amount: 15000, mode: "CASH" },
    { id: 2, student: "Priya Singh", amount: 18000, mode: "ONLINE" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[color:var(--color-primary)]">
        Fee History
      </h2>

      <div className="bg-white border rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Mode</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{row.student}</td>
                <td className="p-3">₹{row.amount}</td>
                <td className="p-3">{row.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeHistory;