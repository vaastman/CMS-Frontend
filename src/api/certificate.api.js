import api from "./api";

/* ===========================
   Student: Apply for Certificate
=========================== */
export const createCertificate = async (payload) => {
  const res = await api.post("/certificates/apply", payload);
  return res.data;
};

/* ===========================
   Student: Create Payment for Certificate
=========================== */
export const createCertificatePayment = async (payload) => {
  const res = await api.post("/certificates/payment/create", payload);
  return res.data;
};

/* ===========================
   Admin: Get All Certificate Applications
=========================== */
export const getCertificates = async (params = {}) => {
  const res = await api.get("/certificates/admin", { params });
  return res.data;
};

/* ===========================
   Admin: Get Single Application
=========================== */
export const getCertificateById = async (id) => {
  const res = await api.get(`/certificates/admin/${id}`);
  return res.data;
};

/* ===========================
   Admin: Update Application
=========================== */
export const updateCertificate = async (id, payload) => {
  const res = await api.patch(`/certificates/admin/${id}`, payload);
  return res.data;
};

/* ===========================
   Admin: Approve Application
=========================== */
export const approveCertificate = async (id) => {
  const res = await api.patch(`/certificates/admin/${id}/approve`);
  return res.data;
};

/* ===========================
   Admin: Reject Application
=========================== */
export const rejectCertificate = async (id, remarks) => {
  const res = await api.patch(`/certificates/admin/${id}/reject`, { remarks });
  return res.data;
};

/* ===========================
   Download Certificate PDF
=========================== */
export const downloadCertificate = async (id) => {
  const res = await api.get(`/certificates/admin/${id}/download`, {
    responseType: "blob"
  });
  return res.data;
};