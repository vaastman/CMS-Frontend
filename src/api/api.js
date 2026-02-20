import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    const isAuthRoute =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/refresh-token");

    if (accessToken && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    const isAuthRoute =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh-token");

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("No refresh token");

        // 🔥 VERY IMPORTANT: use plain axios here
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = res.data?.data?.accessToken;

        if (!newAccessToken) throw new Error("No new access token");

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {
        console.log("Refresh expired → Logging out");

        localStorage.clear();
        window.location.href = "/admin/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;