import React from "react";
import { FaThumbsUp, FaLink, FaBullhorn } from "react-icons/fa";

const Examination = () => {
  return (
    <div className="px-6 md:px-16 py-10 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ================= EXAMINATION ================= */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center gap-2">
            <FaLink />
            <h2 className="font-semibold text-lg">Examination</h2>
          </div>

          <div className="p-4 space-y-3">
            <div className="bg-gray-800 text-white p-3 rounded">
              <p className="font-semibold flex items-center gap-2">
                <FaThumbsUp /> Examination Form
              </p>
              <p className="text-sm mt-1 border-t border-dashed pt-2">
                [PG Regular - 1st Semester]
              </p>
            </div>

            {[
              "Re-Payment Examination Form / Print Receipt",
              "Print Examination Form",
              "Examination Result",
              "Know Your Form Number",
            ].map((item, i) => (
              <button
                key={i}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white text-left px-4 py-3 rounded flex items-center gap-2"
              >
                <FaThumbsUp /> {item}
              </button>
            ))}

            <hr />

            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded flex items-center gap-2">
              <FaThumbsUp /> Download Admit Card [UG Regular Sem-1]
            </button>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded flex items-center gap-2">
              <FaThumbsUp /> Download Admit Card [B.Pharma Sem-5 & 7]
            </button>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded flex items-center gap-2">
              <FaThumbsUp /> Download Admit Card [UG Regular Sem-5]
            </button>
          </div>
        </div>

        {/* ================= OTHER LINKS ================= */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center gap-2">
            <FaLink />
            <h2 className="font-semibold text-lg">Other Links</h2>
          </div>

          <div className="p-4 space-y-3">
            <button className="w-full bg-blue-500 text-white px-4 py-3 rounded flex justify-between">
              Ph.D Registration <span className="text-yellow-300">NEW</span>
            </button>

            <button className="w-full bg-blue-500 text-white px-4 py-3 rounded flex justify-between">
              Ph.D Admission Test (PAT) 2025 <span className="text-yellow-300">NEW</span>
            </button>

            <button className="w-full bg-blue-500 text-white px-4 py-3 rounded flex justify-between">
              Ph.D Thesis Submission Form 2024 <span className="text-yellow-300">NEW</span>
            </button>

            <button className="w-full bg-green-600 text-white px-4 py-3 rounded">
              (Step-1) Create Student Login (New User)
            </button>

            <button className="w-full bg-green-600 text-white px-4 py-3 rounded">
              (Step-2) Student Login
            </button>

            <button className="w-full bg-red-600 text-white px-4 py-3 rounded">
              Department Payment Sem. 2, 3 & 4
            </button>

            <hr />

            {[
              "Fill Registration Form",
              "Re-Payment",
              "Registration Form Payment Receipt",
              "Registration Slip",
              "Know Your Registration Form No. (UG & PG)",
            ].map((item, i) => (
              <button
                key={i}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded flex items-center gap-2"
              >
                <FaThumbsUp /> {item}
              </button>
            ))}
          </div>
        </div>

        {/* ================= NOTICES ================= */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center gap-2">
            <FaBullhorn />
            <h2 className="font-semibold text-lg">
              Notices (Total Forms filled - 0)
            </h2>
          </div>

          <div className="p-4 h-[520px] overflow-y-auto space-y-4 text-sm">
            {[
              "Guest Faculty - Call for documents verification",
              "Notice for UG III Examination Form 2022",
              "Notice Regarding Extension of B.Ed Reg. & Exam form fill up date",
              "Notice Regarding Postponed P.G SEM-3 (Commerce)",
              "Online Examination form filling of PG (Vocational)",
              "U.G Vocational Session 2021-24 Admission Notice",
              "Extension of date for online exam form",
            ].map((notice, i) => (
              <p
                key={i}
                className={`flex gap-2 ${
                  notice.includes("Online") ? "text-red-600" : "text-blue-600"
                }`}
              >
                <FaThumbsUp className="mt-1" /> {notice}
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Examination;
