import api from "./api";

/* ===== SUBJECT MASTER ===== */

export const getSubjects = (params = {}) => {
  return api.get("/subjects", { params });
};
export const createSubject = (data) =>
  api.post("/subjects", data);

export const updateSubject = (id, data) =>
  api.patch(`/subjects/${id}`, data);

export const deleteSubject = (id) =>
  api.delete(`/subjects/${id}`);
