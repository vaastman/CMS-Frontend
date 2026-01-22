// src/api/department.api.js
import api from "./api";

/* ================= GET ALL DEPARTMENTS ================= */
export const fetchDepartmentsApi = (params = {}) => {
  return api.get("/departments", { params });
};

/* ✅ ALIAS (so Course.jsx can use getDepartments) */
export const getDepartments = fetchDepartmentsApi;

/* ================= CREATE DEPARTMENT ================= */
export const createDepartmentApi = (payload) => {
  return api.post("/departments", payload);
};

/* ================= UPDATE DEPARTMENT ================= */
export const updateDepartmentApi = (id, payload) => {
  return api.patch(`/departments/${id}`, payload);
};

/* ================= DELETE DEPARTMENT ================= */
export const deleteDepartmentApi = (id) => {
  return api.delete(`/departments/${id}`);
};

/* ================= GET DEPARTMENT BY ID ================= */
export const getDepartmentByIdApi = (id) => {
  return api.get(`/departments/${id}`);
};
