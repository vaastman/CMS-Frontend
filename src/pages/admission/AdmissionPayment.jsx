import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "@/api/api";

const AdmissionPayment = () => {
  const { id } = useParams(); // admissionId
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 🔑 Mock gateway data (replace with real gateway later)
      const payload = {
        admissionId: id,
        studentId: localStorage.getItem("studentId"), // or from auth context
        totalAmount: 25000,
        gateway: "MANUAL",
        txnId: `TXN-${Date.now()}`,
        referenceNo: `REF-${Date.now()}`,
        breakups: [
          { head: "TUITION", amount: 20000 },
          { head: "DEVELOPMENT", amount: 5000 }
        ]
      };

      const res = await api.post("/payments", payload);

      toast.success("Payment initiated");

      // 🔄 Simulate payment success
      await api.patch(`/payments/${res.data.data.payment.id}/status`, {
        status: "SUCCESS"
      });

      toast.success("Payment successful");

      navigate(`/admin/admissions/${id}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-page)] px-4">
      <div className="bg-white border rounded-2xl p-8 w-full max-w-md space-y-6">

        <h1 className="text-xl font-bold text-gray-800">
          Admission Fee Payment
        </h1>

        <p className="text-sm text-gray-500">
          Admission ID: {id}
        </p>

        <div className="border rounded-lg p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Tuition Fee</span>
            <span>₹20,000</span>
          </div>
          <div className="flex justify-between">
            <span>Development Fee</span>
            <span>₹5,000</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹25,000</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="
            w-full bg-[color:var(--color-primary)]
            text-white py-2.5 rounded-lg
            font-medium hover:opacity-90
            disabled:opacity-60
          "
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default AdmissionPayment;