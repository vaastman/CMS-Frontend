import { useState } from "react";

const SubjectCreateModal = ({ open, onClose, onSubmit, loading, semesters, courses }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "",
    semesterId: "",
    courseId: ""
  });

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create Subject</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Subject Name"
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="code"
            placeholder="Subject Code"
            onChange={handleChange}
            required
            className="input"
          />

          <select name="type" onChange={handleChange} required className="input">
            <option value="">Select Type</option>
            <option value="MJC">MJC</option>
            <option value="MIC">MIC</option>
            <option value="MDC">MDC</option>
            <option value="SEC">SEC</option>
            <option value="VAC">VAC</option>
          </select>

          <select name="courseId" onChange={handleChange} required className="input">
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select name="semesterId" onChange={handleChange} required className="input">
            <option value="">Select Semester</option>
            {semesters.map(s => (
              <option key={s.id} value={s.id}>Semester {s.number}</option>
            ))}
          </select>

          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Saving..." : "Create Subject"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectCreateModal;
