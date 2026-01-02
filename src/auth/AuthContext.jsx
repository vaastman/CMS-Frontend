import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState(null);

  /* 🔁 Restore admin session on page reload */
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      setIsAdmin(true);
    }
  }, []);

  /* 🔐 Login */
  const login = (username, password) => {
    // Demo credentials (replace later with API)
    if (username === "admin" && password === "admin123") {
      const adminData = {
        username,
        role: "ADMIN",
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
        isAdmin,
        admin,     // 👈 admin details available everywhere
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
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export default AuthProvider;
