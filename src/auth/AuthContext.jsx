import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// 🔑 Demo admin credentials (frontend-only)
const DEMO_ADMIN = {
  email: "admin@test.com",
  password: "admin123",
  role: "ADMIN",
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  /* 🔁 Restore admin session on page reload */
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
      setIsAdmin(parsedAdmin.role === "ADMIN");
    }
  }, []);

  /* 🔐 Login (NO BACKEND – DEMO ONLY) */
  const login = (email, password) => {
    if (
      email === DEMO_ADMIN.email &&
      password === DEMO_ADMIN.password
    ) {
      const adminData = {
        email: DEMO_ADMIN.email,
        role: DEMO_ADMIN.role,
        loginAt: new Date().toISOString(),
      };

      localStorage.setItem("admin", JSON.stringify(adminData));
      setAdmin(adminData);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  /* 🚪 Logout */
  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,    // admin details
        isAdmin,  // boolean for route protection
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthProvider;
