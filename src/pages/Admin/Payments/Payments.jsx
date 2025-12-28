import { FaCheckCircle, FaSearch, FaRupeeSign } from "react-icons/fa";
import { usePayments } from "../../../context/PaymentContext";

const Payments = () => {
  const { payments, addSuccessfulPayment } = usePayments();

  const handleMockPaymentSuccess = () => {
    addSuccessfulPayment({
      transactionId: `TXN-${Date.now()}`,
      student: "Rohit Kumar",
      course: "B.Sc Computer Science",
      amount: 12000,
      status: "Success",
      date: new Date().toLocaleDateString(),
    });
  };

  const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">
            Payments Overview
          </h1>
          <p className="text-sm text-gray-600">
            Monitor student payments and transaction history
          </p>
        </div>

        <button
          onClick={handleMockPaymentSuccess}
          className="bg-green-600 hover:bg-green-700 transition
            text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm"
        >
          <FaCheckCircle />
          Simulate Payment
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Payments"
          value={payments.length}
          icon={<FaCheckCircle />}
        />
        <StatCard
          title="Successful Payments"
          value={payments.filter(p => p.status === "Success").length}
          icon={<FaCheckCircle />}
          green
        />
        <StatCard
          title="Total Amount"
          value={`₹${totalAmount.toLocaleString()}`}
          icon={<FaRupeeSign />}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl border overflow-hidden">

        {/* Table Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="font-semibold text-[#111827]">Transaction History</h3>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              placeholder="Search student / transaction..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Course</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-400">
                  No payment records available
                </td>
              </tr>
            ) : (
              payments.map((p, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs">
                    {p.transactionId}
                  </td>
                  <td className="px-6 py-4">{p.student}</td>
                  <td className="px-6 py-4">{p.course}</td>
                  <td className="px-6 py-4">{p.date}</td>
                  <td className="px-6 py-4 font-medium">
                    ₹{Number(p.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          p.status === "Success"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon, green }) => (
  <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-1 text-[#111827]">
        {value}
      </h2>
    </div>
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center
        ${green ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
    >
      {icon}
    </div>
  </div>
);

export default Payments;
