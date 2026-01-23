import api from "./api";

export const createStudent = (payload) => {
  return api.post("/students", payload);
};

export const fetchStudents = (params = {}) => {
  return api.get("/students", { params });
};

export const getStudentById = (id) => {
  return api.get(`/students/${id}`);
};

export const updateStudent = (id, payload) => {
  return api.patch(`/students/${id}`, payload);
};

export const assignSemesterToStudent = (studentId, payload) => {
  return api.post(`/students/${studentId}/semesters`, payload);
};
