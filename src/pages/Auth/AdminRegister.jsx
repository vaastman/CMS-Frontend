import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "ADMIN",
    accessPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      setSuccess("Account created successfully");
      setTimeout(() => navigate("/admin/login"), 1500);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed");
      }
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

        {error && (
          <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 px-3 py-2 rounded mb-4 text-sm">
            {success}
          </p>
        )}

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

        {/* Phone (Optional) */}
        <div className="mb-4">
          <label className="text-sm">Phone (optional)</label>
          <input
            type="text"
            name="phone"
            className="w-full px-3 py-2 rounded border text-sm"
            value={form.phone}
            onChange={handleChange}
            placeholder="10 digit number"
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
          type="submit"
          className="w-full py-2 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
