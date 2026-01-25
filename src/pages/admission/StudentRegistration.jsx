import React, { useState } from "react";

const StudentRegistration = () => {
  const [form, setForm] = useState({
    referenceNumber: "",
    regNumber: "",
    mobile1: "",
    mobile2: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      (!form.referenceNumber || !form.mobile1) &&
      (!form.regNumber || !form.mobile2)
    ) {
      alert("Please enter Reference/URN + Mobile OR Reg No + Mobile");
      return;
    }

    console.log("Verification Data:", form);

    // TODO: API call
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-300 shadow-sm">
        
        {/* HEADER */}
        <div className="border-b px-6 py-4">
          <h2 className="text-red-700 font-bold text-lg">
            STUDENT REGISTRATION
          </h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerify} className="p-6 space-y-8">

          {/* BOX */}
          <fieldset className="border-2 border-blue-500 p-6">
            <legend className="px-2 text-blue-600 font-semibold">
              REFERENCE NUMBER (Provided by OFSS / PPU)
            </legend>

            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  REFERENCE / URN NUMBER :
                </label>
                <input
                  type="text"
                  name="referenceNumber"
                  value={form.referenceNumber}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  MOBILE NUMBER :
                </label>
                <input
                  type="text"
                  name="mobile1"
                  value={form.mobile1}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* OR */}
            <div className="text-center my-6 font-bold text-gray-600">
              OR
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  REG NUMBER :
                </label>
                <input
                  type="text"
                  name="regNumber"
                  value={form.regNumber}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  MOBILE NUMBER :
                </label>
                <input
                  type="text"
                  name="mobile2"
                  value={form.mobile2}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </fieldset>

          {/* VERIFY BUTTON */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 font-semibold hover:bg-red-700 transition"
            >
              VERIFY
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
