import api from "./api";

/* ================= ADMISSIONS ================= */

/**
 * Get all admissions
 * Access: ADMIN, HOD
 * Query params supported:
 *  - status
 *  - courseId
 *  - studentId
 */
export const getAdmissions = (params = {}) => {
  return api.get("/admissions", { params });
};

/**
 * Get admission by ID
 * Access: ADMIN, HOD
 */
export const getAdmissionById = (id) => {
  if (!id) throw new Error("Admission ID is required");
  return api.get(`/admissions/${id}`);
};

/**
 * Update admission status
 * Backend accepted values ONLY:
 *  - INITIATED
 *  - PAYMENT_PENDING
 *  - CONFIRMED
 *  - CANCELLED
 */
export const updateAdmissionStatus = (id, status) => {
  if (!id) throw new Error("Admission ID is required");
  if (!status) throw new Error("Status is required");

  return api.patch(`/admissions/${id}/status`, {
    status,
  });
};
