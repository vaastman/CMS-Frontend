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

export const getStudentSemesters = (params = {}) => {
  return api.get("/student-semesters", { params });
};

/* ✅ Get semesters by course */
export const getSemestersByCourse = (courseId) => {
  return api.get("/semesters", {
    params: { courseId }
  });
};
