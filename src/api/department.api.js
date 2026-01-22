// src/api/department.api.js
import api from "./api";

/* 🔹 Fetch all departments */
export const fetchDepartmentsApi = (payload) => {
  return api.get("/departments", { params: payload });
};

/* 🔹 Create department */
export const createDepartmentApi = (payload) =>
  api.post("/departments", payload);

/* 🔹 Update department */
export const updateDepartmentApi = (id, payload) =>
  api.put(`/departments/${id}`, payload);
