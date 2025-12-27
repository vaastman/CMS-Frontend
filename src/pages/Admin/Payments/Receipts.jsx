import { FaFilePdf } from "react-icons/fa";
import { usePayments } from "../../../context/PaymentContext";

const Receipts = () => {
  const { receipts } = usePayments();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Receipts</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Receipt No</th>
              <th className="p-4 text-left">Transaction</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">PDF</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-4">{r.receiptId}</td>
                <td className="p-4">{r.transactionId}</td>
                <td className="p-4">{r.student}</td>
                <td className="p-4">{r.course}</td>
                <td className="p-4">{r.amount}</td>
                <td className="p-4">{r.date}</td>
                <td className="p-4 text-center text-red-600">
                  <FaFilePdf />
                </td>
              </tr>
            ))}

            {receipts.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No receipts generated yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Receipts;
