import { createContext, useContext, useEffect, useState } from "react";
import { adminLoginApi } from "@/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  /* 🔁 Restore session */
  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setAdmin(parsedUser);
      setIsAdmin(parsedUser.role === "ADMIN");
    }
    setLoading(false);
  }, []);

  /* 🔐 LOGIN */
  const login = async (email, password) => {
    try {
      const res = await adminLoginApi({ email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(user));

      setAdmin(user);
      setIsAdmin(user.role === "ADMIN");

      return true;
    } catch (error) {
      return false;
    }
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setAdmin(null);
    setIsAdmin(false);
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
