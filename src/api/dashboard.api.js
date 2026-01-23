// src/api/dashboard.api.js
import api from "./api";

/* ================= STUDENTS ================= */
export const getAllStudents = () => {
  return api.get("/students");
};

/* ================= ADMISSIONS ================= */
// ❌ DO NOT PASS params (backend can't handle them)
export const getAllAdmissions = () => {
  return api.get("/admissions");
};
