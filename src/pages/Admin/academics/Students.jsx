import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";

import { createStudent, updateStudent } from "@/api/student.api";
import { getSessions } from "@/api/session.api";
import { getCourses } from "@/api/course.api";
import { getDepartments } from "@/api/department.api";
import { getSemesters } from "@/api/semester.api";
// import { uploadStudentDocument } from "@/api/files.api";
import AddStudent from "../Admissions/AddStudent";


/* ================= AUTO GENERATORS ================= */
// const generateRegNo = () => {
//   const year = new Date().getFullYear();
//   const rand = Math.floor(100000 + Math.random() * 900000);
//   return `REG-${year}-${rand}`;
// };

// const generateUanNo = () => {
//   const rand = Math.floor(100000 + Math.random() * 900000);
//   return `UAN-SSDM-${rand}`;
// };

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
  const [errors, setErrors] = useState({});
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
  const [photo, setPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState(null);



  /* ================= LOAD DATA ================= */
  useEffect(() => {
    getSessions()
      .then((res) => setSessions(res?.data?.data?.sessions || []))
      .catch(() => toast.error("Failed to load sessions"));

    getDepartments()
      .then((res) =>
        setDepartments(res?.data?.data?.departments || res?.data?.data || [])
      )
      .catch(() => toast.error("Failed to load departments"));

    getSemesters()
      .then((res) =>
        setSemesters(res?.data?.data?.semesters || res?.data?.data || [])
      )
      .catch(() => toast.error("Failed to load semesters"));
  }, []);

  /* ================= LOAD COURSES (BY DEPARTMENT + SESSION) ================= */
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

  /* ================= FILTER SEMESTERS ================= */
  const filteredSemesters = semesters.filter(
    (s) => s.courseId === form.courseId
  );

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

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  /* ================= CLOSE MODAL ================= */
  const closeModal = () => {
    setOpenStudentModal(false);
    setForm(initialForm);
    setIsEdit(false);
    setEditingStudentId(null);
    setPhoto(null);
    setErrors({});
  };

  /* ================= PHOTO UPLOAD (MULTIPART) ================= */
  const uploadStudentPhoto = async (file, studentId) => {
    try {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        throw new Error("Invalid file type");
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        throw new Error("File too large");
      }

      setUploadingPhoto(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", "photo");
      formData.append("documentType", "PHOTO"); // ✅ REQUIRED
      formData.append("studentId", editingStudentId); // ✅ REQUIRED

      const res = await uploadStudentDocument(formData);

      return res?.data?.data?.fileUrl;
    } catch (error) {
      console.error(error?.response?.data || error);
      toast.error(
        error?.response?.data?.message || "Photo upload failed"
      );
      throw error;
    } finally {
      setUploadingPhoto(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      setLoading(true);

      let photoUrl;

      if (photo && isEdit) {
        photoUrl = await uploadStudentPhoto(photo, editingStudentId);
      }

      const payload = {
        reg_no: form.reg_no,
        uan_no: form.uan_no,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dob: form.dob || undefined,
        fatherName: form.fatherName || undefined,
        gender: form.gender ? form.gender.toUpperCase() : undefined,
        category: form.category ? form.category.toUpperCase() : undefined,
        address: form.address || undefined,

        departmentId: form.departmentId,
        courseId: form.courseId,
        sessionId: form.sessionId,
        semesterId: form.semesterId,

        admissionType: form.admissionType,
        academicYear: form.academicYear,

        ...(photoUrl && { photoUrl }),
      };

      if (isEdit) {
        await updateStudent(editingStudentId, payload);
        toast.success("Student updated successfully ✅");
      } else {
        await createStudent(payload);
        toast.success("Student admitted successfully 🎉");
      }

      closeModal();
      setRefreshKey((k) => k + 1);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        "Student creation failed"
      );
    } finally {
      setLoading(false);
    }
  };



  /* ================= EDIT ================= */
  const handleEdit = (student) => {
    setIsEdit(true);
    setEditingStudentId(student.id);
    setExistingPhotoUrl(student.photo || null);
    setPhoto(null);

    setForm({
      ...initialForm,
      reg_no: student.reg_no || "",
      uan_no: student.uan_no || "",
      name: student.name,
      email: student.email,
      phone: student.phone,
      dob: student.dob ? student.dob.split("T")[0] : "",
      fatherName: student.fatherName || "",
      gender: student.gender ? student.gender.toUpperCase() : "",
      category: student.category ? student.category.toUpperCase() : "",
      address: student.address || "",
      departmentId: student.department?.id || "",
      sessionId: student.session?.id || "",
      courseId: student.course?.id || "",
      semesterId: student.semesters?.[0]?.semesterId || "",
      admissionType: student.admissions?.[0]?.type || "NEW",
      academicYear: student.admissions?.[0]?.academicYear || "2025-26",
    });


    setOpenStudentModal(true);
  };
  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    // DOB (optional but if entered, must be 16+)
    if (form.dob) {
      const today = new Date();
      const birthDate = new Date(form.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16) {
        newErrors.dob = "Student must be at least 16 years old";
      }
    }

    // Academic Year
    if (!/^\d{4}-\d{2}$/.test(form.academicYear)) {
      newErrors.academicYear = "Format must be 2025-26";
    }

    if (!form.departmentId) {
      newErrors.departmentId = "Department is required";
    }

    if (!form.sessionId) {
      newErrors.sessionId = "Session is required";
    }

    if (!form.courseId) {
      newErrors.courseId = "Course is required";
    }

    if (!form.semesterId) {
      newErrors.semesterId = "Semester is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Students</h1>

        <button
          onClick={() => {
            setIsEdit(false);
            setForm({
              ...initialForm,
              // reg_no: generateRegNo(),
              // uan_no: generateUanNo(),
            });
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

      {openStudentModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl">

            {/* ===== Header ===== */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Update Student" : "Add New Student"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-black">
                ✕
              </button>
            </div>

            {/* ===== Scrollable Form ===== */}
             <div className="p-6 overflow-y-auto max-h-[75vh]">
        <AddStudent
          onSuccess={() => {
            setOpenStudentModal(false);
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
