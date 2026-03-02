import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaEnvelope,
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
        email: "",
        phone: data.phone,
        reg_no: data.reg_no,
        uan_no: data.uan_no
      },
      course: data.course,
      session: data.session
    });

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!admission) {
    return <div className="min-h-screen flex items-center justify-center">
      <h2>No Admission Found</h2>
    </div>;
  }

  const { student, course, status } = admission;
  const session = admission?.session || {};

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl">
            <FaUserGraduate />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Student Admission Profile
            </h1>
            <p className="text-slate-500 text-sm">
              Admission ID: {admission?.id}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">

          {/* Student Info Card */}
          <div className="bg-white border rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-indigo-600">
              <FaUser /> Student Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-slate-700">
              <p className="flex items-center gap-2">
                <FaUserGraduate className="text-indigo-500" />
                {student?.name}
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-indigo-500" />
                {student?.phone}
              </p>
              <p className="flex items-center gap-2">
                <FaIdCard className="text-indigo-500" />
                Reg No: {student?.reg_no}
              </p>
              <p className="flex items-center gap-2">
                <FaFileAlt className="text-indigo-500" />
                UAN: {student?.uan_no}
              </p>
            </div>
          </div>

          {/* Academic Info */}
          <div className="bg-white border rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-indigo-600">
              <FaGraduationCap /> Academic Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-slate-700">
              <p className="flex items-center gap-2">
                <FaBookOpen className="text-indigo-500" />
                Course: {course?.name}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-500" />
                Session: {session?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">

          {/* Status Card */}
          <div className="bg-white border rounded-2xl shadow-sm p-6 text-center">
            <h3 className="font-semibold mb-3">Admission Status</h3>

            {status === "approved" && (
              <span className="flex items-center justify-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                <FaCheckCircle /> Approved
              </span>
            )}

            {status === "pending" && (
              <span className="flex items-center justify-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg">
                <FaClock /> Pending
              </span>
            )}

            {status === "rejected" && (
              <span className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg">
                <FaExclamationCircle /> Rejected
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-3">
            <button
              onClick={() =>
                navigate(`/student/document-upload/${admission.id}/verify`)
              }
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition flex items-center justify-center gap-2"
            >
              <FaFileAlt /> Upload / Verify Documents
            </button>

            <button
              onClick={() =>
                navigate(`/student/admission/${admission.id}/payment`)
              }
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition flex items-center justify-center gap-2"
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

export default StudentAdmissionDetails;