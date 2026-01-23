// src/utils/admissionStatus.js
export const statusLabel = {
  INITIATED: "APPLIED",
  PAYMENT_PENDING: "UNDER VERIFICATION",
  CONFIRMED: "APPROVED",
  CANCELLED: "REJECTED",
};

export const statusStyle = (status) => {
  switch (status) {
    case "INITIATED":
      return "bg-blue-100 text-blue-700";
    case "PAYMENT_PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "CONFIRMED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
