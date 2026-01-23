import api from "./api";

/* ================= CREATE ================= */
export const createStudent = (payload) => {
  return api.post("/students", payload);
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
