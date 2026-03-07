import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPaymentStatus } from "@/api/payment.api";

const PaymentProcessing = () => {

  const [params] = useSearchParams();

  const paymentId = params.get("paymentId");

  const [status, setStatus] = useState("VERIFYING");

  useEffect(() => {

    const verify = async () => {

      try {

        const res = await getPaymentStatus(paymentId);

        setStatus(res.data.payment.status);

      } catch {
        setStatus("FAILED");
      }

    };

    verify();

  }, []);

  return (
    <div className="flex items-center justify-center h-screen">

      {status === "VERIFYING" && <h2>Verifying Payment...</h2>}

      {status === "SUCCESS" && <h2>Payment Successful ✅</h2>}

      {status === "FAILED" && <h2>Payment Failed ❌</h2>}

    </div>
  );
};

export default PaymentProcessing;