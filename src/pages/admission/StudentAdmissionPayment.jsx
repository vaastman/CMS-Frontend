import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";

// import {
//   getAdmissionById,
//   createAdmissionPayment,
// } from "@/api/admissions.api";
import { getAdmissionById } from "@/api/admissions.api";

const StudentAdmissionPayment = () => {
  const { id } = useParams(); // ✅ FIXED
  const navigate = useNavigate();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        console.log("Fetching admission ID:", id);

        const res = await getAdmissionById(id);
        setAdmission(res?.data?.data?.admission);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load admission");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAdmission();
  }, [id]);

//   const handlePayment = async () => {
//     try {
//       setPaying(true);

//       const res = await createAdmissionPayment(id);

//       const paymentUrl = res?.data?.data?.paymentUrl;

//       if (!paymentUrl) {
//         toast.error("Payment URL not received");
//         return;
//       }

//       navigate(`/student/payment-gateway/${id}`);

//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || "Failed to initiate payment"
//       );
//     } finally {
//       setPaying(false);
//     }
//   };
const handlePayment = () => {
  navigate(`/student/payment-gateway/${id}`);
};

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!admission) return <div className="p-10 text-center">Admission not found</div>;

  const alreadyPaid =
    admission.payments?.some((p) => p.status === "SUCCESS");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admission Payment</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm bg-slate-100 px-4 py-2 rounded-lg"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl space-y-2">
          <p><strong>Name:</strong> {admission.student?.name}</p>
          <p><strong>Course:</strong> {admission.course?.name}</p>
          <p><strong>Session:</strong> {admission.session?.name}</p>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Admission Fee</span>
            <span className="font-bold text-green-600">
              ₹{admission.feeAmount || 5000}
            </span>
          </div>

          {!alreadyPaid ? (
            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FaMoneyBillWave />
              {paying ? "Redirecting to Gateway..." : "Proceed to Pay"}
            </button>
          ) : (
            <div className="bg-green-100 text-green-700 text-center py-3 rounded-xl font-semibold">
              Payment Already Completed
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentAdmissionPayment;