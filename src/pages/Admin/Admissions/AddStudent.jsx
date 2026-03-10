import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createStudent } from "@/api/student.api";
import { getCourses } from "@/api/course.api";
import { getSessions } from "@/api/session.api";
import { getDepartments } from "@/api/department.api";
import { getSemesters } from "@/api/semester.api";
import { uploadFile } from "@/api/files.api";

const inputClass =
  "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  uan_no: "",
  reg_no: "",

  fatherName: "",
  gender: "",
  category: "",
  address: "",

  departmentId: "",
  courseId: "",
  sessionId: "",
  semesterId: "",

  admissionType: "NEW",
  academicYear: "2025-26",

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

  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phone = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone });
      return;
    }

    if (name === "departmentId") {
      setForm({ ...form, departmentId: value, courseId: "", semesterId: "" });
    } else if (name === "courseId") {
      setForm({ ...form, courseId: value, semesterId: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ================= PHOTO UPLOAD ================= */

// const uploadStudentPhoto = async (file, studentId) => {
//   try {
//     setUploadingPhoto(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileType", "photo");
//     formData.append("documentType", "PHOTO");
//     formData.append("studentId", studentId);

//     await uploadStudentDocument(formData);

//   } catch {
//     toast.error("Photo upload failed");
//   } finally {
//     setUploadingPhoto(false);
//   }
// };
const uploadStudentPhoto = async (file, studentId) => {
  try {
    setUploadingPhoto(true);

    const res = await uploadFile({
      file,
      fileType: "photo",
      studentId
    });

    console.log("Upload success:", res);

  } catch (err) {
    console.error(err);
    toast.error("Photo upload failed");
  } finally {
    setUploadingPhoto(false);
  }
};
  /* ================= VALIDATION ================= */

  const validate = () => {
    if (!form.name.trim()) return toast.error("Student name required");

    if (!form.email.trim()) return toast.error("Email required");

    if (!form.phone || form.phone.length !== 10)
      return toast.error("Phone must be 10 digits");

    if (!form.uan_no.trim())
      return toast.error("UAN number required");

    if (!form.departmentId)
      return toast.error("Select department");

    if (!form.courseId)
      return toast.error("Select course");

    if (!form.sessionId)
      return toast.error("Select session");

    if (!form.semesterId)
      return toast.error("Select semester");

    return true;
  };

  /* ================= SUBMIT ================= */

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    const payload = {
      reg_no: form.reg_no?.trim(),
      uan_no: form.uan_no?.trim(),
      name: form.name?.trim(),
      email: form.email?.trim(),
      phone: form.phone?.trim(),
      departmentId: form.departmentId,
      courseId: form.courseId,
      sessionId: form.sessionId,
      semesterId: form.semesterId,
      admissionType: form.admissionType,
      academicYear: form.academicYear
    };

    if (form.fatherName?.trim()) payload.fatherName = form.fatherName.trim();
    if (form.gender) payload.gender = form.gender;
    if (form.category) payload.category = form.category;
    if (form.address?.trim()) payload.address = form.address.trim();
    if (form.university_roll?.trim()) payload.university_roll = form.university_roll.trim();
    if (form.dob) payload.dob = form.dob;

    const res = await createStudent(payload);

    const studentId = res?.data?.data?.id;

    // if (photo && studentId) {
    //   const photoUrl = await uploadStudentPhoto(photo, studentId);

    //   if (photoUrl) {
    //     await updateStudent(studentId, { photoUrl });
    //   }
    // }
    if (photo && studentId) {
  await uploadStudentPhoto(photo, studentId);
}

    toast.success("Student admitted successfully 🎉");

    setForm(INITIAL_FORM);
    setPhoto(null);

    onSuccess?.();

  } catch (err) {
    const errorMessage =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Admission failed";

    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};
  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-6 rounded-xl shadow-sm"
    >

      {/* PHOTO */}
      <div className="flex items-center gap-6 border-b pb-6">
        <div className="w-24 h-24 rounded-full border overflow-hidden bg-gray-100 flex items-center justify-center">
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              alt="preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 text-sm">Photo</span>
          )}
        </div>

        <label className="cursor-pointer text-sm border px-4 py-2 rounded-lg hover:bg-gray-50">
          Upload Photo
          <input
  type="file"
  hidden
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Only image allowed");
      return;
    }

    setPhoto(file);
  }}
/>
        </label>
      </div>

      {/* PERSONAL INFO */}
      <Section title="Personal Information">
        <Input name="name" label="Student Name *" value={form.name} onChange={handleChange} />
        <Input name="email" label="Email *" value={form.email} onChange={handleChange} />
        <Input name="phone" label="Phone *" value={form.phone} onChange={handleChange} />
        <Input name="reg_no" label="Registration Number" value={form.reg_no} onChange={handleChange} />
        <Input name="uan_no" label="UAN Number *" value={form.uan_no} onChange={handleChange} />
        <Input name="fatherName" label="Father Name" value={form.fatherName} onChange={handleChange} />

        <Select name="gender" label="Gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </Select>

        <Select name="category" label="Category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="GENERAL">General</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="BC_I">BC-I</option>
          <option value="BC_II">BC-II</option>
          <option value="EWS">EWS</option>
        </Select>

        <textarea
          className={`${inputClass} col-span-2`}
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
      </Section>

      {/* ACADEMIC */}
      <Section title="Academic Details">

        <Select name="departmentId" label="Department" value={form.departmentId} onChange={handleChange}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </Select>

        <Select name="sessionId" label="Session" value={form.sessionId} onChange={handleChange}>
          <option value="">Select Session</option>
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>

        <Select name="courseId" label="Course" value={form.courseId} onChange={handleChange}>
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>

        <Select name="semesterId" label="Semester" value={form.semesterId} onChange={handleChange}>
          <option value="">Select Semester</option>
          {semesters.map((s) => (
            <option key={s.id} value={s.id}>
              Semester {s.number}
            </option>
          ))}
        </Select>

        <Input name="academicYear" label="Academic Year" value={form.academicYear} onChange={handleChange} />

        <Select name="admissionType" label="Admission Type" value={form.admissionType} onChange={handleChange}>
          <option value="NEW">New Admission</option>
          <option value="CONTINUATION">Continuation</option>
        </Select>

      </Section>

      {/* UNIVERSITY */}
      <Section title="University Details">
        <Input
          name="university_roll"
          label="University Roll Number"
          value={form.university_roll}
          onChange={handleChange}
        />
      </Section>

      <button
        disabled={loading || uploadingPhoto}
        className="w-full py-3 rounded-lg text-white font-medium transition disabled:opacity-60"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {uploadingPhoto ? "Uploading Photo..." : loading ? "Saving..." : "Create Admission"}
      </button>

    </form>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }) => (
  <div>
    <h3 className="font-semibold mb-4 text-gray-700">{title}</h3>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600 mb-1 block">{label}</label>
    <input {...props} className={inputClass} />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <label className="text-sm text-gray-600 mb-1 block">{label}</label>
    <select {...props} className={inputClass}>
      {children}
    </select>
  </div>
);

export default AddStudent;