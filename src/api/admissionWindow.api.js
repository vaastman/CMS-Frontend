import api from "./api"; // your axios instance

export const getAdmissionWindows = (params) => {
  return api.get("/admissions/windows", { params });
};

export const getAdmissionWindowById = (id) => {
  return api.get(`/admissions/windows/${id}`);
};

export const createAdmissionWindow = (data) => {
  return api.post("/admissions/windows", data);
};

export const updateAdmissionWindow = (id, data) => {
  return api.patch(`/admissions/windows/${id}`, data);
};

export const deleteAdmissionWindow = (id) => {
  return api.delete(`/admissions/windows/${id}`);
};