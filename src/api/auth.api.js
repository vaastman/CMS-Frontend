import api from "./api";
/* ================= LOGIN ================= */
export const adminLoginApi = (payload) => {
  return api.post("/auth/login", payload);
};

/* ================= REFRESH ================= */
/* 🔥 Send refreshToken in BODY (matches backend) */
export const refreshApi = (refreshToken) => {
  return api.post("/auth/refresh-token", {
    refreshToken,
  });
};

/* ================= LOGOUT ================= */
/* 🔥 Also send refreshToken in BODY */
export const logoutApi = (refreshToken) => {
  return api.post("/auth/logout", {
    refreshToken,
  });
};