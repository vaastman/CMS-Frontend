import api from "./api";

/* Get all admissions */
export const getAdmissions = (params = {}) =>
  api.get("/admissions", { params });

/* Get admission by ID */
export const getAdmissionById = (id) =>
  api.get(`/admissions/${id}`);

/* Update admission status (APPROVED / REJECTED / VERIFIED) */
export const updateAdmissionStatus = (id, status) =>
  api.patch(`/admissions/${id}/status`, { status });
