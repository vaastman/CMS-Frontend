import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {

  const [params] = useSearchParams();
  const paymentId = params.get("paymentId");

  const invoiceUrl = paymentId
    ? `${import.meta.env.VITE_API_URL}/payments/public/${paymentId}/invoice`
    : null;

  return (
    <div className="text-center mt-20">

      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful
      </h1>

      {invoiceUrl && (
        <a
          href={invoiceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Download Receipt
        </a>
      )}

    </div>
  );
};

export default PaymentSuccess;