import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createStudent } from "@/api/student.api";
import { getCourses } from "@/api/course.api";
import { getSessions } from "@/api/session.api";
import { getDepartments } from "@/api/department.api";
import { getSemesters } from "@/api/semester.api";
import { uploadStudentDocument } from "@/api/files.api";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  uan_no: "",

  fatherName: "",
  gender: "Gender",
  category: "GENERAL",
  address: "",

  departmentId: "",
  courseId: "",
  sessionId: "",
  semesterId: "",

  admissionType: "NEW",
  academicYear: "2025-26",

  meritListType: "",
  profileNo: "",
  confidentialNo: "",
  admissionNo: "",
  university_roll: "",
};

const AddStudent = ({ onSuccess }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [photo, setPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  /* ================= LOAD MASTER DATA ================= */

  useEffect(() => {
    Promise.all([getDepartments(), getCourses(), getSessions()])
      .then(([d, c, s]) => {
        setDepartments(d?.data?.data?.departments || []);
        setCourses(c?.data?.data?.courses || []);
        setSessions(s?.data?.data?.sessions || []);
      })
      .catch(() => toast.error("Failed to load master data"));
  }, []);

  /* ================= LOAD SEMESTERS ================= */

  useEffect(() => {
    if (!form.courseId) {
      setSemesters([]);
      return;
    }

    getSemesters({ courseId: form.courseId })
      .then((res) => setSemesters(res?.data?.data?.semesters || []))
      .catch(() => toast.error("Failed to load semesters"));
  }, [form.courseId]);

  /* ================= HANDLER ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "departmentId") {
      setForm({ ...form, departmentId: value, courseId: "", semesterId: "" });
    } else if (name === "courseId") {
      setForm({ ...form, courseId: value, semesterId: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ================= PHOTO UPLOAD ================= */

  const uploadStudentPhoto = async (file, studentId) => {
    try {
      setUploadingPhoto(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", "photo");
      formData.append("documentType", "PHOTO");
      formData.append("studentId", studentId);

      const res = await uploadStudentDocument(formData);
      return res?.data?.data?.fileUrl;
    } catch (err) {
      toast.error("Photo upload failed");
      throw err;
    } finally {
      setUploadingPhoto(false);
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) return toast.error("Name required");
    if (!form.phone) return toast.error("Phone required");

    try {
      setLoading(true);

      let photoUrl;

      const payload = {
        ...form,
        fatherName: form.fatherName || null,
        address: form.address || null,
        meritListType: form.meritListType || null,
        profileNo: form.profileNo || null,
        confidentialNo: form.confidentialNo || null,
        admissionNo: form.admissionNo || null,
        university_roll: form.university_roll || null,
      };

      const res = await createStudent(payload);

      const studentId = res?.data?.data?.student?.id;

      if (photo && studentId) {
        photoUrl = await uploadStudentPhoto(photo, studentId);
      }

      toast.success("Student admitted successfully 🎉");

      setForm(INITIAL_FORM);
      setPhoto(null);

      onSuccess?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Admission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ===== Profile Upload ===== */}
     {/* ===== Profile Upload ===== */}
<div className="flex items-center gap-6 border-b pb-4">

  <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
    {photo ? (
      <img
        src={URL.createObjectURL(photo)}
        alt="preview"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-gray-400 text-sm">Photo</span>
    )}
  </div>

  <div>
    <label className="cursor-pointer">
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      <span className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
        Upload Profile Photo
      </span>
    </label>

  </div>

</div>

      {/* ===== Personal Info ===== */}

      <div>
        <h3 className="font-semibold mb-3">Personal Information</h3>

        <div className="grid grid-cols-2 gap-4">

          <input className="input" name="name" placeholder="Student Name *" value={form.name} onChange={handleChange}/>
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange}/>

          <input className="input" name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange}/>
          <input className="input" name="uan_no" placeholder="UAN Number" value={form.uan_no} onChange={handleChange}/>

          <input className="input" name="fatherName" placeholder="Father Name" value={form.fatherName} onChange={handleChange}/>
          <input className="input" name="profileNo" placeholder="Profile Number" value={form.profileNo} onChange={handleChange}/>

          <select className="input" name="gender" value={form.gender} onChange={handleChange}>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <select className="input" name="category" value={form.category} onChange={handleChange}>
            <option value="GENERAL">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="BC_I">BC-I</option>
            <option value="BC_II">BC-II</option>
            <option value="EWS">EWS</option>
          </select>

          <textarea className="input col-span-2" name="address" placeholder="Address" value={form.address} onChange={handleChange}/>

        </div>
      </div>

      {/* ===== Academic Details ===== */}

      <div>
        <h3 className="font-semibold mb-3">Academic Details</h3>

        <div className="grid grid-cols-2 gap-4">

          <select className="input" name="departmentId" value={form.departmentId} onChange={handleChange}>
            <option value="">Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select className="input" name="sessionId" value={form.sessionId} onChange={handleChange}>
            <option value="">Session</option>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select className="input" name="courseId" value={form.courseId} onChange={handleChange}>
            <option value="">Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select className="input" name="semesterId" value={form.semesterId} onChange={handleChange}>
            <option value="">Semester</option>
            {semesters.map((s) => (
              <option key={s.id} value={s.id}>Semester {s.number}</option>
            ))}
          </select>

          <input className="input" name="academicYear" value={form.academicYear} onChange={handleChange} placeholder="Academic Year"/>

          <select className="input" name="admissionType" value={form.admissionType} onChange={handleChange}>
            <option value="NEW">New Admission</option>
            <option value="CONTINUATION">Continuation</option>
          </select>

        </div>
      </div>

      {/* ===== Extra University Details ===== */}

      <div>
        <h3 className="font-semibold mb-3">University Details</h3>

        <div className="grid grid-cols-2 gap-4">

          <input className="input" name="meritListType" placeholder="Merit List Type" value={form.meritListType} onChange={handleChange}/>
          <input className="input" name="confidentialNo" placeholder="Confidential Number" value={form.confidentialNo} onChange={handleChange}/>

          <input className="input" name="admissionNo" placeholder="Admission Number" value={form.admissionNo} onChange={handleChange}/>
          <input className="input" name="university_roll" placeholder="University Roll Number" value={form.university_roll} onChange={handleChange}/>

        </div>
      </div>

      <button
  disabled={loading || uploadingPhoto}
  className="
    w-full
    py-3
    rounded-lg
    text-white
    font-medium
    transition
    disabled:opacity-60
    hover:opacity-90
  "
  style={{ backgroundColor: "var(--color-primary)" }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--color-secondary)")}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
>
  {uploadingPhoto
    ? "Uploading Photo..."
    : loading
    ? "Saving..."
    : "Create Admission"}
</button>

    </form>
  );
};

export default AddStudent;