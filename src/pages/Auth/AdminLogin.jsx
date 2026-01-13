import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔒 Auto redirect
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl shadow w-full max-w-md bg-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <button className="w-full py-2 rounded bg-blue-600 text-white">
          Login
        </button>

        {/* Demo Fill */}
        <button
          type="button"
          onClick={() => {
            setEmail("admin@test.com");
            setPassword("admin123");
          }}
          className="w-full mt-3 py-2 border rounded"
        >
          Use Demo Account
        </button>

        <p className="text-xs text-center mt-4 text-gray-500">
          Demo → <b>admin@test.com / admin123</b>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
