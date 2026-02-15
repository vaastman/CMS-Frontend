// import { createContext, useContext, useEffect, useState } from "react";
// import { adminLoginApi } from "@/api/auth.api";

// const AuthContext = createContext(null);

// const ADMIN_ROLES = ["ADMIN", "HOD", "ACCOUNTANT"];

// export const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   /* 🔁 Restore session */
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("admin");
//       const token = localStorage.getItem("token");

//       if (storedUser && token) {
//         const parsedUser = JSON.parse(storedUser);
//         setAdmin(parsedUser);
//         setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));
//       }
//     } catch (err) {
//       console.error("Session restore failed", err);
//       localStorage.clear();
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   /* 🔐 LOGIN */
// const login = async (email, password) => {
//   try {
//     const res = await adminLoginApi({ email, password });

//     // ✅ MATCH BACKEND RESPONSE SHAPE
//     const user = res?.data?.data?.user;
//     const accessToken = res?.data?.data?.accessToken;

//     if (!user || !accessToken || !user.role) {
//       console.error("Invalid login response format", res.data);
//       return false;
//     }

//     // ✅ STORE TOKEN + USER
//     localStorage.setItem("token", accessToken);
//     localStorage.setItem("admin", JSON.stringify(user));

//     setAdmin(user);
//     setIsAdmin(ADMIN_ROLES.includes(user.role));

//     return true;
//   } catch (error) {
//     console.error("Login failed:", error.response?.data || error.message);
//     return false;
//   }
// };


//   /* 🚪 LOGOUT */
//   const logout = () => {
//     localStorage.clear();
//     setAdmin(null);
//     setIsAdmin(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ admin, isAdmin, login, logout, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }
//   return ctx;
// };
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
    const restoreSession = () => {
      try {
        const storedUser = localStorage.getItem("admin");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser);
          setAdmin(parsedUser);
          setIsAdmin(ADMIN_ROLES.includes(parsedUser.role));
        }
      } catch (err) {
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
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
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await logoutApi(refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("admin");

      setAdmin(null);
      setIsAdmin(false);
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
