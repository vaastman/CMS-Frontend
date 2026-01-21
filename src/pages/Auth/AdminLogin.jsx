import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAdmin, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* 🔒 Redirect after login */
  useEffect(() => {
    if (!loading && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAdmin, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    const success = await login(email.trim(), password);

    if (!success) {
      toast.error("Invalid email or password");
      setSubmitting(false);
      return;
    }

    toast.success("Login successful");
    setSubmitting(false);
    // 🔁 redirect handled by useEffect
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
          disabled={submitting}
          className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-60"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>

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
