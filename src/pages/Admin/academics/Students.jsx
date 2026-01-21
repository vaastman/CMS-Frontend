import { useState } from "react";
import { toast } from "react-toastify";
import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";
import { createStudent } from "@/api/student.api";

const Students = () => {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    guardianName: "",
    address: "",
    courseId: "",
    sessionId: "",
  };

  const [form, setForm] = useState(initialForm);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    session: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.courseId || !form.sessionId) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      ...form,
      dob: form.dob || undefined,
    };

    setLoading(true);
    const toastId = toast.loading("Registering student...");

    try {
      await createStudent(payload);

      toast.update(toastId, {
        render: "Student registered successfully 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setForm(initialForm);
      setOpenStudentModal(false);
    } catch (err) {
      toast.update(toastId, {
        render:
          err?.response?.data?.errors?.[0] ||
          err?.response?.data?.message ||
          "Student registration failed",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p className="text-sm text-gray-500">Academics / Student Management</p>
        </div>

        <button
          onClick={() => setOpenStudentModal(true)}
          className="px-5 py-2 rounded-xl text-sm font-medium text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          + Add Student
        </button>
      </div>

      <StudentFilters
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      <StudentTable search={search} filters={filters} />

      {openStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold mb-4">Student Registration</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="input" name="name" placeholder="Full Name" onChange={handleChange} required />
              <input className="input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input className="input" name="phone" placeholder="Phone" pattern="[0-9]{10,15}" onChange={handleChange} required />
              <input className="input" type="date" name="dob" onChange={handleChange} />
              <input className="input" name="guardianName" placeholder="Guardian Name" onChange={handleChange} />
              <textarea className="input" name="address" placeholder="Address" onChange={handleChange} />

              <select className="input" name="courseId" onChange={handleChange} required>
                <option value="">Select Course</option>
                <option value="550e8400-e29b-41d4-a716-446655440000">B.Tech</option>
              </select>

              <select className="input" name="sessionId" onChange={handleChange} required>
                <option value="">Select Session</option>
                <option value="7d444840-9dc0-11d1-b245-5ffdce74fad2">2024–2028</option>
              </select>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setOpenStudentModal(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-5 py-2 rounded text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}>
                  {loading ? "Registering..." : "Register Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
