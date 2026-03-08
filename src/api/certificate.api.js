import api from "./api";

/* ===========================
   Create Certificate Request
=========================== */
export const createCertificate = async (payload) => {
  const res = await api.post("/certificates", payload);
  return res.data;
};

/* ===========================
   Get All Certificates (Admin)
=========================== */
export const getCertificates = async (params = {}) => {
  try {
    const res = await api.get("/certificates", { params });
    return res.data;
  } catch (error) {
    console.error("Get Certificates Error:", error.response?.data);
    throw error;
  }
};

/* ===========================
   Get Single Certificate
=========================== */
export const getCertificateById = async (id) => {
  const res = await api.get(`/certificates/${id}`);
  return res.data;
};

/* ===========================
   Update Certificate Status
=========================== */
export const updateCertificateStatus = async (id, payload) => {
  const res = await api.patch(`/certificates/${id}/status`, payload);
  return res.data;
};

/* ===========================
   Issue Certificate
=========================== */
export const issueCertificate = async (id) => {
  const res = await api.post(`/certificates/${id}/issue`);
  return res.data;
};

/* ===========================
   Download Certificate
=========================== */
export const downloadCertificate = async (id) => {
  const res = await api.get(`/certificates/${id}/download`, {
    responseType: "blob"
  });

  return res.data;
};

/* ===========================
   Delete Certificate
=========================== */
export const deleteCertificate = async (id) => {
  const res = await api.delete(`/certificates/${id}`);
  return res.data;
};