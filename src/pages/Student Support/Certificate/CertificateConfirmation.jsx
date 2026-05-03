import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createCertificatePayment } from "@/api/certificate.api";
import { toast } from "react-toastify";

const CertificateConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const { certificateId, certificateData, amount } = location.state || {};

  if (!certificateId || !certificateData) {
    navigate("/apply-certificate");
    return null;
  }

  const handleConfirmPayment = async () => {
    try {
      setProcessing(true);

      const response = await createCertificatePayment({ certificateId });

      toast.success("Redirecting to payment gateway...");

      // Redirect to payment gateway
      const { paymentUrl } = response.data;
      window.location.href = paymentUrl;
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Payment initiation failed"
      );
      setProcessing(false);
    }
  };

  const handleEdit = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Confirm Certificate Application
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please review your details before proceeding to payment
        </p>

        {/* Summary Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Application Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <SummaryItem label="Student Name" value={certificateData.name} />
            <SummaryItem
              label="Father's Name"
              value={certificateData.fatherName}
            />
            {certificateData.motherName && (
              <SummaryItem
                label="Mother's Name"
                value={certificateData.motherName}
              />
            )}
            <SummaryItem
              label="Certificate Type"
              value={certificateData.certificateType}
            />
            <SummaryItem label="Course" value={certificateData.courseName} />
            <SummaryItem
              label="Department"
              value={certificateData.departmentName}
            />
            <SummaryItem label="Semester" value={certificateData.semester} />
            <SummaryItem label="Session" value={certificateData.session} />
            {certificateData.universityRoll && (
              <SummaryItem
                label="University Roll"
                value={certificateData.universityRoll}
              />
            )}
            {certificateData.registrationNo && (
              <SummaryItem
                label="Registration No"
                value={certificateData.registrationNo}
              />
            )}
          </div>
        </div>

        {/* Payment Amount */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Amount to Pay</p>
              <p className="text-3xl font-bold text-blue-600">₹{amount}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm">Certificate Type</p>
              <p className="text-lg font-semibold text-gray-800">
                {certificateData.certificateType}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleEdit}
            disabled={processing}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold transition duration-200"
          >
            ← Edit Details
          </button>
          <button
            onClick={handleConfirmPayment}
            disabled={processing}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              `Confirm & Pay ₹${amount}`
            )}
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> You will be redirected to the secure payment
            gateway to complete your payment. After successful payment, you can
            download your receipt.
          </p>
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="font-medium text-gray-800">{value || "-"}</p>
  </div>
);

export default CertificateConfirmation;
