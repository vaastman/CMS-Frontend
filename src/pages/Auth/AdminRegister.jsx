import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { adminRegisterApi } from "@/api.auth.api";
import { toast } from "react-toastify";
import { MdEmail, MdLock, MdPhone, MdAdminPanelSettings, MdVpnKey, MdPerson } from "react-icons/md";
import { IoArrowForward, IoShieldCheckmark } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserShield, FaCheckCircle } from "react-icons/fa";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "ADMIN",
    accessPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧠 Frontend validation (mirror backend)
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!form.accessPassword) {
      toast.error("Access password is required");
      return;
    }

    setLoading(true);

    try {
      // await adminRegisterApi(form);
      toast.success("Admin account created successfully");
      setTimeout(() => navigate("/admin/login"), 1200);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
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
            Join Our Admin Team
          </h2>
          <p className="text-blue-100 text-lg mb-12 leading-relaxed">
            Create your account to access the powerful admin dashboard and manage your organization efficiently.
          </p>

          {/* Features List */}
          <div className="space-y-4">
            {[
              "Comprehensive Dashboard Access",
              "Real-time Analytics & Reporting",
              "Secure Role-Based Permissions",
              "24/7 Support & Documentation"
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

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
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
                Create Account
              </h2>
              <p className="text-gray-500">
                Fill in your details to get started
              </p>
            </div>

            {/* Form Grid - 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="name"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="admin@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="password"
                    name="password"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="phone"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <MdAdminPanelSettings className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none z-10" />
                  <select
                    name="role"
                    className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-white cursor-pointer"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="HOD">Head of Department</option>
                    <option value="ACCOUNTANT">Accountant</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Access Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Key
                </label>
                <div className="relative">
                  <MdVpnKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="password"
                    name="accessPassword"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Enter access key"
                    value={form.accessPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <IoShieldCheckmark className="text-blue-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium">Secure Registration</p>
                <p className="text-xs text-blue-700 mt-1">
                  Your information is encrypted and securely stored. Access key is required for admin registration.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <IoArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/admin/login"
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>

          {/* Copyright - Mobile */}
          <p className="text-center mt-6 text-white/70 text-sm lg:hidden">
            © 2024 Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;