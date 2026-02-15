import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyStudent } from "@/api/student.api";

const StudentRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    referenceNumber: "",
    regNumber: "",
    mobile1: "",
    mobile2: "",
  });

  const [loading, setLoading] = useState(false);

  const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "referenceNumber" || name === "mobile1") {
      setForm({
        referenceNumber:
          name === "referenceNumber" ? value : form.referenceNumber,
        mobile1: name === "mobile1" ? value : form.mobile1,
        regNumber: "",
        mobile2: "",
      });
    } else {
      setForm({
        regNumber: name === "regNumber" ? value : form.regNumber,
        mobile2: name === "mobile2" ? value : form.mobile2,
        referenceNumber: "",
        mobile1: "",
      });
    }
  };

const handleVerify = async (e) => {
  e.preventDefault();

  const hasReference =
    form.referenceNumber.trim() && form.mobile1.trim();

  const hasReg =
    form.regNumber.trim() && form.mobile2.trim();

  if (!hasReference && !hasReg) {
    toast.error(
      "Enter Reference/UAN + Mobile OR Registration No + Mobile"
    );
    return;
  }

  const mobile = hasReference
    ? form.mobile1.trim()
    : form.mobile2.trim();

  if (!isValidMobile(mobile)) {
    toast.error("Enter valid 10-digit mobile starting from 6-9");
    return;
  }

  try {
    setLoading(true);

    const res = await verifyStudent(); // fetch all students

    const students = res?.data?.data?.students || [];

    console.log("All students:", students);

    let matchedStudent;

    if (hasReference) {
      matchedStudent = students.find(
        (s) =>
          s.uan_no?.trim().toUpperCase() ===
            form.referenceNumber.trim().toUpperCase() &&
          s.phone?.trim() === mobile
      );
    } else {
      matchedStudent = students.find(
        (s) =>
          s.reg_no?.trim().toUpperCase() ===
            form.regNumber.trim().toUpperCase() &&
          s.phone?.trim() === mobile
      );
    }

    if (!matchedStudent) {
      toast.error("Student not found. Please check details.");
      return;
    }

    toast.success("Verification successful 🎉");

    navigate(`/student/details/${matchedStudent.id}`);

  } catch (err) {
    console.error(err);
    toast.error("Verification failed");
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
            Verify student using Reference/UAN or Registration Number
          </p>
        </div>

        <form onSubmit={handleVerify} className="p-8 space-y-10">

          <fieldset className="border-2 border-blue-500 rounded-lg p-6">
            <legend className="px-3 text-blue-600 font-semibold">
              REFERENCE NUMBER (SSM / PPU)
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <Input
                label="REFERENCE / UAN NUMBER"
                name="referenceNumber"
                value={form.referenceNumber}
                onChange={handleChange}
              />
              <Input
                label="MOBILE NUMBER"
                name="mobile1"
                value={form.mobile1}
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
              <Input
                label="MOBILE NUMBER"
                name="mobile2"
                value={form.mobile2}
                onChange={handleChange}
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
