import api from "./api";

/* ================= CREATE ================= */
/* ================= CREATE ================= */
export const createStudent = async (payload) => {
  try {
    const res = await api.post("/students", payload);
    return res;
  } catch (error) {
    console.error("Create Student Error:", error?.response?.data);
    throw error;
  }
};

/* ================= READ ================= */
export const fetchStudents = (params = {}) => {
  return api.get("/students", { params });
};

export const getStudentById = (id) => {
  return api.get(`/students/${id}`);
};

/* ================= UPDATE ================= */
export const updateStudent = (id, payload) => {
  return api.patch(`/students/${id}`, payload);
};

/* ================= SEMESTER ================= */
export const assignSemesterToStudent = (studentId, payload) => {
  return api.post(`/students/${studentId}/semesters`, payload);
};

/* ================= DELETE ================= */
export const deleteStudent = (id) => {
  return api.delete(`/students/${id}`);
};

/* ================= VERIFY ================= */
export const verifyStudent = (payload) => {
  return api.post("/students/verify-student", payload);
};

// New API for verifying student by university roll number
export const verifyStudentByUniversityRoll = (payload) => {
  return api.post(
    "/students/verify-student-by-university-roll",
    payload
  );
};