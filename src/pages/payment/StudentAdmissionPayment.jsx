import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createPayment, generatePaymentLink } from "@/api/payment.api";
import { getAdmissionFeePreview } from "@/api/admissions.api";
import PaymentSummary from "@/components/payment/PaymentSummary";

const parsePracticalValue = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return false;

  return value.trim().toLowerCase() === "true";
};

const StudentAdmissionPayment = () => {

  const { admissionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const practical = parsePracticalValue(location.state?.practical);

  console.log("===== PRACTICAL VALUE DEBUG =====");
  console.log("location.state:", location.state);
  console.log("location.state?.practical:", location.state?.practical);
  console.log("Parsed practical (boolean):", practical);
  console.log("=================================");

  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [feeBreakdown, setFeeBreakdown] = useState([]);
  const [total, setTotal] = useState(0);
  const paymentStatus = student?.lastAdmission?.paymentStatus;

  /* ================= FETCH FEE ================= */

  const fetchFee = async (studentData) => {
  try {
    const courseId = studentData.course?.id;

    // ✅ Dynamic semester
    const semester =
      studentData?.lastAdmission?.semester?.number ||
      studentData?.currentSemester ||
      studentData?.semester;

    if (!courseId || !semester) {
      throw new Error("Missing courseId or semester");
    }

    const res = await getAdmissionFeePreview(courseId, semester, practical);

    const breakdown = res?.data?.feeBreakdown;

    console.log("BACKEND BREAKDOWN:", breakdown);

    if (!breakdown) {
      throw new Error("Fee breakdown missing from API");
    }

    const fees = [];

    let calculatedTotal = 0;

    // ✅ TUITION
    if (breakdown.admissionFee > 0) {
      fees.push({
        head: "TUITION",
        amount: breakdown.admissionFee,
      });

      calculatedTotal += breakdown.admissionFee;
    }

    // ✅ PRACTICAL (only if selected)
    if (practical && breakdown.practicalFee > 0) {
      fees.push({
        head: "PRACTICAL",
        amount: breakdown.practicalFee,
      });

      calculatedTotal += breakdown.practicalFee;
    }

    // ✅ LATE FEE → MISC
    if (breakdown.lateFee > 0) {
      fees.push({
        head: "MISC",
        amount: breakdown.lateFee,
      });

      calculatedTotal += breakdown.lateFee;
    }

    setFeeBreakdown(fees);
    setTotal(calculatedTotal);

  } catch (error) {
    console.error("Fee fetch error:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch fee";

    toast.error(message);
  }
};


// const fetchFee = async (studentData) => {
//   try {
//     const courseId = studentData.course?.id;

//     // Dynamic semester (NO hardcoding)
//     const semester =
//       studentData?.lastAdmission?.semester?.number ||
//       studentData?.currentSemester ||
//       studentData?.semester;

//     if (!courseId || !semester) {
//       throw new Error("Missing courseId or semester");
//     }

//     console.log("===== FEE FETCH DEBUG =====");
//     console.log("practical (boolean):", practical);
//     console.log("practical type:", typeof practical);
//     console.log("courseId:", courseId);
//     console.log("semester:", semester);
//     console.log("===========================");

//     const res = await getAdmissionFeePreview(courseId, semester, practical);

//     const breakdown = res?.data?.feeBreakdown;

//     console.log("BACKEND BREAKDOWN:", breakdown);

//     if (!breakdown) {
//       throw new Error("Fee breakdown missing from API");
//     }

//     const fees = [];

//     // TUITION (required)
//     if (breakdown.admissionFee > 0) {
//       fees.push({
//         head: "TUITION",
//         amount: breakdown.admissionFee
//       });
//     }

//     console.log("Before PRACTICAL check:");
//     console.log("  practical =", practical, "(type:", typeof practical + ")");
//     console.log("  breakdown.practicalFee =", breakdown.practicalFee);
//     console.log("  Condition result:", practical && breakdown.practicalFee > 0);

//     // PRACTICAL (only if practical is selected AND fee exists)
//     if (practical && breakdown.practicalFee > 0) {
//       fees.push({
//         head: "PRACTICAL",
//         amount: breakdown.practicalFee
//       });
//       console.log("✅ PRACTICAL FEE ADDED:", breakdown.practicalFee);
//     } else {
//       console.log("❌ PRACTICAL FEE NOT ADDED");
//     }

//     // LATE FEE → map to MISC (backend supported)
//     if (breakdown.lateFee > 0) {
//       fees.push({
//         head: "MISC",
//         amount: breakdown.lateFee
//       });
//     }

//     console.log("FINAL FEES ARRAY:", fees);
//     console.log("TOTAL FROM BACKEND:", breakdown.totalFee);
//     console.log("===========================");

//     // FINAL STATE (use backend totalFee)
//     setFeeBreakdown(fees);
//     setTotal(breakdown.totalFee);

//   } catch (error) {
//     console.error("Fee fetch error:", error);

//     // Better error message
//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Failed to fetch fee";

//     toast.error(message);
//   }
// };
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

    fetchFee(parsed);

  }, [navigate, practical]);

  /* ================= HANDLE PAYMENT ================= */
const handlePayment = async () => {
  try {
    if (paymentStatus === "SUCCESS") {
      toast.error("Admission fee has already been paid.");
      navigate(-1);
      return;
    }

    setLoading(true);

    console.log("===== PAYMENT FLOW START =====");

    const payload = {
      admissionId,
      studentId: student.studentId || student.id,
      totalAmount: total,
      gateway: "GETEPAY",
      txnId: `TXN-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      breakups: feeBreakdown.filter((item) => Number(item.amount) > 0)
    };

    console.log("Payment payload:", payload);
    localStorage.setItem("paymentAmount", total);

    /* STEP 1: Create Payment */
    const res = await createPayment(payload);

    console.log("CREATE PAYMENT RESPONSE:", res);

    const paymentId = res?.data?.payment?.id;

    if (!paymentId) {
      throw new Error("Payment creation failed");
    }

    /* STEP 2: Generate Payment Link */
    const linkRes = await generatePaymentLink(paymentId);

    console.log("PAYMENT LINK RESPONSE:", linkRes);

    const paymentUrl = linkRes?.data?.paymentUrl;

    if (!paymentUrl) {
      throw new Error("Payment link generation failed");
    }

    /* STEP 3: Redirect */
    window.location.href = paymentUrl;

  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("SERVER RESPONSE:", err?.response?.data);

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

        <h1 className="text-3xl font-bold text-center mb-8">
          Admission Payment
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="font-semibold text-lg mb-4">
            Student Details
          </h2>

          <div className="space-y-2 text-sm text-gray-700">

            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Course:</strong> {student.course?.name}</p>
            <p><strong>Session:</strong> {student.session?.name}</p>

          </div>

        </div>

        <PaymentSummary
          title="Admission Fee"
          admissionId={admissionId}
          studentName={student.name}
          feeBreakdown={feeBreakdown}
          onPay={handlePayment}
          loading={loading || paymentStatus === "SUCCESS"}
        />

        {paymentStatus === "SUCCESS" && (
          <p className="mt-4 text-center text-sm font-medium text-green-700">
            You have already paid the admission fee.
          </p>
        )}

      </div>

    </div>
  );
};

export default StudentAdmissionPayment;
