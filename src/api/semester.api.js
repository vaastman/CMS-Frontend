import api from "./api";

export const getSemesters = (params = {}) => {
  return api.get("/semesters", { params });
};

export const getSemesterById = (id) => {
  return api.get(`/semesters/${id}`);
};

export const assignSemesterToStudent = (studentId, payload) => {
  return api.post(`/students/${studentId}/assign-semester`, payload);
};
