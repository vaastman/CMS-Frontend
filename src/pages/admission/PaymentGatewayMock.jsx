import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUniversity,
  FaCreditCard,
  FaMobileAlt,
} from "react-icons/fa";

const PaymentGatewayMock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= TEMPORARY STATIC DATA ================= */
  const ADMISSION_FEE = 3250;
  const PRACTICAL_FEE = 600;

  const PRACTICAL_SUBJECTS = [
    "phy",
    "chem",
    "bio",
    "bot",
    "zool",
    "homesci",
    "psychology",
  ];

  /* ================= STATES ================= */
  const [method, setMethod] = useState("UPI");
  const [selectedSubject, setSelectedSubject] = useState("phy");
  const [loading, setLoading] = useState(false);

  const isPractical = PRACTICAL_SUBJECTS.includes(
    selectedSubject.toLowerCase()
  );

  const totalAmount = ADMISSION_FEE + (isPractical ? PRACTICAL_FEE : 0);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/student/admission/${id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-slate-600 hover:text-black"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-2xl font-bold">Secure Payment</h1>
          </div>
          <span className="text-sm bg-slate-200 px-4 py-2 rounded-full">
            100% Secure
          </span>
        </div>

        <div className="grid grid-cols-3 min-h-[500px]">

          {/* LEFT SIDE */}
          <div className="col-span-2 border-r p-8 space-y-6">

            {/* Subject Selection */}
            {/* <div className="border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">
                Select Practical Subject
              </h2>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border p-3 rounded-lg"
              >
                {PRACTICAL_SUBJECTS.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub.toUpperCase()}
                  </option>
                ))}
              </select>
            </div> */}

            {/* UPI */}
            <div className="border rounded-xl p-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setMethod("UPI")}
              >
                <div className="flex items-center gap-3">
                  <FaMobileAlt />
                  <h2 className="font-semibold text-lg">UPI</h2>
                </div>
                <span>{method === "UPI" ? "−" : "+"}</span>
              </div>

              {method === "UPI" && (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    className="w-full border p-3 rounded-lg"
                  />
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full bg-slate-800 hover:bg-black text-white py-3 rounded-xl font-semibold"
                  >
                    {loading ? "Processing..." : `Pay ₹${totalAmount}`}
                  </button>
                </div>
              )}
            </div>

            {/* Card */}
            <div className="border rounded-xl p-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setMethod("CARD")}
              >
                <div className="flex items-center gap-3">
                  <FaCreditCard />
                  <h2 className="font-semibold text-lg">
                    Credit / Debit Card
                  </h2>
                </div>
                <span>{method === "CARD" ? "−" : "+"}</span>
              </div>

              {method === "CARD" && (
                <div className="mt-4 space-y-4">
                  <input
                    placeholder="Card Number"
                    className="w-full border p-3 rounded-lg"
                  />
                  <div className="flex gap-4">
                    <input
                      placeholder="MM/YY"
                      className="w-1/2 border p-3 rounded-lg"
                    />
                    <input
                      placeholder="CVV"
                      className="w-1/2 border p-3 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full bg-slate-800 hover:bg-black text-white py-3 rounded-xl font-semibold"
                  >
                    {loading ? "Processing..." : `Pay ₹${totalAmount}`}
                  </button>
                </div>
              )}
            </div>

            {/* Net Banking */}
            <div className="border rounded-xl p-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setMethod("NET")}
              >
                <div className="flex items-center gap-3">
                  <FaUniversity />
                  <h2 className="font-semibold text-lg">Net Banking</h2>
                </div>
                <span>{method === "NET" ? "−" : "+"}</span>
              </div>

              {method === "NET" && (
                <div className="mt-4 space-y-4">
                  <select className="w-full border p-3 rounded-lg">
                    <option>Select Bank</option>
                    <option>SBI</option>
                    <option>HDFC</option>
                    <option>ICICI</option>
                  </select>
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full bg-slate-800 hover:bg-black text-white py-3 rounded-xl font-semibold"
                  >
                    {loading ? "Processing..." : `Pay ₹${totalAmount}`}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="col-span-1 bg-slate-50 p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Admission Fee</span>
                <span>₹{ADMISSION_FEE}</span>
              </div>

              {isPractical && (
                <div className="flex justify-between">
                  <span>Practical Fee</span>
                  <span>₹{PRACTICAL_FEE}</span>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-6">
              Temporary payment structure. API integration will update this automatically.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayMock;