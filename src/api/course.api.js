import api from "./api";

export const createCourse = (payload) =>
  api.post("/courses", payload);

export const updateCourse = (id, payload) =>
  api.put(`/courses/${id}`, payload);

export const getCourses = () =>
  api.get("/courses");

export const getCourseById = (id) =>
  api.get(`/courses/${id}`);
