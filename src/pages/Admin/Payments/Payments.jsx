import { FaCheckCircle } from "react-icons/fa";
import { usePayments } from "../../../context/PaymentContext";

const Payments = () => {
  const { payments, addSuccessfulPayment } = usePayments();

  const handleMockPaymentSuccess = () => {
    addSuccessfulPayment({
      transactionId: `TXN-${Date.now()}`,
      student: "Rohit Kumar",
      course: "B.Sc Computer Science",
      amount: "₹12,000",
      status: "Success",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Payments</h1>

      {/* Mock Success Button */}
      <button
        onClick={handleMockPaymentSuccess}
        className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
      >
        <FaCheckCircle /> Simulate Payment Success
      </button>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Transaction</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="p-4">{p.transactionId}</td>
                <td className="p-4">{p.student}</td>
                <td className="p-4">{p.course}</td>
                <td className="p-4">{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
