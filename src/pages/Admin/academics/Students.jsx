import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";

import { createStudent, updateStudent } from "@/api/student.api";
import { getSessions } from "@/api/session.api";
import { getCourses } from "@/api/course.api";
import { getDepartments } from "@/api/department.api";
import { getSemesters } from "@/api/semester.api";
import { uploadStudentDocument } from "@/api/files.api";


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
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6 overflow-y-auto max-h-[70vh]"
            >
              {/* ===== Profile Upload ===== */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : existingPhotoUrl ? (
                    <img
                      src={existingPhotoUrl}
                      alt="existing"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">Photo</span>
                  )}

                </div>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  <span className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-100">
                    Upload Photo
                  </span>
                </label>
              </div>

              {/* ===== Auto Generated IDs ===== */}
              <div className="grid grid-cols-2 gap-4">
                <input className="input" name="reg_no" onChange={handleChange} placeholder="Registration Number" value={form.reg_no} />
                <input className="input" name="uan_no" onChange={handleChange} placeholder="UAN Number" value={form.uan_no} />
              </div>

              {/* ===== Personal Info ===== */}
              <div>
                <h3 className="font-medium mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">

                  {/* Name */}
                  <div>
                    <input
                      className={`input ${errors.name ? "border-red-500" : ""}`}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name *"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      className={`input ${errors.email ? "border-red-500" : ""}`}
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email *"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      className={`input ${errors.phone ? "border-red-500" : ""}`}
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone *"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* DOB */}
                  <div>
                    <input
                      type="date"
                      className={`input ${errors.dob ? "border-red-500" : ""}`}
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                    )}
                  </div>

                  <input
                    className="input col-span-2"
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                    placeholder="Father Name"
                  />

                  <textarea
                    className="input col-span-2"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />

                </div>
              </div>

              {/* ===== Academic Info ===== */}
              <div>
                <h3 className="font-medium mb-3">Academic Details</h3>
                <div className="grid grid-cols-2 gap-4">

                  {/* Department */}
                  <div>
                    <select
                      className={`input ${errors.departmentId ? "border-red-500" : ""}`}
                      name="departmentId"
                      value={form.departmentId}
                      onChange={handleChange}
                    >
                      <option value="">Department *</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                    {errors.departmentId && (
                      <p className="text-red-500 text-xs mt-1">{errors.departmentId}</p>
                    )}
                  </div>

                  {/* Session */}
                  <div>
                    <select
                      className={`input ${errors.sessionId ? "border-red-500" : ""}`}
                      name="sessionId"
                      value={form.sessionId}
                      onChange={handleChange}
                    >
                      <option value="">Session *</option>
                      {sessions.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    {errors.sessionId && (
                      <p className="text-red-500 text-xs mt-1">{errors.sessionId}</p>
                    )}
                  </div>

                  {/* Course */}
                  <div>
                    <select
                      className={`input ${errors.courseId ? "border-red-500" : ""}`}
                      name="courseId"
                      value={form.courseId}
                      onChange={handleChange}
                      disabled={!form.departmentId}
                    >
                      <option value="">Course *</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    {errors.courseId && (
                      <p className="text-red-500 text-xs mt-1">{errors.courseId}</p>
                    )}
                  </div>

                  {/* Semester */}
                  <div>
                    <select
                      className={`input ${errors.semesterId ? "border-red-500" : ""}`}
                      name="semesterId"
                      value={form.semesterId}
                      onChange={handleChange}
                      disabled={!form.courseId}
                    >
                      <option value="">Semester *</option>
                      {filteredSemesters.map((s) => (
                        <option key={s.id} value={s.id}>Semester {s.number}</option>
                      ))}
                    </select>
                    {errors.semesterId && (
                      <p className="text-red-500 text-xs mt-1">{errors.semesterId}</p>
                    )}
                  </div>

                  {/* Academic Year */}
                  <div>
                    <input
                      className={`input ${errors.academicYear ? "border-red-500" : ""}`}
                      name="academicYear"
                      value={form.academicYear}
                      onChange={handleChange}
                      placeholder="Academic Year (2025-26)"
                    />
                    {errors.academicYear && (
                      <p className="text-red-500 text-xs mt-1">{errors.academicYear}</p>
                    )}
                  </div>

                  <select
                    className="input col-span-2"
                    name="admissionType"
                    value={form.admissionType}
                    onChange={handleChange}
                  >
                    <option value="NEW">New Admission</option>
                    <option value="CONTINUATION">Continuation</option>
                  </select>

                </div>
              </div>

              {/* ===== Footer Buttons ===== */}
              <div className="sticky bottom-0 bg-white pt-4 border-t flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingPhoto}
                  className="
    px-6 py-2 rounded-lg text-white
    flex items-center justify-center gap-2
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {(uploadingPhoto || loading) && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}

                  {uploadingPhoto
                    ? "Uploading Photo..."
                    : loading
                      ? "Saving..."
                      : isEdit
                        ? "Update Student"
                        : "Create Student"}
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
