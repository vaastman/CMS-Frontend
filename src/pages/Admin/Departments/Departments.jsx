import { useEffect, useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaUserGraduate,
  FaUsers,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  fetchDepartmentsApi,
  createDepartmentApi,
  updateDepartmentApi,
} from "@/api/department.api";

/* ---------------- MODAL ---------------- */
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

/* ---------------- COMPONENT ---------------- */
const Departments = () => {
  /* ---------- DATA STATES ---------- */
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  /* ---------- UI STATES ---------- */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deptSearch, setDeptSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  const [openDeptModal, setOpenDeptModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  /* ---------- FORM STATES ---------- */
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editDescription, setEditDescription] = useState("");

  /* ---------- FETCH DEPARTMENTS ---------- */
  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetchDepartmentsApi();
      let deptList = [];

      if (Array.isArray(res.data)) {
        deptList = res.data;
      } else if (Array.isArray(res.data?.data)) {
        deptList = res.data.data;
      } else if (Array.isArray(res.data?.data?.rows)) {
        deptList = res.data.data.rows;
      } else if (Array.isArray(res.data?.departments)) {
        deptList = res.data.departments;
      }

      setDepartments(deptList);
      setSelectedDept(deptList[0] || null);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to fetch departments";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  /* ---------- FILTERS ---------- */
  const filteredDepartments = Array.isArray(departments)
    ? departments.filter((dept) =>
        dept.name?.toLowerCase().includes(deptSearch.toLowerCase())
      )
    : [];

  const filteredCourses =
    selectedDept?.courses?.filter((course) =>
      course.name?.toLowerCase().includes(courseSearch.toLowerCase())
    ) || [];

  /* ---------- CREATE ---------- */
  const handleCreateDepartment = async () => {
    try {
      const payload = { name, code, description };
      const res = await createDepartmentApi(payload);

      toast.success(res.data?.message || "Department created successfully");

      setOpenDeptModal(false);
      setName("");
      setCode("");
      setDescription("");

      loadDepartments();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "You are not authorized to create department";
      toast.error(msg);
    }
  };

  /* ---------- UPDATE ---------- */
  const handleEditOpen = () => {
    setEditName(selectedDept?.name || "");
    setEditCode(selectedDept?.code || "");
    setEditDescription(selectedDept?.description || "");
    setOpenEditModal(true);
  };

  const handleUpdateDepartment = async () => {
    try {
      const payload = {
        ...(editName && { name: editName }),
        ...(editCode && { code: editCode }),
        ...(editDescription && { description: editDescription }),
      };

      const res = await updateDepartmentApi(selectedDept.id, payload);

      toast.success(res.data?.message || "Department updated successfully");

      setOpenEditModal(false);
      loadDepartments();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "You do not have permission to update department";
      toast.error(msg);
    }
  };

  /* ---------- LOADING / ERROR ---------- */
  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading departments…</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Departments & Courses
        </h1>
        <p className="text-sm text-gray-500">
          Manage academic departments and curriculum
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="bg-white rounded-xl border p-4 space-y-4">
          <h3 className="font-semibold">
            Departments
            <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
              {filteredDepartments.length}
            </span>
          </h3>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              value={deptSearch}
              onChange={(e) => setDeptSearch(e.target.value)}
              placeholder="Search department..."
              className="w-full pl-9 py-2 border rounded-lg text-sm"
            />
          </div>

          <button
            onClick={() => setOpenDeptModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            <FaPlus /> Add Department
          </button>

          {filteredDepartments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className={`p-3 rounded-lg border cursor-pointer ${
                selectedDept?.id === dept.id
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <p className="font-medium text-sm">{dept.name}</p>
              <p className="text-xs text-gray-500">{dept.code || "—"}</p>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-3 space-y-6">
          {selectedDept && (
            <>
              <div className="bg-white rounded-xl border p-6 flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedDept.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedDept.description || "No description"}
                  </p>

                  <div className="flex gap-6 mt-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaUserGraduate /> {selectedDept.students || 0} Students
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUsers /> {selectedDept.faculty || 0} Faculty
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> —
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleEditOpen}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
                >
                  <FaEdit /> Edit
                </button>
              </div>

              {/* COURSES */}
              <div className="bg-white rounded-xl border">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-semibold">Courses</h3>
                </div>

                {filteredCourses.length === 0 ? (
                  <p className="p-6 text-sm text-gray-500">
                    No courses available
                  </p>
                ) : (
                  <table className="w-full text-sm">
                    <tbody>
                      {filteredCourses.map((c, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-6 py-3">{c.code}</td>
                          <td className="px-6 py-3">{c.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ADD MODAL */}
      <Modal
        open={openDeptModal}
        onClose={() => setOpenDeptModal(false)}
        title="Add Department"
      >
        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Department Name"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Department Code (optional)"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenDeptModal(false)}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateDepartment}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Department"
      >
        <div className="space-y-4">
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            value={editCode}
            onChange={(e) => setEditCode(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setOpenEditModal(false)}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateDepartment}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Departments;
