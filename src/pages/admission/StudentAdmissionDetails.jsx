import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaPhone,
  FaBookOpen,
  FaCalendarAlt,
  FaIdCard,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaFileAlt,
  FaMoneyBillWave,
  FaGraduationCap,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";

const StudentAdmissionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let data = location.state;

    if (!data) {
      const saved = localStorage.getItem("verifiedStudent");
      if (saved) data = JSON.parse(saved);
    }

    if (!data) {
      toast.error("Session expired. Please verify again.");
      navigate("/admission/student-registration");
      return;
    }

    setAdmission({
      id: data.lastAdmission?.id,
      status: data.lastAdmission?.status,
      student: {
        name: data.name,
        phone: data.phone,
        reg_no: data.reg_no,
        uan_no: data.uan_no,
      },
      course: data.course,
      session: data.session,
    });

    setLoading(false);
  }, []);

  const handleChange = (field, value) => {
    setAdmission((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully");
    // 👉 Call backend PATCH API here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No Admission Found</h2>
      </div>
    );
  }

  const { student, course, status } = admission;
  const session = admission?.session || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex justify-between items-center hover:shadow-xl transition">

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
              <FaUserGraduate />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Student Admission Profile
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Admission ID: <span className="font-medium">{admission?.id}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition shadow-md"
              >
                Save
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* STUDENT INFO */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2 text-indigo-600">
                <FaUser /> Student Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 text-sm">

                <EditableField
                  label="Full Name"
                  value={student?.name}
                  disabled={!isEditing}
                  onChange={(val) => handleChange("name", val)}
                />

                <EditableField
                  label="Phone"
                  value={student?.phone}
                  disabled={!isEditing}
                  onChange={(val) => handleChange("phone", val)}
                />

                <EditableField
                  label="Registration No"
                  value={student?.reg_no}
                  disabled={!isEditing}
                  onChange={(val) => handleChange("reg_no", val)}
                />

                <EditableField
                  label="UAN Number"
                  value={student?.uan_no}
                  disabled={true}
                />

              </div>
            </div>

            {/* ACADEMIC INFO */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2 text-indigo-600">
                <FaGraduationCap /> Academic Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 text-slate-700 text-sm">
                <InfoItem icon={<FaBookOpen />} label="Course" value={course?.name} />
                <InfoItem icon={<FaCalendarAlt />} label="Session" value={session?.name} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* STATUS */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition">
              <h3 className="font-semibold text-slate-700 mb-4">
                Admission Status
              </h3>

              {status === "approved" && (
                <StatusBadge color="green" icon={<FaCheckCircle />} text="Approved" />
              )}
              {status === "pending" && (
                <StatusBadge color="yellow" icon={<FaClock />} text="Pending Review" />
              )}
              {status === "rejected" && (
                <StatusBadge color="red" icon={<FaExclamationCircle />} text="Rejected" />
              )}
            </div>

            {/* ACTIONS */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4 hover:shadow-md transition">
              <button
                onClick={() =>
                  navigate(`/student/document-upload/${admission.id}/verify`)
                }
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold transition shadow-md flex items-center justify-center gap-2"
              >
                <FaFileAlt /> Upload / Verify Documents
              </button>

              <button
                onClick={() =>
                  navigate(`/student/admission/${admission.id}/payment`)
                }
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold transition shadow-md flex items-center justify-center gap-2"
              >
                <FaMoneyBillWave /> Pay Admission Fee
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= Reusable Components ================= */

const EditableField = ({ label, value, disabled, onChange }) => (
  <div>
    <p className="text-xs text-slate-500 mb-1">{label}</p>
    <input
      type="text"
      value={value || ""}
      disabled={disabled}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-lg border transition
        ${disabled
          ? "bg-slate-100 text-slate-500 cursor-not-allowed"
          : "bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-400"}
      `}
    />
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-indigo-500 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-medium text-slate-800">{value || "-"}</p>
    </div>
  </div>
);

const StatusBadge = ({ color, icon, text }) => {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${colors[color]}`}>
      {icon} {text}
    </div>
  );
};

export default StudentAdmissionDetails;