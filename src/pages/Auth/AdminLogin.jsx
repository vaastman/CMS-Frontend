import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  /* 🔒 If already logged in, redirect */
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/admin", { replace: true });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-background)] px-4">

      <form
        onSubmit={handleSubmit}
        className="
          bg-[color:var(--color-surface)]
          p-8 rounded-2xl shadow-md
          w-full max-w-md
        "
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-[color:var(--color-text-primary)]">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            className="
              w-full border rounded-lg px-3 py-2
              focus:outline-none
              focus:ring-2
              focus:ring-[color:var(--color-primary)]
            "
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
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="
              w-full border rounded-lg px-3 py-2
              focus:outline-none
              focus:ring-2
              focus:ring-[color:var(--color-primary)]
            "
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
          className="
            w-full
            bg-[color:var(--color-primary)]
            hover:opacity-90
            text-white py-2 rounded-lg transition
          "
        >
          Login
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Demo Login → <b>admin / admin123</b>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
