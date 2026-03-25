import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";

import { createStudent, updateStudent } from "@/api/student.api";
import { getSessions } from "@/api/session.api";
import { getCourses } from "@/api/course.api";
import { getDepartments } from "@/api/department.api";
import { getSemesters } from "@/api/semester.api";

import AddStudent from "../Admissions/AddStudent";

/* ================= INITIAL FORM ================= */
const initialForm = {
  reg_no: "",
  uan_no: "",
  name: "",
  email: "",
  phone: "",
  dob: "",
  fatherName: "",
  gender: "",
  category: "",
  address: "",
  departmentId: "",
  sessionId: "",
  courseId: "",
  semesterId: "",
  admissionType: "NEW",
  academicYear: "2025-26",
};

const Students = () => {
  /* ================= STATE ================= */
  const [form, setForm] = useState(initialForm);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    session: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [refreshKey, setRefreshKey] = useState(0);

  /* ================= STEP 1: SESSIONS ================= */
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const res = await getSessions();
      setSessions(res?.data?.data?.sessions || []);
    } catch {
      toast.error("Failed to load sessions");
    }
  };

  /* ================= STEP 2: DEPARTMENTS ================= */
  useEffect(() => {
    if (openStudentModal && departments.length === 0) {
      loadDepartments();
    }
  }, [openStudentModal]);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res?.data?.data?.departments || res?.data?.data || []);
    } catch {
      toast.error("Failed to load departments");
    }
  };

  /* ================= STEP 3: COURSES ================= */
  useEffect(() => {
    if (!form.departmentId) {
      setCourses([]);
      return;
    }

    getCourses({
      departmentId: form.departmentId,
      sessionId: form.sessionId || undefined,
    })
      .then((res) => setCourses(res?.data?.data?.courses || []))
      .catch(() => toast.error("Failed to load courses"));
  }, [form.departmentId, form.sessionId]);

  /* ================= STEP 4: SEMESTERS ================= */
  useEffect(() => {
    if (form.courseId) {
      loadSemesters(); // 🔥 fixed bug (always reload)
    }
  }, [form.courseId]);

  const loadSemesters = async () => {
    try {
      const res = await getSemesters();
      setSemesters(res?.data?.data?.semesters || res?.data?.data || []);
    } catch {
      toast.error("Failed to load semesters");
    }
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "departmentId") {
      setForm({ ...form, departmentId: value, courseId: "", semesterId: "" });
    } else if (name === "sessionId") {
      setForm({ ...form, sessionId: value, courseId: "", semesterId: "" });
    } else if (name === "courseId") {
      setForm({ ...form, courseId: value, semesterId: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ================= CLOSE MODAL ================= */
  const closeModal = () => {
    setOpenStudentModal(false);
    setForm(initialForm);
    setIsEdit(false);
    setEditingStudentId(null);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      if (isEdit) {
        await updateStudent(editingStudentId, payload);
        toast.success("Student updated ✅");
      } else {
        await createStudent(payload);
        toast.success("Student added 🎉");
      }

      closeModal();
      setRefreshKey((k) => k + 1);
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (student) => {
    setIsEdit(true);
    setEditingStudentId(student.id);

    setForm({
      ...initialForm,
      reg_no: student.reg_no || "",
      uan_no: student.uan_no || "",
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      dob: student.dob?.split("T")[0] || "",
      fatherName: student.fatherName || "",
      gender: student.gender?.toUpperCase() || "",
      category: student.category?.toUpperCase() || "",
      address: student.address || "",
      departmentId: student.department?.id || "",
      sessionId: student.session?.id || "",
      courseId: student.course?.id || "",
      semesterId: student.semesters?.[0]?.semesterId || "",
    });

    setOpenStudentModal(true);
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Students</h1>

        <button
          onClick={() => {
            setIsEdit(false);
            setForm(initialForm);
            setOpenStudentModal(true);
          }}
          className="px-5 py-2 rounded-xl text-white"
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

      <StudentTable
        search={search}
        filters={filters}
        refreshKey={refreshKey}
        onEdit={handleEdit}
      />

      {/* MODAL */}
      {openStudentModal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="px-6 py-4 border-b flex justify-between">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Update Student" : "Add Student"}
              </h2>
              <button onClick={closeModal}>✕</button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-6">
              <AddStudent
                onSuccess={() => {
                  closeModal();
                  setRefreshKey((k) => k + 1);
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Students;