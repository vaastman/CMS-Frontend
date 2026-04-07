import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyStudentByClassRoll } from "@/api/student.api";

const StudentRegistration = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    classRoll: ""
  });

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);

  /* Remove invisible characters */
  const cleanValue = (value) =>
    value.replace(/\u200B/g, "").trim();

  /* Generate captcha */
  const generateCaptcha = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(random.toString());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleVerify = async (e) => {

    e.preventDefault();

    const roll = cleanValue(form.classRoll);

    if (!roll) {
      toast.error("Enter Class Roll Number");
      return;
    }

    if (!captchaInput) {
      toast.error("Enter captcha");
      return;
    }

    if (captchaInput !== captcha) {
      toast.error("Captcha does not match");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    try {

      setLoading(true);

      const payload = {
        class_roll: roll.toUpperCase()
      };

      const res = await verifyStudentByClassRoll(payload);

      const studentData = res?.data?.data;

      if (!studentData) {
        toast.error("Student not found");
        return;
      }

      /* Clean returned data */
      const cleanedStudent = {
        ...studentData,
        name: cleanValue(studentData.name || ""),
        fatherName: cleanValue(
          studentData.fatherName || studentData.father_name || ""
        ),
        class_roll: cleanValue(studentData.class_roll || "")
      };

      localStorage.setItem(
        "verifiedStudent",
        JSON.stringify({
          ...cleanedStudent,
          studentId: cleanedStudent.id
        })
      );

      toast.success("Verification successful 🎉");

      navigate(`/student/details/${cleanedStudent.id}`, {
        state: cleanedStudent
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

      generateCaptcha();

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border">

        {/* Header */}
        <div className="border-b px-8 py-5">
          <h2 className="text-red-700 font-bold text-xl tracking-wide">
            STUDENT REGISTRATION
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Verify student using Class Roll Number
          </p>
        </div>

        <form onSubmit={handleVerify} className="p-8 space-y-8">

          <fieldset className="border-2 border-blue-500 rounded-lg p-6">

            <legend className="px-3 text-blue-600 font-semibold">
              STUDENT VERIFICATION
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

              <Input
                label="CLASS ROLL NUMBER"
                name="classRoll"
                value={form.classRoll}
                placeholder="Enter Class Roll Number"
                onChange={handleChange}
              />

            </div>

            {/* CAPTCHA */}

            <div className="mt-8 space-y-3">

              <label className="text-sm font-semibold text-gray-700">
                CAPTCHA
              </label>

              <div className="flex items-center gap-4">

                <div className="bg-gray-200 px-5 py-2 text-xl font-bold tracking-[8px] rounded">
                  {captcha}
                </div>

                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Refresh
                </button>

              </div>

              <input
                type="text"
                placeholder="Enter Captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
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
