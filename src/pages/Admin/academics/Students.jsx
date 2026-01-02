import React, { useState } from "react";
import StudentTable from "../../../components/StudentTable";
import StudentFilters from "../../../components/StudentFilters";

const Students = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    session: "",
    status: "",
  });

  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Registered");
    setOpenStudentModal(false);
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
                <h4 className="font-semibold mb-4">
                  General Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="input" placeholder="Full Name" />
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                  />
                  <input className="input" placeholder="Phone" />
                  <input
                    className="input"
                    placeholder="Father's Name"
                  />
                  <input className="input" placeholder="UAN" />
                  <input
                    className="input"
                    placeholder="Registration No (optional)"
                  />
                  <input className="input" type="date" />

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
                          Upload
                          <br />
                          Photo
                        </span>
                      )}
                    </div>

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          setPhotoPreview(
                            URL.createObjectURL(
                              e.target.files[0]
                            )
                          )
                        }
                      />
                      <span className="px-4 py-2 border rounded-lg text-sm">
                        Choose Photo
                      </span>
                    </label>
                  </div>

                  <textarea
                    rows="2"
                    className="input md:col-span-2"
                    placeholder="Address"
                  />
                </div>
              </section>

              {/* ================= ACADEMIC INFO ================= */}
              <section>
                <h4 className="font-semibold mb-4">
                  Academic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="input">
                    <option>Department</option>
                    <option>CSE</option>
                    <option>Mechanical</option>
                  </select>

                  <select className="input">
                    <option>Session</option>
                    <option>2023–2027</option>
                    <option>2024–2028</option>
                  </select>

                  <select className="input">
                    <option>Course</option>
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                  </select>

                  <select className="input">
                    <option>Semester</option>
                    <option>1</option>
                    <option>2</option>
                  </select>

                  <input
                    className="input md:col-span-2"
                    placeholder="Subjects (comma separated)"
                  />
                </div>
              </section>

              {/* ================= DOCUMENTS ================= */}
              <section>
                <h4 className="font-semibold mb-4">
                  Upload Documents
                </h4>

                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed rounded-xl p-6 text-center">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) =>
                        setDocuments((prev) => [
                          ...prev,
                          ...Array.from(e.target.files),
                        ])
                      }
                    />
                    <p className="text-sm">
                      Click or drag files to upload
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, JPG, PNG (Max 5MB)
                    </p>
                  </div>
                </label>

                {documents.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {documents.map((file, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center border rounded-lg px-3 py-2 text-sm"
                      >
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          className="text-red-500 text-xs"
                          onClick={() =>
                            setDocuments((d) =>
                              d.filter((_, idx) => idx !== i)
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
            </form>

            {/* ===== MODAL FOOTER (STICKY) ===== */}
            <div
              className="flex justify-end gap-3 px-6 py-4 border-t sticky bottom-0"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-divider)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenStudentModal(false)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg text-sm text-white"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Register Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
