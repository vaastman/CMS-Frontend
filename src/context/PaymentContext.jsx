import { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [currentPayment, setCurrentPayment] = useState(null);

  const setPayment = (payment) => {
    setCurrentPayment(payment);
  };

  return (
    <PaymentContext.Provider value={{ currentPayment, setPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);