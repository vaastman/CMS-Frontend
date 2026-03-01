import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUniversity, FaCreditCard, FaMobileAlt } from "react-icons/fa";

const PaymentGatewayMock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  // 🔥 Get fee from localStorage
  const saved = localStorage.getItem("verifiedStudent");
  const student = saved ? JSON.parse(saved) : null;

  const totalAmount = student?.lastAdmission?.feeAmount || 0;

  const handlePay = () => {
    setLoading(true);

    setTimeout(() => {
      if (student) {
        student.lastAdmission = {
          ...student.lastAdmission,
          paymentStatus: "SUCCESS"
        };

        localStorage.setItem("verifiedStudent", JSON.stringify(student));
      }

      navigate(`/student/details/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-slate-600">
              <FaArrowLeft />
            </button>
            <h1 className="text-2xl font-bold">Secure Payment</h1>
          </div>
          <span className="text-sm bg-slate-200 px-4 py-2 rounded-full">
            100% Secure
          </span>
        </div>

        <div className="grid grid-cols-3 min-h-[500px]">

          {/* LEFT */}
          <div className="col-span-2 border-r p-8 space-y-6">

            {/* UPI */}
            <div className="border rounded-xl p-6">
              <div className="flex justify-between cursor-pointer"
                onClick={() => setMethod("UPI")}>
                <div className="flex items-center gap-3">
                  <FaMobileAlt />
                  <h2 className="font-semibold text-lg">UPI</h2>
                </div>
              </div>

              {method === "UPI" && (
                <div className="mt-4 space-y-4">
                  <input placeholder="Enter UPI ID"
                    className="w-full border p-3 rounded-lg" />
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full bg-slate-800 text-white py-3 rounded-xl font-semibold"
                  >
                    {loading ? "Processing..." : `Pay ₹${totalAmount}`}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-1 bg-slate-50 p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayMock;