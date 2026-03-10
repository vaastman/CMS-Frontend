import api from "./api";

/**
 * Get all admissions
 * Access: ADMIN, HOD
 */
export const getAdmissions = async (params = {}) => {
  try {
    const res = await api.get("/admissions", { params });
    return res;
  } catch (error) {
    console.error("getAdmissions error:", error?.response?.data || error);
    throw error;
  }
};

/**
 * Get admission by ID
 * Access: ADMIN, HOD
 */
export const getAdmissionById = async (id) => {
  if (!id) {
    throw new Error("Admission ID is required");
  }

  try {
    const res = await api.get(`/admissions/${id}`);
    return res;
  } catch (error) {
    console.error("getAdmissionById error:", error?.response?.data || error);
    throw error;
  }
};

/**
 * 🔥 NEW: Get latest admission by studentId
 * (Safer when you only have studentId)
 */
export const getLatestAdmissionByStudent = async (studentId) => {
  if (!studentId) {
    throw new Error("Student ID is required");
  }

  try {
    const res = await api.get("/admissions", {
      params: { studentId },
    });

    const admissions = res?.data?.data?.admissions || [];

    if (!admissions.length) return null;

    return admissions[0]; // already ordered by createdAt desc
  } catch (error) {
    console.error("getLatestAdmissionByStudent error:", error?.response?.data || error);
    throw error;
  }
};

/**
 * Create admission
 */
export const createAdmission = async (payload = {}) => {
  const { studentId, courseId, sessionId } = payload;

  if (!studentId) throw new Error("studentId is required");
  if (!courseId) throw new Error("courseId is required");
  if (!sessionId) throw new Error("sessionId is required");

  return api.post("/admissions", {
    studentId,
    courseId,
    sessionId,
  });
};

/**
 * Update admission status
 */
export const updateAdmissionStatus = (id, status, notes = "") => {
  if (!id) throw new Error("Admission ID is required");
  if (!status) throw new Error("Status is required");

  return api.patch(`/admissions/${id}/status`, {
    status,
    notes,
  });
};

/**
 * Create admission payment order
 */
export const createAdmissionPayment = (admissionId) => {
  if (!admissionId) throw new Error("Admission ID is required");

  return api.post(`/admissions/${admissionId}/payment`);
};

/**
 * Verify payment after success
 */
export const verifyAdmissionPayment = (admissionId, payload) => {
  if (!admissionId) throw new Error("Admission ID is required");

  return api.post(`/admissions/${admissionId}/payment/verify`, payload);
};
export const verifyStudent = async (payload) => {
  return api.post("/students/verify-student", payload);
};

// 
/**
 * Get admission fee preview
 * Public API
 */
export const getAdmissionFeePreview = async (
  courseId,
  semester,
  practical = false
) => {
  if (!courseId) throw new Error("courseId is required");
  if (!semester) throw new Error("semester is required");

  try {
    const res = await api.get("/admissions/fee-preview", {
      params: {
        courseId,
        semester,
        practical,
      },
    });

    return res.data;
  } catch (error) {
    console.error(
      "getAdmissionFeePreview error:",
      error?.response?.data || error
    );
    throw error;
  }
};