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
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Student Admission Profile</h1>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
              <FaArrowLeft /> Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Student Information</h3>
              <p>Name: {student?.name}</p>
              <p>Phone: {student?.phone}</p>
              <p>Reg No: {student?.reg_no}</p>
              <p>UAN No: {student?.uan_no}</p>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Academic Info</h3>
              <p>Course: {course?.name}</p>
              <p>Session: {session?.name}</p>
            </div>

          </div>

          <div>
            <button
              onClick={() =>
                navigate(`/student/document-upload/${admission.id}/verify`)
              }
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Upload / Verify Documents
            </button>

            <button
              onClick={() =>
                navigate(`/student/admission/${admission.id}/payment`)
              }
              className="w-full mt-3 py-3 rounded-xl bg-green-600 text-white font-semibold"
            >
              Pay Admission Fee
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionDetails;