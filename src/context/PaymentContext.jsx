import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [receipts, setReceipts] = useState([]);

  /* ✅ Called when payment succeeds */
  const addSuccessfulPayment = (payment) => {
    setPayments((prev) => [...prev, payment]);

    // 🔹 Auto-generate receipt
    const receipt = {
      receiptId: `RCPT-${Date.now()}`,
      transactionId: payment.transactionId,
      student: payment.student,
      course: payment.course,
      amount: payment.amount,
      date: new Date().toISOString().split("T")[0],
    };

    setReceipts((prev) => [...prev, receipt]);
  };

  return (
    <PaymentContext.Provider
      value={{ payments, receipts, addSuccessfulPayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => useContext(PaymentContext);
