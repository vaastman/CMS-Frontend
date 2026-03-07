import React from "react";

const PaymentSummary = ({
  title = "Payment Summary",
  admissionId,
  studentName,
  feeBreakdown = [],
  onPay,
  loading = false
}) => {

  const total = feeBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        {admissionId && (
          <p className="text-sm text-slate-500 mt-1">
            Admission ID: <span className="font-semibold">{admissionId}</span>
          </p>
        )}

        {studentName && (
          <p className="text-sm text-slate-500">
            Student: <span className="font-semibold">{studentName}</span>
          </p>
        )}
      </div>

      {/* Fee Breakdown */}
      <div className="space-y-3">

        {feeBreakdown.map((fee, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="text-slate-600">{fee.head}</span>

            <span className="font-semibold text-slate-800">
              ₹{fee.amount.toLocaleString("en-IN")}
            </span>
          </div>
        ))}

      </div>

      {/* Total */}
      <div className="flex justify-between items-center border-t pt-4">

        <span className="font-bold text-lg text-slate-800">
          Total
        </span>

        <span className="text-xl font-bold text-green-600">
          ₹{total.toLocaleString("en-IN")}
        </span>

      </div>

      {/* Pay Button */}
      {onPay && (
        <button
          onClick={onPay}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${total.toLocaleString("en-IN")}`}
        </button>
      )}

    </div>
  );
};

export default PaymentSummary;