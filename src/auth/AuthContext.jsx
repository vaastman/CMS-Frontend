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

        // No stored session
        if (!storedUser || !refreshToken) {
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        // If access token exists → restore directly
        if (accessToken) {
          setAdmin(parsedUser);
          setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));
          setLoading(false);
          return;
        }

        // 🔥 If access token missing → try refresh
        const res = await refreshApi(refreshToken);
        const newAccessToken = res?.data?.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("Refresh failed");
        }

        localStorage.setItem("token", newAccessToken);

        setAdmin(parsedUser);
        setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));

      } catch (err) {
        // If refresh fails → force logout
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

      if (!user || !accessToken || !refreshToken) {
        return false;
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("admin", JSON.stringify(user));

      setAdmin(user);
      setIsAdmin(ADMIN_ROLES.includes(user.role));

      return true;
    } catch (error) {
      return false;
    }
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await logoutApi(refreshToken);
      }
    } catch (error) {
      // even if backend fails → continue logout
    } finally {
      localStorage.clear();
      setAdmin(null);
      setIsAdmin(false);
      window.location.href = "/admin/login"; // force redirect
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAdmin,
        login,
        logout,
        loading,
      }}
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