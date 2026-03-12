import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyStudent } from "@/api/student.api";

const StudentRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    referenceNumber: "",
    regNumber: "",
    universityRoll: "",
    mobile1: "",
    mobile2: "",
    mobile3: "",
  });

  const [loading, setLoading] = useState(false);

  const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "referenceNumber" || name === "mobile1") {
  //     setForm({
  //       referenceNumber:
  //         name === "referenceNumber" ? value : form.referenceNumber,
  //       mobile1: name === "mobile1" ? value : form.mobile1,
  //       regNumber: "",
  //       mobile2: "",
  //     });
  //   } else {
  //     setForm({
  //       regNumber: name === "regNumber" ? value : form.regNumber,
  //       mobile2: name === "mobile2" ? value : form.mobile2,
  //       referenceNumber: "",
  //       mobile1: "",
  //     });
  //   }
  // };
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "referenceNumber" || name === "mobile1") {
    setForm({
      referenceNumber:
        name === "referenceNumber" ? value : form.referenceNumber,
      mobile1: name === "mobile1" ? value : form.mobile1,

      regNumber: "",
      mobile2: "",
      universityRoll: "",
      mobile3: "",
    });

  } else if (name === "regNumber" || name === "mobile2") {
    setForm({
      regNumber: name === "regNumber" ? value : form.regNumber,
      mobile2: name === "mobile2" ? value : form.mobile2,

      referenceNumber: "",
      mobile1: "",
      universityRoll: "",
      mobile3: "",
    });

  } else {
    setForm({
      universityRoll: name === "universityRoll" ? value : form.universityRoll,
      mobile3: name === "mobile3" ? value : form.mobile3,

      referenceNumber: "",
      mobile1: "",
      regNumber: "",
      mobile2: "",
    });
  }
};
const handleVerify = async (e) => {
  e.preventDefault();

  const hasReference =
  form.referenceNumber.trim().length > 0 &&
  form.mobile1.trim().length > 0;

const hasReg =
  form.regNumber.trim().length > 0 &&
  form.mobile2.trim().length > 0;

const hasUniversity =
  form.universityRoll.trim().length > 0 &&
  form.mobile3.trim().length > 0;

  if (!hasReference && !hasReg && !hasUniversity) {
    toast.error("Enter UAN + Mobile OR Reg No + Mobile OR University Roll + Mobile");
    return;
  }

  // Select correct mobile
  const mobile = hasReference
    ? form.mobile1.trim()
    : hasReg
    ? form.mobile2.trim()
    : form.mobile3.trim();

  if (!isValidMobile(mobile)) {
    toast.error("Enter valid 10-digit mobile starting from 6-9");
    return;
  }

  // Build payload
  const payload = hasReference
    ? {
        uan_no: form.referenceNumber.trim().toUpperCase(),
        phone: mobile,
      }
    : hasReg
    ? {
        reg_no: form.regNumber.trim().toUpperCase(),
        phone: mobile,
      }
    : {
        university_roll: form.universityRoll.trim().toUpperCase(),
        phone: mobile,
      };

  try {
    setLoading(true);

    const res = await verifyStudent(payload);
    let studentData = res?.data?.data;

    if (!studentData) {
      toast.error("Student not found");
      return;
    }

    // Attach Admission Fee & Payment Status
    studentData.lastAdmission = {
      ...studentData.lastAdmission,
      feeAmount: 5000,
      paymentStatus:
        studentData.lastAdmission?.paymentStatus || "PENDING",
    };

    // Save for refresh safety
    // localStorage.setItem("verifiedStudent", JSON.stringify(studentData));
    localStorage.setItem(
  "verifiedStudent",
  JSON.stringify({
    ...studentData,
    studentId: studentData.studentId || studentData.id
  })
);

    toast.success("Verification successful 🎉");

  //   const routeId =
  // studentData.reg_no ||
  // studentData.uan_no ||
  // studentData.university_roll ||
  // studentData.studentId;
const routeId = studentData.studentId || studentData.id;
    navigate(`/student/details/${routeId}`, {
      state: studentData,
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err.response?.data);

    if (err.response?.status === 404) {
      toast.error("Student not found");
    } else if (err.response?.status === 401) {
      toast.error("Mobile number does not match");
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
            Verify student using Reference/UAN or Registration Number
          </p>
        </div>

        <form onSubmit={handleVerify} className="p-8 space-y-10">

          <fieldset className="border-2 border-blue-500 rounded-lg p-6">
            <legend className="px-3 text-blue-600 font-semibold">
              REFERENCE NUMBER (SSM / PPU)
            </legend>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
            </div> */}

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

  <Input
    label="MOBILE NUMBER"
    name="mobile3"
    value={form.mobile3}
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
