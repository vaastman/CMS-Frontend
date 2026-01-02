import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  /* 🔒 If already logged in, redirect to admin dashboard */
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (!success) {
      setError("Invalid username or password");
    }
    // ✅ success case handled by useEffect redirect
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-page)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl shadow-md w-full max-w-md"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Username */}
        <div className="mb-4">
          <label
            className="block text-sm mb-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Username
          </label>
          <input
            type="text"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none border"
            style={{ borderColor: "var(--color-divider)" }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="block text-sm mb-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none border"
            style={{ borderColor: "var(--color-divider)" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg text-white text-sm font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Login
        </button>

        <p
          className="text-xs text-center mt-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Demo Login → <b>admin / admin123</b>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
