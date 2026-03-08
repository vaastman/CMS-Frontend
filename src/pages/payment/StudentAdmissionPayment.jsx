import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { createPayment, studentGeneratePaymentLink } from "@/api/payment.api";
import { createPayment, generatePaymentLink } from "@/api/payment.api";
import PaymentSummary from "@/components/payment/PaymentSummary";

const StudentAdmissionPayment = () => {

  const { admissionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);

  /* ================= LOAD STUDENT ================= */

  useEffect(() => {

    const saved = localStorage.getItem("verifiedStudent");

    if (!saved) {
      toast.error("Session expired. Please verify again.");
      navigate("/admission/student-registration");
      return;
    }

    const parsed = JSON.parse(saved);
    setStudent(parsed);

  }, [navigate]);

  /* ================= FEE BREAKDOWN ================= */

 const feeBreakdown = [
  { head: "TUITION", amount: 3250 },
  { head: "DEVELOPMENT", amount: 600 }
];
  const total = feeBreakdown.reduce((sum, item) => sum + item.amount, 0);

  /* ================= HANDLE PAYMENT ================= */

const handlePayment = async () => {

  try {

    setLoading(true);

    const payload = {
      admissionId: admissionId,
      studentId: student.studentId,
      totalAmount: total,
      gateway: "GETEPAY",
      txnId: `TXN-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      breakups: feeBreakdown
    };

    const res = await createPayment(payload);

    const paymentId = res?.data?.payment?.id;

    if (!paymentId) {
      throw new Error("Payment creation failed");
    }

    const linkRes = await generatePaymentLink(paymentId);

    const paymentUrl = linkRes?.data?.paymentUrl;

    if (!paymentUrl) {
      throw new Error("Payment link generation failed");
    }

    window.location.href = paymentUrl;

  } catch (err) {

    console.log("FULL ERROR:", err.response?.data);

    toast.error(
      err?.response?.data?.message ||
      err?.message ||
      "Payment initiation failed"
    );

  } finally {

    setLoading(false);

  }

};
  /* ================= LOADING ================= */

  if (!student) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading student information...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">

      <div className="max-w-xl mx-auto">

        {/* PAGE TITLE */}

        <h1 className="text-3xl font-bold text-center mb-8">
          Admission Payment
        </h1>

        {/* STUDENT INFO */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="font-semibold text-lg mb-4">
            Student Details
          </h2>

          <div className="space-y-2 text-sm text-gray-700">

            <p>
              <strong>Name:</strong> {student.name}
            </p>

            <p>
              <strong>Course:</strong> {student.course?.name}
            </p>

            <p>
              <strong>Session:</strong> {student.session?.name}
            </p>

          </div>

        </div>

        {/* PAYMENT SUMMARY */}

        <PaymentSummary
          title="Admission Fee"
          admissionId={admissionId}
          studentName={student.name}
          feeBreakdown={feeBreakdown}
          onPay={handlePayment}
          loading={loading}
        />

      </div>

    </div>
  );
};

export default StudentAdmissionPayment;