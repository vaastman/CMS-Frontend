import { FaFilePdf, FaSearch, FaReceipt, FaRupeeSign } from "react-icons/fa";
import { usePayments } from "../../../context/PaymentContext";
import jsPDF from "jspdf";

const Receipts = () => {
  const { receipts } = usePayments();

  const totalAmount = receipts.reduce(
    (sum, r) => sum + Number(r.amount || 0),
    0
  );
/* ================= PROFESSIONAL PDF GENERATION ================= */
const generatePDF = (receipt) => {
  const doc = new jsPDF();

  /* ===== COLORS ===== */
  const primaryColor = [22, 78, 99];   // Dark blue
  const lightGray = [245, 247, 250];

  /* ===== HEADER ===== */
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("PAYMENT RECEIPT", 105, 18, { align: "center" });

  doc.setFontSize(11);
  doc.text("College ERP Management System", 105, 26, { align: "center" });

  /* ===== BODY BACKGROUND ===== */
  doc.setFillColor(...lightGray);
  doc.rect(15, 40, 180, 105, "F");

  doc.setTextColor(0, 0, 0);

  /* ===== RECEIPT DETAILS ===== */
  doc.setFontSize(11);
  doc.text("Receipt Details", 20, 50);
  doc.line(20, 52, 80, 52);

  doc.text(`Receipt No`, 20, 62);
  doc.text(`Transaction ID`, 20, 72);
  doc.text(`Date`, 20, 82);

  doc.text(`: ${receipt.receiptId}`, 80, 62);
  doc.text(`: ${receipt.transactionId}`, 80, 72);
  doc.text(`: ${receipt.date}`, 80, 82);

  /* ===== STUDENT DETAILS ===== */
  doc.text("Student Information", 20, 98);
  doc.line(20, 100, 95, 100);

  doc.text(`Student Name`, 20, 110);
  doc.text(`Course`, 20, 120);

  doc.text(`: ${receipt.student}`, 80, 110);
  doc.text(`: ${receipt.course}`, 80, 120);

  /* ===== AMOUNT BOX ===== */
  doc.setFillColor(255, 255, 255);
  doc.rect(115, 55, 70, 45, "F");

  doc.setFontSize(11);
  doc.text("Amount Paid", 150, 65, { align: "center" });

  doc.setFontSize(18);
  doc.setTextColor(22, 163, 74); // green
  doc.text(
    `₹ ${Number(receipt.amount).toLocaleString()}`,
    150,
    85,
    { align: "center" }
  );

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text("INR", 150, 92, { align: "center" });

  /* ===== STATUS BADGE ===== */
  doc.setFillColor(22, 163, 74);
  doc.roundedRect(115, 105, 70, 12, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text("PAYMENT SUCCESSFUL", 150, 113, { align: "center" });

  /* ===== FOOTER ===== */
  doc.setTextColor(120);
  doc.setFontSize(9);
  doc.line(15, 155, 195, 155);
  doc.text(
    "This is a system-generated receipt. No physical signature is required.",
    105,
    165,
    { align: "center" }
  );

  doc.save(`Receipt_${receipt.receiptId}.pdf`);
};

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">
          Receipts
        </h1>
        <p className="text-sm text-gray-600">
          View and download generated payment receipts
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard
          title="Total Receipts"
          value={receipts.length}
          icon={<FaReceipt />}
        />
        <StatCard
          title="Total Amount"
          value={`₹${totalAmount.toLocaleString()}`}
          icon={<FaRupeeSign />}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold">Receipt Records</h3>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              placeholder="Search receipt / student..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Receipt No</th>
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Course</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-center">PDF</th>
            </tr>
          </thead>

          <tbody>
            {receipts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-400">
                  No receipts generated yet
                </td>
            </tr>
            ) : (
              receipts.map((r, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs">{r.receiptId}</td>
                  <td className="px-6 py-4 font-mono text-xs">{r.transactionId}</td>
                  <td className="px-6 py-4">{r.student}</td>
                  <td className="px-6 py-4">{r.course}</td>
                  <td className="px-6 py-4">{r.date}</td>
                  <td className="px-6 py-4 font-medium">
                    ₹{Number(r.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => generatePDF(r)}
                      title="Download Receipt"
                      className="w-9 h-9 rounded-lg
                        bg-red-50 text-red-600
                        hover:bg-red-100 transition
                        flex items-center justify-center"
                    >
                      <FaFilePdf />
                    </button>
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

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-1 text-[#111827]">
        {value}
      </h2>
    </div>
    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
      {icon}
    </div>
  </div>
);

export default Receipts;
