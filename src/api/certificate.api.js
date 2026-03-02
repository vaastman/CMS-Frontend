import api from "./api";

/* ===========================
   Create Certificate Request
=========================== */
export const createCertificate = async (payload) => {
  const { data } = await api.post("/certificates", payload);
  return data;
};

/* ===========================
   Get All Certificates
   (Admin / HOD / Student)
=========================== */
export const getCertificates = async (params = {}) => {
  const { data } = await api.get("/certificates", { params });
  return data;
};

/* ===========================
   Get Single Certificate
=========================== */
export const getCertificateById = async (id) => {
  const { data } = await api.get(`/certificates/${id}`);
  return data;
};

/* ===========================
   Update Certificate Status
   (APPROVED / REJECTED)
=========================== */
export const updateCertificateStatus = async (id, payload) => {
  const { data } = await api.patch(
    `/certificates/${id}/status`,
    payload
  );
  return data;
};

/* ===========================
   Issue Certificate (Generate PDF)
=========================== */
export const issueCertificate = async (id) => {
  const { data } = await api.post(`/certificates/${id}/issue`);
  return data;
};

/* ===========================
   Download Certificate PDF
=========================== */
export const downloadCertificate = async (id) => {
  const response = await api.get(
    `/certificates/${id}/download`,
    {
      responseType: "blob", // important for PDF
    }
  );

  return response.data;
};

/* ===========================
   Delete Certificate
=========================== */
export const deleteCertificate = async (id) => {
  const { data } = await api.delete(`/certificates/${id}`);
  return data;
};