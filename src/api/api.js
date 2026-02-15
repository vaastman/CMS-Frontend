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
    const token = localStorage.getItem("token");

    // ❌ Do NOT attach access token to login/register
    const isAuthRoute =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register") ||
      config.url?.includes("/auth/refresh-token");

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
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

    // If access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("No refresh token");

        // 🔄 Call refresh endpoint
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = res.data.data.accessToken;

        // Save new access token
        localStorage.setItem("token", newAccessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.warn("Refresh failed. Logging out.");

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("admin");

        window.location.href = "/admin/login";

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      console.warn("Forbidden - Insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export default api;
