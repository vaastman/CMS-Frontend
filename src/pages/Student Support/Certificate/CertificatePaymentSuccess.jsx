import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/api";
import { toast } from "react-toastify";

const CertificatePaymentSuccess = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await api.get(`/payments/public/${paymentId}/status`);
        setPayment(response.data.data.payment);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load payment details");
      } finally {
        setLoading(false);
      }
    };

    if (paymentId) {
      fetchPaymentDetails();
    }
  }, [paymentId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/payments/public/${paymentId}/invoice`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Certificate_Receipt_${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Receipt downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download receipt");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-semibold">
            Payment details not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">Your certificate payment has been processed</p>
        </div>

        {/* Receipt Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Payment Receipt
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <ReceiptItem label="Student Name" value={payment.certificate?.name || "-"} />
            <ReceiptItem
              label="Certificate Type"
              value={payment.certificate?.type || "-"}
            />
            <ReceiptItem
              label="Amount Paid"
              value={`₹${Number(payment.totalAmount).toFixed(2)}`}
              highlight
            />
            <ReceiptItem label="Transaction ID" value={payment.txnId} />
            <ReceiptItem label="Receipt No" value={payment.receiptNo} />
            <ReceiptItem
              label="Payment Date"
              value={new Date(payment.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <ReceiptItem
              label="Payment Mode"
              value={payment.gateway || "-"}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Receipt
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Receipt
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 print:hidden">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your certificate application is now being processed by the admin. 
            You will be able to download your certificate once it's approved.
          </p>
        </div>
      </div>
    </div>
  );
};

const ReceiptItem = ({ label, value, highlight = false }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p
      className={`font-medium ${
        highlight ? "text-xl text-blue-600" : "text-gray-800"
      }`}
    >
      {value || "-"}
    </p>
  </div>
);

export default CertificatePaymentSuccess;
