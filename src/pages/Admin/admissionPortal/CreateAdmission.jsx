import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAdmissionWindow } from "@/api/admissionWindow.api";
import { getCourses } from "@/api/course.api";
import { getDepartments } from "@/api/department.api";

const CreateAdmission = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    title: "",
    courseId: "",
    departmentId: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= FETCH COURSES & DEPARTMENTS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await getCourses();
        const deptRes = await getDepartments();

        setCourses(courseRes?.data?.data?.courses || []);
        setDepartments(deptRes?.data?.data?.departments || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load courses or departments");
      }
    };

    fetchData();
  }, []);

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    try {
      await createAdmissionWindow(form);
      toast.success("Admission window created successfully");
      navigate("/admin/admission-portal");
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Creation failed");
      console.log("ERROR FULL RESPONSE:", err.response);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[color:var(--color-primary)]">
        Create Admission Portal
      </h2>

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow border space-y-4"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Admission Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* Course Dropdown */}
        <select
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        {/* Department Dropdown */}
        <select
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        {/* Start Date */}
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* End Date */}
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Save Admission
        </button>
      </form>
    </div>
  );
};

export default CreateAdmission;