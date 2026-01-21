import api from "./api";

export const adminLoginApi = (payload) => {
  return api.post("/auth/login", payload);
};
