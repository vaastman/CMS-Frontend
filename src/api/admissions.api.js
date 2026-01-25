import api from "./api";

/**
 * Get all admissions
 * Access: ADMIN, HOD
 * @param {Object} params - Optional query params (status, courseId, studentId)
 */
export const getAdmissions = (params = {}) => {
  return api.get("/admissions", { params });
};

/**
 * Get admission by ID
 * Access: ADMIN, HOD
 * @param {string} id - Admission ID
 */
export const getAdmissionById = (id) => {
  if (!id) {
    throw new Error("Admission ID is required");
  }

  return api.get(`/admissions/${id}`);
};

/**
 * Create admission
 * Access: ADMIN, HOD
 * @param {Object} payload
 * @param {string} payload.studentId
 * @param {string} payload.courseId
 * @param {string} payload.sessionId
 */
export const createAdmission = (payload = {}) => {
  const { studentId, courseId, sessionId } = payload;

  if (!studentId) {
    throw new Error("studentId is required");
  }
  if (!courseId) {
    throw new Error("courseId is required");
  }
  if (!sessionId) {
    throw new Error("sessionId is required");
  }

  return api.post("/admissions", {
    studentId,
    courseId,
    sessionId,
  });
};

/**
 * Update admission status
 * Access: ADMIN, HOD
 * @param {string} id - Admission ID
 * @param {string} status - New status
 * @param {string} notes - Optional notes
 */
export const updateAdmissionStatus = (id, status, notes = "") => {
  if (!id) {
    throw new Error("Admission ID is required");
  }
  if (!status) {
    throw new Error("Status is required");
  }

  return api.patch(`/admissions/${id}/status`, {
    status,
    notes,
  });
};
