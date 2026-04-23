import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { toast } from "react-toastify";

const CertificatePaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get("paymentId");
    const status = searchParams.get("status");

    if (!paymentId) {
      toast.error("Invalid payment link");
      navigate("/apply-certificate");
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const response = await api.get(`/payments/public/${paymentId}/status`);
        setPayment(response.data.data.payment);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load payment status");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [location, navigate]);

  const handleTryAgain = () => {
    if (payment?.certificateId) {
      navigate("/certificate/confirmation", {
        state: {
          certificateId: payment.certificateId,
          certificateData: payment.certificate || {},
          amount: Number(payment.totalAmount),
        },
      });
    } else {
      navigate("/apply-certificate");
    }
  };

  const handleContactAdmin = () => {
    navigate("/contact");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment status...</p>
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

  const isFailed = payment.status === "FAILED";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Failed Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            Your certificate payment could not be processed
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Payment Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Transaction ID" value={payment.txnId} />
            <DetailItem
              label="Amount"
              value={`₹${Number(payment.totalAmount).toFixed(2)}`}
            />
            <DetailItem label="Receipt No" value={payment.receiptNo} />
            <DetailItem
              label="Date"
              value={new Date(payment.createdAt).toLocaleDateString("en-IN")}
            />
          </div>
        </div>

        {/* Warning Message */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> If your payment was deducted but shows as failed, 
                please contact the college with your transaction details. The amount will be 
                refunded to your account within 5-7 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleContactAdmin}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition duration-200"
          >
            Contact College
          </button>
          <button
            onClick={handleTryAgain}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-medium text-gray-800">{value || "-"}</p>
  </div>
);

export default CertificatePaymentResult;
