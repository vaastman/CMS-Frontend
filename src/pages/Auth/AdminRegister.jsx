import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { adminRegisterApi } from "@/api.auth.api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


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
      await adminRegisterApi(form);

      toast.success("Admin account created successfully");
      setTimeout(() => navigate("/admin/login"), 1200);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-2xl font-semibold text-center mb-6">
          Admin Registration
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 rounded border text-sm"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 rounded border text-sm"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 rounded border text-sm"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="text-sm">Phone (optional)</label>
          <input
            type="text"
            name="phone"
            className="w-full px-3 py-2 rounded border text-sm"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="text-sm">Role</label>
          <select
            name="role"
            className="w-full px-3 py-2 rounded border text-sm"
            value={form.role}
            onChange={handleChange}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="HOD">HOD</option>
            <option value="ACCOUNTANT">ACCOUNTANT</option>
          </select>
        </div>

        {/* Access Password */}
        <div className="mb-6">
          <label className="text-sm">Access Password</label>
          <input
            type="password"
            name="accessPassword"
            className="w-full px-3 py-2 rounded border text-sm"
            value={form.accessPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 rounded-lg text-white text-sm font-medium disabled:opacity-60"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {/* Already Registered */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already registered?{" "}
          <Link
            to="/admin/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default AdminRegister;
