import api from "./api";

export const adminLoginApi = (payload) =>
  api.post("/auth/login", payload);

export const adminRegisterApi = (payload) =>
  api.post("/auth/register", payload);