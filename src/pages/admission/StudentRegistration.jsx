import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyStudent } from "@/api/student.api";

const StudentRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    referenceNumber: "",
    regNumber: "",
    universityRoll: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "referenceNumber") {
      setForm({
        referenceNumber: value,
        regNumber: "",
        universityRoll: "",
      });
    } else if (name === "regNumber") {
      setForm({
        referenceNumber: "",
        regNumber: value,
        universityRoll: "",
      });
    } else {
      setForm({
        referenceNumber: "",
        regNumber: "",
        universityRoll: value,
      });
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const hasReference = form.referenceNumber.trim().length > 0;
    const hasReg = form.regNumber.trim().length > 0;
    const hasUniversity = form.universityRoll.trim().length > 0;

    if (!hasReference && !hasReg && !hasUniversity) {
      toast.error("Enter UAN / Registration Number / University Roll");
      return;
    }

    if (!captchaValue) {
      toast.error("Please complete captcha verification");
      return;
    }

    const payload = hasReference
      ? { uan_no: form.referenceNumber.trim().toUpperCase() }
      : hasReg
      ? { reg_no: form.regNumber.trim().toUpperCase() }
      : { university_roll: form.universityRoll.trim().toUpperCase() };

    try {
      setLoading(true);

      const res = await verifyStudent(payload);
      const studentData = res?.data?.data;

      if (!studentData) {
        toast.error("Student not found");
        return;
      }

      studentData.lastAdmission = {
        ...studentData.lastAdmission,
        feeAmount: 5000,
        paymentStatus:
          studentData.lastAdmission?.paymentStatus || "PENDING",
      };

      localStorage.setItem(
        "verifiedStudent",
        JSON.stringify({
          ...studentData,
          studentId: studentData.studentId || studentData.id,
        })
      );

      toast.success("Verification successful 🎉");

      const routeId = studentData.studentId || studentData.id;

      navigate(`/student/details/${routeId}`, {
        state: studentData,
      });

    } catch (err) {
      console.error("VERIFY ERROR:", err.response?.data);

      if (err.response?.status === 404) {
        toast.error("Student not found");
      } else if (err.response?.status === 400) {
        toast.error(err.response?.data?.message || "Invalid input");
      } else {
        toast.error("Verification failed. Try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border">

        <div className="border-b px-8 py-5">
          <h2 className="text-red-700 font-bold text-xl tracking-wide">
            STUDENT REGISTRATION
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Verify student using UAN / Registration Number / University Roll
          </p>
        </div>

        <form onSubmit={handleVerify} className="p-8 space-y-10">

          <fieldset className="border-2 border-blue-500 rounded-lg p-6">
            <legend className="px-3 text-blue-600 font-semibold">
              STUDENT VERIFICATION
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Input
                label="REFERENCE / UAN NUMBER"
                name="referenceNumber"
                value={form.referenceNumber}
                onChange={handleChange}
              />
            </div>

            <div className="text-center my-6 font-bold text-gray-500">
              — OR —
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="REGISTRATION NUMBER"
                name="regNumber"
                value={form.regNumber}
                onChange={handleChange}
              />
            </div>

            <div className="text-center my-6 font-bold text-gray-500">
              — OR —
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="UNIVERSITY ROLL NUMBER"
                name="universityRoll"
                value={form.universityRoll}
                onChange={handleChange}
              />
            </div>

            {/* CAPTCHA */}
            <div className="flex justify-center mt-8">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>

          </fieldset>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white px-8 py-2.5 rounded-md font-semibold hover:bg-red-700 transition-all disabled:opacity-60"
            >
              {loading ? "VERIFYING..." : "VERIFY"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold mb-1 text-gray-700">
      {label}
    </label>
    <input
      {...props}
      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
    />
  </div>
);

export default StudentRegistration;