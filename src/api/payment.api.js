import api from "./api";

/* ================================
   CREATE PAYMENT
================================ */
export const createPayment = async (data) => {
  try {
    const res = await api.post("/payments", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/* ================================
   GENERATE PAYMENT LINK (ADMIN)
================================ */
export const generatePaymentLink = async (paymentId) => {
  try {
    const res = await api.post(`/payments/${paymentId}/generate-link`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/* ================================
   GENERATE PAYMENT LINK (STUDENT)
================================ */
export const studentGeneratePaymentLink = async (paymentId) => {
  const res = await api.post(`/payments/${paymentId}/generate-link`);
  return res.data;
};

/* ================================
   GET ALL PAYMENTS
================================ */
export const getAllPayments = async (params = {}) => {
  try {
    const res = await api.get("/payments", { params });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/* ================================
   GET PAYMENT DETAILS
================================ */
export const getPaymentById = async (paymentId) => {
  try {
    const res = await api.get(`/payments/${paymentId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/* ================================
   GET PAYMENT STATUS (PUBLIC)
================================ */
export const getPaymentStatus = async (paymentId) => {
  try {
    const res = await api.get(`/payments/public/${paymentId}/status`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/* ================================
   DOWNLOAD INVOICE
================================ */
export const downloadInvoice = (paymentId) => {
  return `${api.defaults.baseURL}/payments/public/${paymentId}/invoice`;
};

/* ================================
   UPDATE PAYMENT STATUS
================================ */
export const updatePaymentStatus = async (paymentId, data) => {
  try {
    const res = await api.patch(`/payments/${paymentId}/status`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/* ================================
   REFUND PAYMENT
================================ */
export const refundPayment = async (paymentId, data) => {
  try {
    const res = await api.post(`/payments/${paymentId}/refund`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/* ================================
   PAYMENT STATS
================================ */
export const getPaymentStats = async () => {
  try {
    const res = await api.get("/payments/stats");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};