import api from "./api";

export const getCourses = (params = {}) =>
  api.get("/courses", { params });

export const createCourse = (payload) =>
  api.post("/courses", payload);

export const updateCourse = (id, payload) =>
  api.put(`/courses/${id}`, payload);

export const deleteCourse = (id) =>
  api.delete(`/courses/${id}`);
