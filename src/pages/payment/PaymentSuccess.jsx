import { useSearchParams } from "react-router-dom";
import { downloadInvoice } from "@/api/payment.api";

const PaymentSuccess = () => {

  const [params] = useSearchParams();

  const paymentId = params.get("paymentId");

  return (
    <div className="text-center mt-20">

      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful
      </h1>

      <a
        href={downloadInvoice(paymentId)}
        target="_blank"
        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Download Receipt
      </a>

    </div>
  );
};

export default PaymentSuccess;