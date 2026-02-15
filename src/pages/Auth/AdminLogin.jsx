import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "react-toastify";
import { MdLock, MdEmail } from "react-icons/md";
import { IoArrowForward, IoShieldCheckmark } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserShield, FaCheckCircle } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAdmin, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ================= REDIRECT IF ALREADY LOGGED IN ================= */
  useEffect(() => {
    if (!loading && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [isAdmin, loading, navigate]);

  /* ================= HANDLE LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setSubmitting(true);

      const success = await login(email.trim(), password);

      if (!success) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful");

      // 🔥 Direct redirect (more reliable than waiting for useEffect)
      navigate("/admin", { replace: true });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-slate-900/90 to-purple-900/95" />
      </div>

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <FaUserShield className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">
                Admin Portal
              </h1>
              <p className="text-blue-200 text-sm">
                Management System
              </p>
            </div>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6">
            Welcome Back
          </h2>

          <div className="space-y-4">
            {[
              "Secure Authentication System",
              "Real-time Dashboard Analytics",
              "Advanced User Management",
              "Complete System Control",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30">
                  <FaCheckCircle className="text-green-400 text-sm" />
                </div>
                <span className="text-white/90">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Sign In
              </h2>
              <p className="text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <IoArrowForward className="text-xl" />
                </>
              )}
            </button>

            {/* Secure Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <IoShieldCheckmark className="text-blue-600 text-xl mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium">
                  Secure Connection
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Your login credentials are encrypted and transmitted securely.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/admin/register"
                  className="text-blue-600 font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
