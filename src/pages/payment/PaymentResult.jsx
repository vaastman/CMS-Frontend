import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaRedo, FaHome, FaInfoCircle } from "react-icons/fa";

const PaymentResult = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const status = params.get("status") || "FAILED";
  const txnId = params.get("txnId") || "-";
  const amount = params.get("amount") || "-";
  const student = JSON.parse(localStorage.getItem("verifiedStudent") || "{}");

  const success = status === "SUCCESS";
  const retryPayment = () => {
    const studentId = student.id || student.studentId;

    if (studentId) {
      navigate(`/student/details/${studentId}`);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

        {/* ICON */}

        <div className="flex justify-center mb-4">

          {success ? (
            <FaCheckCircle className="text-green-500 text-6xl" />
          ) : (
            <FaTimesCircle className="text-red-500 text-6xl" />
          )}

        </div>

        {/* TITLE */}

        <h1 className="text-2xl font-bold mb-2">
          {success ? "Payment Successful" : "Payment Failed"}
        </h1>

        <p className="text-gray-500 mb-6">
          {success
            ? "Your admission payment has been completed."
            : "The payment was not completed. You can retry using the same student details."}
        </p>

        {/* DETAILS */}

        <div className="bg-gray-50 rounded-lg p-4 text-left text-sm mb-6">

          {/* <p><strong>Transaction ID:</strong> {txnId}</p>
          <p><strong>Amount:</strong> ₹{amount}</p>
          <p><strong>Status:</strong> {status}</p> */}
          <p><strong>Student Name:</strong> {student.name || "-"}</p>
          <p><strong>Father Name:</strong> {student.fatherName || "-"}</p>
          <p><strong>Transaction ID:</strong> {txnId}</p>
          <p><strong>Amount:</strong> ₹{amount}</p>
          <p><strong>Status:</strong> {status}</p>

        </div>

        {!success && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <FaInfoCircle />
              Payment attempt note
            </div>
            <p>
              If the gateway was closed or cancelled, this failed status is expected. Keep the Transaction ID for support if needed.
            </p>
          </div>
        )}

        {/* BUTTONS */}

        <div className="flex justify-center gap-3">

          {!success && (
            <button
              onClick={retryPayment}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <FaRedo /> Retry
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <FaHome /> Home
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentResult;
