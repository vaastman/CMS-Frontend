import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaDownload, FaHome } from "react-icons/fa";
import logo from "../../assets/nm_logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getPaymentStatus } from "@/api/payment.api";

const PaymentProcessing = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const status = params.get("status");
  const paymentId = params.get("paymentId");

  const success = status === "SUCCESS";

  const student = JSON.parse(localStorage.getItem("verifiedStudent") || "{}");

  const [amount, setAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(true);

  /* ================= FETCH PAYMENT ================= */

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await getPaymentStatus(paymentId);
        const payment = res?.data?.payment || res?.payment || res;

        if (payment) {
          setAmount(Number(payment.totalAmount || 0));
          setTransactionId(payment.transactionId || payment.txnId || payment.id);
        }

      } catch (err) {
        console.error("Failed to fetch payment:", err);
      } finally {
        setLoadingPayment(false);
      }
    };

    if (paymentId) fetchPayment();

  }, [paymentId]);

  /* ================= DOWNLOAD RECEIPT ================= */

  const downloadReceipt = () => {

    const doc = new jsPDF();

    /* HEADER */

    doc.addImage(logo, "PNG", 15, 10, 25, 25);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SANT SANDHYA DAS MAHILA COLLEGE", 105, 18, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Barh, Patna, Bihar", 105, 25, { align: "center" });

    doc.text("Official Admission Payment Receipt", 105, 32, { align: "center" });

    doc.line(15, 38, 195, 38);

    /* RECEIPT DETAILS */

    doc.setFontSize(12);

    doc.text(`Receipt Date   : ${new Date().toLocaleDateString()}`, 15, 50);
    doc.text(`Transaction ID : ${transactionId || paymentId}`, 15, 58);
    doc.text(`Father Name    : ${student.fatherName || "-"}`, 15, 66);

    /* STUDENT TABLE */

    autoTable(doc, {
      startY: 75,
      theme: "grid",
      head: [["Field", "Details"]],
      body: [
        ["Student Name", student.name || "-"],
        ["Father Name", student.fatherName || "-"],
        ["Course", student.course?.name || "-"],
        ["Session", student.session?.name || "-"],
        ["Transaction ID", transactionId || paymentId],
        ["Amount Paid", `INR ${amount}`],
        ["Payment Status", status]
      ],
      styles: {
        fontSize: 11
      },
      headStyles: {
        fillColor: [11, 58, 111]
      }
    });

    /* FOOTER */

    const finalY = doc.lastAutoTable.finalY;

    doc.setFontSize(10);

    doc.text(
      "This is a computer generated receipt. No signature required.",
      105,
      finalY + 20,
      { align: "center" }
    );

    doc.text(
      "Thank you for completing your admission payment.",
      105,
      finalY + 26,
      { align: "center" }
    );

    doc.save(`payment_receipt_${transactionId || paymentId}.pdf`);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-page)] p-6">

      <div className="bg-[var(--color-surface)] w-full max-w-xl rounded-2xl shadow-xl border border-[var(--color-divider)] p-10">

        {/* STATUS ICON */}

        <div className="flex justify-center mb-6">
          {success ? (
            <div className="bg-[var(--color-success)]/10 p-4 rounded-full">
              <FaCheckCircle className="text-[var(--color-success)] text-5xl" />
            </div>
          ) : (
            <div className="bg-[var(--color-danger)]/10 p-4 rounded-full">
              <FaTimesCircle className="text-[var(--color-danger)] text-5xl" />
            </div>
          )}
        </div>

        {/* TITLE */}

        <h1 className="text-3xl font-bold text-center text-[var(--color-text-primary)] mb-2">
          {success ? "Payment Successful" : "Payment Failed"}
        </h1>

        <p className="text-center text-[var(--color-text-secondary)] mb-8">
          {success
            ? "Your admission payment has been successfully processed."
            : "We couldn't process your payment. Please try again."}
        </p>

        {/* PAYMENT DETAILS */}

        {success && (
          <div className="bg-[var(--color-page)] border border-[var(--color-divider)] rounded-xl p-6 mb-8">

            <h3 className="font-semibold text-[var(--color-primary)] mb-4">
              Payment Details
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Student Name</span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {student.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Father Name</span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {student.fatherName || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Course</span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {student.course?.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Session</span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {student.session?.name}
                </span>
              </div>

              <div className="border-t border-[var(--color-divider)] pt-3 mt-3"></div>

              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Transaction ID</span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {transactionId || paymentId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Amount Paid</span>
                <span className="font-semibold text-[var(--color-primary)]">
                  {loadingPayment ? "Loading..." : `₹${amount.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Date</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

            </div>

          </div>
        )}

        {/* ACTION BUTTONS */}

        <div className="flex justify-center gap-4">

          {success && (
            <button
              onClick={downloadReceipt}
              className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition"
            >
              <FaDownload />
              Download Receipt
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 border border-[var(--color-border)] px-5 py-2.5 rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-page)] transition"
          >
            <FaHome />
            Go Home
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentProcessing;
