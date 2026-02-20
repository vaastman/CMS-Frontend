import api from "./api";
import axios from "axios";
/* LOGIN */
export const adminLoginApi = (payload) => {
  return api.post("/auth/login", payload);
};

/* REFRESH */
// export const refreshApi = (refreshToken) => {
//   return api.post(
//     "/auth/refresh-token",
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     }
//   );
// };
export const refreshApi = (refreshToken) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
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