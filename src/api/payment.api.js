import api from "./api";

/* CREATE PAYMENT */
export const createPayment = async (data) => {
  const res = await api.post("/payments", data);
  return res.data;
};

/* ADMIN PAYMENT LINK */
export const generatePaymentLink = async (paymentId) => {
  const res = await api.post(`/payments/${paymentId}/generate-link`);
  return res.data;
};

/* STUDENT PAYMENT LINK */
export const studentGeneratePaymentLink = async (paymentId) => {
  if (!paymentId) throw new Error("paymentId is required");
  const res = await api.post(`/payments/${paymentId}/student-generate-link`);
  return res.data;
};

/* GET ALL PAYMENTS */
export const getAllPayments = async (params = {}) => {
  const res = await api.get("/payments", { params });
  return res.data;
};

/* GET PAYMENT DETAILS */
export const getPaymentById = async (paymentId) => {
  const res = await api.get(`/payments/${paymentId}`);
  return res.data;
};

/* GET PUBLIC PAYMENT STATUS */
export const getPaymentStatus = async (paymentId) => {
  const res = await api.get(`/payments/public/${paymentId}/status`);
  return res.data;
};

/* DOWNLOAD INVOICE */
export const downloadInvoice = (paymentId) => {
  return `${import.meta.env.VITE_API_URL}/payments/public/${paymentId}/invoice`;
};

/* UPDATE PAYMENT STATUS */
export const updatePaymentStatus = async (paymentId, data) => {
  const res = await api.patch(`/payments/${paymentId}/status`, data);
  return res.data;
};

/* REFUND PAYMENT */
export const refundPayment = async (paymentId, data) => {
  const res = await api.post(`/payments/${paymentId}/refund`, data);
  return res.data;
};

/* PAYMENT STATS */
export const getPaymentStats = async () => {
  const res = await api.get("/payments/stats");
  return res.data;
};