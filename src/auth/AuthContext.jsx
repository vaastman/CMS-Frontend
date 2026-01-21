import { createContext, useContext, useEffect, useState } from "react";
import { adminLoginApi } from "@/api/auth.api";

const AuthContext = createContext(null);

const ADMIN_ROLES = ["ADMIN", "HOD", "ACCOUNTANT"];

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* 🔁 Restore session */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("admin");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        const parsedUser = JSON.parse(storedUser);
        setAdmin(parsedUser);
        setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));
      }
    } catch (err) {
      console.error("Session restore failed", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  /* 🔐 LOGIN */
const login = async (email, password) => {
  try {
    const res = await adminLoginApi({ email, password });

    // ✅ MATCH BACKEND RESPONSE SHAPE
    const user = res?.data?.data?.user;
    const accessToken = res?.data?.data?.accessToken;

    if (!user || !accessToken || !user.role) {
      console.error("Invalid login response format", res.data);
      return false;
    }

    // ✅ STORE TOKEN + USER
    localStorage.setItem("token", accessToken);
    localStorage.setItem("admin", JSON.stringify(user));

    setAdmin(user);
    setIsAdmin(ADMIN_ROLES.includes(user.role));

    return true;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return false;
  }
};


  /* 🚪 LOGOUT */
  const logout = () => {
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
