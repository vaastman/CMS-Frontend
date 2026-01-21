import api from "./api";

/* ================= CREATE COURSE ================= */
export const createCourse = (payload) => {
  return api.post("/courses", payload);
};

/* ================= UPDATE COURSE ================= */
export const updateCourse = (id, payload) => {
  return api.put(`/courses/${id}`, payload);
};

/* ================= GET ALL COURSES ================= */
/**
 * Optional params supported:
 * - page
 * - limit
 * - status
 * - search
 */
export const getCourses = (params = {}) => {
  return api.get("/courses", { params });
};

/* ================= GET COURSE BY ID ================= */
export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};
