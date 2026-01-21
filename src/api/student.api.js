import api from "./api";

// CREATE student
export const createStudent = (payload) =>
  api.post("/students", payload);

// UPDATE student
export const updateStudent = (id, payload) =>
  api.put(`/students/${id}`, payload);

// ASSIGN semester
export const assignSemester = (id, payload) =>
  api.post(`/students/${id}/semester`, payload);

// GET all students
export const getStudents = () =>
  api.get("/students");

// GET single student
export const getStudentById = (id) =>
  api.get(`/students/${id}`);
