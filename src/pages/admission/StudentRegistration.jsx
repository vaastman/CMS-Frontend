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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    try {
      setLoading(true);

      let params = {};

      // 🔹 CASE 1: Reference / UAN + Mobile
      if (hasReference) {
        params = {
          uan_no: form.referenceNumber.trim(),
          phone: form.mobile1.trim(),
        };
      }

      // 🔹 CASE 2: Reg No + Mobile
      if (hasReg) {
        params = {
          reg_no: form.regNumber.trim(),
          phone: form.mobile2.trim(),
        };
      }

      const res = await verifyStudent(params);
      const students = res?.data?.data?.students || [];

      if (students.length === 0) {
        toast.error("Student not found. Please check details.");
        return;
      }

      // ✅ Student verified
      const student = students[0];

      toast.success("Verification successful 🎉");

      // 👉 Redirect to student detail page
      navigate(`/student/details/${student.id}`);

    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white border shadow-sm">

        {/* HEADER */}
        <div className="border-b px-6 py-4">
          <h2 className="text-red-700 font-bold text-lg">
            STUDENT REGISTRATION
          </h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerify} className="p-6 space-y-8">

          <fieldset className="border-2 border-blue-500 p-6">
            <legend className="px-2 text-blue-600 font-semibold">
              REFERENCE NUMBER (OFSS / PPU)
            </legend>

            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  REFERENCE / UAN NUMBER
                </label>
                <input
                  type="text"
                  name="referenceNumber"
                  value={form.referenceNumber}
                  onChange={handleChange}
                  className="w-full border px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  MOBILE NUMBER
                </label>
                <input
                  type="text"
                  name="mobile1"
                  value={form.mobile1}
                  onChange={handleChange}
                  className="w-full border px-3 py-2"
                />
              </div>
            </div>

            <div className="text-center my-6 font-bold text-gray-600">
              OR
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  REGISTRATION NUMBER
                </label>
                <input
                  type="text"
                  name="regNumber"
                  value={form.regNumber}
                  onChange={handleChange}
                  className="w-full border px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  MOBILE NUMBER
                </label>
                <input
                  type="text"
                  name="mobile2"
                  value={form.mobile2}
                  onChange={handleChange}
                  className="w-full border px-3 py-2"
                />
              </div>
            </div>
          </fieldset>

          {/* VERIFY BUTTON */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="
                bg-red-600 text-white px-6 py-2 font-semibold
                hover:bg-red-700 transition disabled:opacity-50
              "
            >
              {loading ? "VERIFYING..." : "VERIFY"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
