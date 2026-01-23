import api from "./api";

/* ================= GET SESSIONS ================= */
export const getSessions = async (params = {}) => {
  const res = await api.get("/sessions", { params });
  return res;
};

/* ================= CREATE SESSION ================= */
export const createSession = async (data) => {
  const res = await api.post("/sessions", data);
  return res;
};

/* ================= UPDATE SESSION ================= */
export const updateSession = async (id, data) => {
  const res = await api.put(`/sessions/${id}`, data);
  return res;
};

/* ================= DELETE SESSION ================= */
export const deleteSession = async (id) => {
  const res = await api.delete(`/sessions/${id}`);
  return res;
};
