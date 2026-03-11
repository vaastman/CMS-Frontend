import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { fetchStudents } from "@/api/student.api";
import { getCourses } from "@/api/course.api";
import { createAdmission } from "@/api/admissions.api";

const CreateStudentAdmission = () => {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    studentId: "",
    courseId: ""
  });

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= LOAD DATA ================= */

  useEffect(() => {

    const loadData = async () => {

      try {

        const studentRes = await fetchStudents();
        const courseRes = await getCourses();

        setStudents(studentRes?.data?.data?.students || []);
        setCourses(courseRes?.data?.data?.courses || []);

      } catch (err) {

        console.error(err);
        toast.error("Failed to load students or courses");

      }

    };

    loadData();

  }, []);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.studentId) {
      toast.error("Please select student");
      return;
    }

    if (!form.courseId) {
      toast.error("Please select course");
      return;
    }

    try {

      setLoading(true);

      await createAdmission({
        studentId: form.studentId,
        courseId: form.courseId
      });

      toast.success("Admission created successfully 🎉");

      navigate("/admin/admissions");

    } catch (err) {

      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Failed to create admission"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 max-w-2xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">
        Create Admission
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >

        {/* STUDENT */}

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Select Student
          </label>

          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Student</option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.reg_no})
              </option>
            ))}

          </select>
        </div>


        {/* COURSE */}

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Select Course
          </label>

          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Course</option>

            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}

          </select>
        </div>


        {/* BUTTON */}

        <button
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-medium"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {loading ? "Creating Admission..." : "Create Admission"}
        </button>

      </form>

    </div>

  );

};

export default CreateStudentAdmission;