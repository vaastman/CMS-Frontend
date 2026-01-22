// src/api/course.api.js
import api from "./api";

/* ================= GET COURSES ================= */
// expects: GET /courses?sessionId=<UUID>
export const getCourses = (params = {}) => {
  return api.get("/courses", { params });
};

/* ================= CREATE COURSE ================= */
// expects body:
// {
//   name,
//   code,
//   durationYears,
//   departmentId,
//   sessionId (UUID)
// }
export const createCourse = (payload) => {
  return api.post("/courses", payload);
};

/* ================= UPDATE COURSE ================= */
export const updateCourse = (id, payload) => {
  return api.patch(`/courses/${id}`, payload);
};

/* ================= DELETE COURSE ================= */
export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};

/* ================= GET COURSE BY ID ================= */
export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};
