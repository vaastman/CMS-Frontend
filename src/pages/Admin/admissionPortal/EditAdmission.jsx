import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAdmissionWindowById,
  updateAdmissionWindow,
} from "@/api/admissionWindow.api";

const EditAdmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    enabled: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdmissionWindowById(id);
      const data = res.data.data.admissionWindow;

      setForm({
        title: data.title,
        startDate: data.startDate.slice(0, 10),
        endDate: data.endDate.slice(0, 10),
        enabled: data.enabled,
      });
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm({ ...form, [e.target.name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await updateAdmissionWindow(id, form);
      toast.success("Admission updated successfully");
      navigate("/admin/admission-portal");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[color:var(--color-primary)]">
        Edit Admission Portal
      </h2>

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow border space-y-4"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="enabled"
            checked={form.enabled}
            onChange={handleChange}
          />
          Enable Admission
        </label>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Update Admission
        </button>
      </form>
    </div>
  );
};

export default EditAdmission;