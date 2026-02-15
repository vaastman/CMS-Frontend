import api from "./api";

/* LOGIN */
export const adminLoginApi = (payload) => {
  return api.post("/auth/login", payload);
};

/* LOGOUT */
export const logoutApi = (refreshToken) => {
  return api.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};
