import api from "./api";

/* ================= GET SESSIONS ================= */
export const getSessions = (params = {}) => {
  return api.get("/sessions", { params });
};

/* ================= CREATE SESSION ================= */
export const createSession = (data) => {
  return api.post("/sessions", data);
};

/* ================= UPDATE SESSION ================= */
export const updateSession = (id, data) => {
  return api.put(`/sessions/${id}`, data);
};

/* ================= DELETE SESSION (optional) ================= */
export const deleteSession = (id) => {
  return api.delete(`/sessions/${id}`);
};
