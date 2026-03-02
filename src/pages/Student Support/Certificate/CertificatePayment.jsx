import { useLocation } from "react-router-dom";

const CertificatePayment = () => {
  const { state } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">
          Payment for Certificate
        </h2>

        <p>Certificate ID: {state?.certificateId}</p>
        <p className="text-lg font-semibold mt-2">
          Amount: ₹ {state?.amount}
        </p>

        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CertificatePayment;