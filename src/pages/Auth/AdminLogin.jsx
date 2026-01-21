import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔒 Auto redirect */
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);

    if (!success) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful");
    }

    setLoading(false);
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

        <div className="mb-4">
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {/* Not Registered */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Not registered yet?{" "}
          <Link
            to="/admin/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default AdminLogin;
