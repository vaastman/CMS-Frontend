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
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-slate-900/90 to-purple-900/95" />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <FaUserShield className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">Admin Portal</h1>
              <p className="text-blue-200 text-sm">Management System</p>
            </div>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Welcome Back
          </h2>
          <p className="text-blue-100 text-lg mb-12 leading-relaxed">
            Sign in to access your admin dashboard and manage your organization with powerful tools and insights.
          </p>

          {/* Features List */}
          <div className="space-y-4">
            {[
              "Secure Authentication System",
              "Real-time Dashboard Analytics",
              "Advanced User Management",
              "Complete System Control"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center border border-green-400/30">
                  <FaCheckCircle className="text-green-400 text-sm" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <FaUserShield className="text-white text-xl" />
            </div>
            <h1 className="text-white text-xl font-bold">Admin Portal</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Sign In
              </h2>
              <p className="text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
            >
              {submitting ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <IoArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <IoShieldCheckmark className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium">Secure Connection</p>
                <p className="text-xs text-blue-700 mt-1">
                  Your login credentials are encrypted and transmitted securely.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/admin/register"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>

          {/* Copyright - Mobile */}
          <p className="text-center mt-6 text-white/70 text-sm lg:hidden">
            © 2025 Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;