import { createContext, useContext, useEffect, useState } from "react";
import { adminLoginApi, logoutApi } from "@/api/auth.api";

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
      const token = localStorage.getItem("token");

      if (!storedUser || !token) {
        setLoading(false);
        return;
      }

      // 🔥 VERIFY TOKEN WITH BACKEND
      await api.get("/auth/me"); 
      // This must be a protected route that uses protect middleware

      const parsedUser = JSON.parse(storedUser);
      setAdmin(parsedUser);
      setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));

    } catch (err) {
      // 🔥 If token invalid (like API switched) → force logout
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

      // ✅ Store both tokens
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
  const refreshToken = localStorage.getItem("refreshToken");

  // 🔥 Clear frontend first
  localStorage.clear();
  setAdmin(null);
  setIsAdmin(false);

  // Optional backend logout
  try {
    if (refreshToken) {
      await logoutApi(refreshToken);
    }
  } catch (error) {
    console.warn("Backend logout failed, but frontend cleared.");
  }
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
