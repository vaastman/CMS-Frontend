import { createContext, useContext, useEffect, useState } from "react";
import { adminLoginApi, logoutApi, refreshApi } from "@/api/auth.api";

const AuthContext = createContext(null);

const ADMIN_ROLES = ["ADMIN", "HOD", "ACCOUNTANT"];

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= RESTORE SESSION ================= */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = localStorage.getItem("admin");
        const accessToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!storedUser || !refreshToken) {
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        // If access token exists, just restore
        if (accessToken) {
          setAdmin(parsedUser);
          setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));
          setLoading(false);
          return;
        }

        // 🔥 If access token missing, try refresh
        const res = await refreshApi(refreshToken);
        const newAccessToken = res?.data?.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          setAdmin(parsedUser);
          setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));
        }

      } catch (err) {
        localStorage.clear();
        setAdmin(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /* ================= LOGIN ================= */
  const login = async (email, password) => {
    try {
      const res = await adminLoginApi({ email, password });

      const user = res?.data?.data?.user;
      const accessToken = res?.data?.data?.accessToken;
      const refreshToken = res?.data?.data?.refreshToken;

      if (!user || !accessToken || !refreshToken) return false;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("admin", JSON.stringify(user));

      setAdmin(user);
      setIsAdmin(ADMIN_ROLES.includes(user.role));

      return true;
    } catch {
      return false;
    }
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await logoutApi(refreshToken);
      }
    } catch {}

    localStorage.clear();
    setAdmin(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ admin, isAdmin, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};