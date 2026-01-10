import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";


const Students = () => {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    fatherName: "",
    gender: "",
    category: "",
    address: "",
    courseId: "",
    sessionId: "",
  };

  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [search, setSearch] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    course: "",
    session: "",
    status: "",
  });



  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    console.log("Submit clicked");

    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.courseId ||
      !form.sessionId
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Registering student...");

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      if (photo) formData.append("photo", photo);

      documents.forEach((file) => {
        formData.append("documents", file);
      });

      await axios.post(
        "http://localhost:5000/api/students",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.update(toastId, {
        render: "Student registered successfully 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Reset UI
      setForm(initialForm);
      setPhoto(null);
      setDocuments([]);
      setPhotoPreview(null);
      setOpenStudentModal(false);

    } catch (error) {
      toast.update(toastId, {
        render:
          error.response?.data?.message || "Student registration failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleDocumentsChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments((prev) => [...prev, ...files]);
  };


  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Academics / Student Management
          </p>
        </div>

        <button
          onClick={() => setOpenStudentModal(true)}
          className="px-5 py-2 rounded-xl text-sm font-medium text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          + Add Student
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <StudentFilters
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      {/* ================= TABLE ================= */}
      <StudentTable search={search} filters={filters} />

      {/* ================= MODAL ================= */}
      {openStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="w-full max-w-5xl rounded-2xl shadow-lg flex flex-col"
            style={{
              backgroundColor: "var(--color-surface)",
              maxHeight: "90vh",
            }}
          >
            {/* ===== MODAL HEADER (STICKY) ===== */}
            <div
              className="flex justify-between items-center px-6 py-4 border-b sticky top-0 z-10"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-divider)",
              }}
            >
              <h3 className="text-lg font-semibold">
                Student Registration
              </h3>
              <button
                onClick={() => setOpenStudentModal(false)}
                className="text-xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* ===== MODAL BODY (SCROLLABLE) ===== */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-8"
            >
              {/* ================= GENERAL INFO ================= */}
              <section>
                <h4 className="font-semibold mb-4">General Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />

                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />

                  <input
                    className="input"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => {
                      if (/^\d{0,10}$/.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                    placeholder="Phone (10 digits)"
                    required
                  />

                  <input
                    className="input"
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                    placeholder="Father's Name"
                  />

                  <input
                    className="input"
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                  />

                  <select
                    className="input"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>

                  <select
                    className="input"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="GENERAL">General</option>
                    <option value="BC_I">BC-I</option>
                    <option value="BC_II">BC-II</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>

                  {/* Photo Upload */}
                  <div className="flex items-center gap-6 md:col-span-2">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400 text-center">
                          Upload<br />Photo
                        </span>
                      )}
                    </div>

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          setPhoto(e.target.files[0]);
                          setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                      <span className="px-4 py-2 border rounded-lg text-sm">
                        Choose Photo
                      </span>
                    </label>
                  </div>

                  <textarea
                    rows="2"
                    className="input md:col-span-2"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
              </section>

              {/* ================= ACADEMIC INFO ================= */}
              <section>
                <h4 className="font-semibold mb-4">Academic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    className="input"
                    name="courseId"
                    value={form.courseId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="COURSE_UUID">B.Tech</option>
                  </select>

                  <select
                    className="input"
                    name="sessionId"
                    value={form.sessionId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Session</option>
                    <option value="SESSION_UUID">2024–2028</option>
                  </select>
                </div>
              </section>

              {/* ================= DOCUMENTS ================= */}
              <section>
                <h4 className="font-semibold mb-4">Upload Documents</h4>

                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed rounded-xl p-6 text-center">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleDocumentsChange}
                    />
                    <p className="text-sm">Click or drag files to upload</p>
                    <p className="text-xs text-gray-400">
                      PDF, JPG, PNG (Max 5MB)
                    </p>
                  </div>
                </label>

                {documents.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {documents.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border rounded-lg px-3 py-2 text-sm"
                      >
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          className="text-red-500 text-xs"
                          onClick={() =>
                            setDocuments((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* ===== ✅ SUBMIT BUTTON (INSIDE FORM) ===== */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setOpenStudentModal(false)}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg text-sm text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {loading ? "Registering..." : "Register Student"}
                </button>
              </div>
            </form>



            {/* ===== MODAL FOOTER (STICKY) ===== */}
            <div
              className="flex justify-end gap-3 px-6 py-4 border-t sticky bottom-0"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-divider)",
              }}
            >
           
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
