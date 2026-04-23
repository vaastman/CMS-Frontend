import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaHome,
  FaRedo,
  FaInfoCircle,
} from "react-icons/fa";
import logo from "../../assets/nm_logo.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getPaymentStatus } from "@/api/payment.api";

const VALID_PAYMENT_STATUSES = new Set(["SUCCESS", "FAILED", "INITIATED", "PENDING", "REFUNDED"]);

const PaymentProcessing = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  const rawStatus = params.get("status");
  const status = VALID_PAYMENT_STATUSES.has(rawStatus) ? rawStatus : null;
  const paymentId = params.get("paymentId");
  const fallbackTxnId = params.get("txnId") || "";

  const student = JSON.parse(localStorage.getItem("verifiedStudent") || "{}");

  const [amount, setAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [gatewayReference, setGatewayReference] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [invalidLink, setInvalidLink] = useState(false);
  const [screenMessage, setScreenMessage] = useState("");

  const retryPayment = () => {
    const studentId = student.id || student.studentId;

    if (studentId) {
      navigate(`/student/details/${studentId}`);
      return;
    }

    navigate("/");
  };

  /* ================= FETCH PAYMENT ================= */

  useEffect(() => {
    if (!paymentId) {
      setInvalidLink(true);
      setScreenMessage("This payment link is incomplete or invalid.");
      setLoadingPayment(false);
      return;
    }

    const fetchPayment = async () => {
      try {
        const res = await getPaymentStatus(paymentId);
        const payment = res?.data?.payment || res?.payment || res;

        if (payment) {
          const actualStatus = payment.status || "";

          setAmount(Number(payment.totalAmount || 0));
          setTransactionId(
            payment.transactionId || payment.txnId || fallbackTxnId || payment.id
          );
          setGatewayReference(payment.referenceNo || payment.bankTxnNo || "");
          setPaymentStatus(actualStatus);

          // Check if this is a certificate payment
          if (payment.certificateId) {
            // Redirect to certificate-specific pages
            if (actualStatus === "SUCCESS") {
              navigate(`/certificate/payment-success/${paymentId}`, { replace: true });
            } else if (actualStatus === "FAILED") {
              navigate("/certificate/payment-result", {
                state: { status: "failed", paymentId },
                replace: true,
              });
            }
            return;
          }

          if (status && actualStatus && status !== actualStatus) {
            setInvalidLink(true);
            setScreenMessage("This payment link looks modified. Please use the original payment redirect.");
            return;
          }

          setInvalidLink(false);
          setScreenMessage("");
        }

      } catch (err) {
        console.error("Failed to fetch payment:", err);
        setTransactionId((currentTxnId) => currentTxnId || fallbackTxnId || paymentId || "");
        setInvalidLink(true);
        setScreenMessage(
          err?.response?.status === 404
            ? "This payment record was not found."
            : "We could not verify this payment link right now."
        );
      } finally {
        setLoadingPayment(false);
      }
    };

    fetchPayment();

  }, [fallbackTxnId, navigate, paymentId, status]);

  const success = !invalidLink && paymentStatus === "SUCCESS";
  const showFailureState = !invalidLink && !loadingPayment && paymentStatus && paymentStatus !== "SUCCESS";

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
          {invalidLink ? (
            <div className="bg-amber-100 p-4 rounded-full">
              <FaInfoCircle className="text-amber-600 text-5xl" />
            </div>
          ) : success ? (
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
          {invalidLink
            ? "Invalid Payment Link"
            : success
              ? "Payment Successful"
              : "Payment Failed"}
        </h1>

        <p className="text-center text-[var(--color-text-secondary)] mb-8">
          {invalidLink
            ? screenMessage || "This payment URL is not valid anymore."
            : success
            ? "Your admission payment has been successfully processed."
            : "The payment window was closed or the transaction was not completed. You can retry safely."}
        </p>

        {/* PAYMENT DETAILS */}

        {!invalidLink && (
          <div className="bg-[var(--color-page)] border border-[var(--color-divider)] rounded-xl p-6 mb-8">

            <h3 className="font-semibold text-[var(--color-primary)] mb-4">
              {success ? "Payment Details" : "Payment Attempt Details"}
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between gap-4">
                <span className="text-[var(--color-text-secondary)]">Student Name</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right">
                  {student.name || "-"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[var(--color-text-secondary)]">Father Name</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right">
                  {student.fatherName || "-"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[var(--color-text-secondary)]">Course</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right">
                  {student.course?.name || "-"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[var(--color-text-secondary)]">Session</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right">
                  {student.session?.name || "-"}
                </span>
              </div>

              <div className="border-t border-[var(--color-divider)] pt-3 mt-3"></div>

              <div className="flex justify-between gap-4">
                <span className="text-[var(--color-text-secondary)]">Transaction ID</span>
                <span className="font-medium text-[var(--color-text-primary)] text-right break-all">
                  {transactionId || paymentId || "-"}
                </span>
              </div>

              {showFailureState && (
                <div className="flex justify-between gap-4">
                  <span className="text-[var(--color-text-secondary)]">Payment Status</span>
                  <span className="font-semibold text-[var(--color-danger)] text-right">
                    {paymentStatus}
                  </span>
                </div>
              )}

              {gatewayReference && (
                <div className="flex justify-between gap-4">
                  <span className="text-[var(--color-text-secondary)]">Gateway Reference</span>
                  <span className="font-medium text-[var(--color-text-primary)] text-right break-all">
                    {gatewayReference}
                  </span>
                </div>
              )}

              <div className="flex justify-between gap-4">
                <span className="text-[var(--color-text-secondary)]">
                  {success ? "Amount Paid" : "Attempted Amount"}
                </span>
                <span className="font-semibold text-[var(--color-primary)] text-right">
                  {loadingPayment ? "Loading..." : `₹${amount.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[var(--color-text-secondary)]">Date</span>
                <span className="font-medium text-right">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

            </div>
          </div>
        )}

        {showFailureState && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <FaInfoCircle />
              Need help?
            </div>
            <p>
              If you closed the payment gateway or cancelled the transaction, this failed status is expected.
              If money was debited but this page still shows failed, keep the Transaction ID and contact support.
            </p>
          </div>
        )}

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap justify-center gap-4">

          {success && (
            <button
              onClick={downloadReceipt}
              className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition"
            >
              <FaDownload />
              Download Receipt
            </button>
          )}

          {showFailureState && (
            <button
              onClick={retryPayment}
              className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition"
            >
              <FaRedo />
              Retry Payment
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
