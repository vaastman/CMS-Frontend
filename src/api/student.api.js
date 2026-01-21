import api from "./api";

export const createStudent = (payload) =>
  api.post("/students", payload);

export const getStudents = () =>
  api.get("/students");

export const getStudentById = (id) =>
  api.get(`/students/${id}`);

export const updateStudent = (id, payload) =>
  api.put(`/students/${id}`, payload);

export const fetchStudents = (params) =>
  api.get("/students", { params });