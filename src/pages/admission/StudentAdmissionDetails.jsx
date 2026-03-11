import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaPhone,
  FaBookOpen,
  FaCalendarAlt,
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
  const [practical, setPractical] = useState(false);

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
      status: data.lastAdmission?.status || "PENDING",
      paymentStatus: data.lastAdmission?.paymentStatus || "PENDING",
      student: {
        id:data.id,
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

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { student, course, status, paymentStatus } = admission;
  const session = admission?.session || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="bg-white rounded-2xl shadow-lg border p-6 flex justify-between items-center">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl">
              <FaUserGraduate />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Student Admission Profile
              </h1>

              <p className="text-sm text-gray-500">
                Admission ID: {admission.id}
              </p>
            </div>

          </div>

          <div className="flex gap-3">

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-6">

            {/* STUDENT INFO */}

            <div className="bg-white rounded-xl border p-6">

              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-indigo-600">
                <FaUser /> Student Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">

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
                />

                <EditableField
                  label="UAN Number"
                  value={student?.uan_no}
                  disabled
                />

              </div>

            </div>

            {/* ACADEMIC INFO */}

            <div className="bg-white rounded-xl border p-6">

              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-indigo-600">
                <FaGraduationCap /> Academic Details
              </h3>

              <InfoItem icon={<FaBookOpen />} label="Course" value={course?.name} />
              <InfoItem icon={<FaCalendarAlt />} label="Session" value={session?.name} />

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            {/* STATUS */}

            <div className="bg-white border rounded-xl p-6 text-center">

              <h3 className="font-semibold mb-4">
                Admission Status
              </h3>

              {status === "CONFIRMED" && (
                <StatusBadge color="green" icon={<FaCheckCircle />} text="Admission Confirmed" />
              )}

              {status === "PENDING" && (
                <StatusBadge color="yellow" icon={<FaClock />} text="Pending Review" />
              )}

              {status === "REJECTED" && (
                <StatusBadge color="red" icon={<FaExclamationCircle />} text="Rejected" />
              )}
<div className="mt-4">
  <label className="text-sm font-medium text-gray-600">
    Practical Subject
  </label>

  <select
    value={practical}
    onChange={(e) => setPractical(e.target.value === "true")}
    className="mt-1 w-full border px-3 py-2 rounded-lg"
  >
    <option value="false">No Practical</option>
    <option value="true">Yes Practical</option>
  </select>
</div>
            </div>

            {/* ACTIONS */}

            <div className="bg-white border rounded-xl p-6 space-y-4">

              <button
                onClick={() =>
                  navigate(`/student/document-upload/${admission.id}/verify`)
                }
                className="w-full py-3 rounded-xl bg-indigo-600 text-white flex items-center justify-center gap-2"
              >
                <FaFileAlt /> Upload Documents
              </button>

              {paymentStatus !== "SUCCESS" ? (

                <button
                  onClick={() =>
                   navigate(`/student/admission/${admission.id}/payment`, {
  state: {
    practical
  }
})
                  }
                  className="w-full py-3 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2"
                >
                  <FaMoneyBillWave /> Pay Admission Fee
                </button>

              ) : (

                <div className="w-full py-3 rounded-xl bg-green-100 text-green-700 text-center font-semibold">
                  Payment Completed
                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

/* COMPONENTS */

const EditableField = ({ label, value, disabled, onChange }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <input
      type="text"
      value={value || ""}
      disabled={disabled}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg"
    />
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm text-gray-700">
    {icon}
    <span>{label}: <strong>{value || "-"}</strong></span>
  </div>
);

const StatusBadge = ({ color, icon, text }) => {

  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700"
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${colors[color]}`}>
      {icon} {text}
    </div>
  );
};

export default StudentAdmissionDetails;