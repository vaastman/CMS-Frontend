import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const AdmissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--color-text-primary)]">
            Admission Application
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Application ID: #{id}
          </p>
        </div>

        {/* Status Badge */}
        <span
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-full text-sm font-medium
            bg-yellow-100 text-yellow-800
          "
        >
          UNDER VERIFICATION
        </span>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== LEFT : STUDENT DETAILS ===== */}
        <div
          className="
            lg:col-span-2
            bg-[color:var(--color-surface)]
            rounded-2xl shadow-sm p-6
          "
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaUserGraduate />
            Student Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <p><b>Name:</b> Rohit Kumar</p>
            <p><b>Course:</b> B.Sc Computer Science</p>
            <p><b>Email:</b> rohit@gmail.com</p>
            <p><b>Mobile:</b> 9876543210</p>
            <p><b>Applied On:</b> 12 Jan 2025</p>
            <p><b>Category:</b> General</p>
          </div>

          {/* Documents */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FaFileAlt />
              Submitted Documents
            </h4>

            <ul className="space-y-2 text-sm">
              {[
                "Aadhar Card",
                "10+2 Marksheet",
                "Passport Size Photo",
              ].map((doc, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <span>{doc}</span>
                  <span className="text-green-600 font-medium">
                    Uploaded
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== RIGHT : ACTION PANEL ===== */}
        <div
          className="
            bg-[color:var(--color-surface)]
            rounded-2xl shadow-sm p-6
            flex flex-col gap-4
          "
        >
          <h3 className="font-semibold text-lg">
            Application Actions
          </h3>

          <button
            onClick={() => navigate(`/admin/admissions/${id}/verify`)}
            className="
              flex items-center gap-3
              bg-blue-600 text-white px-4 py-3 rounded-lg
              hover:bg-blue-700 transition
            "
          >
            <FaCheckCircle />
            Verify Documents
          </button>

          <button
            className="
              flex items-center gap-3
              bg-green-600 text-white px-4 py-3 rounded-lg
              hover:bg-green-700 transition
            "
          >
            <FaMoneyCheckAlt />
            Approve for Payment
          </button>

          <button
            className="
              flex items-center gap-3
              bg-red-600 text-white px-4 py-3 rounded-lg
              hover:bg-red-700 transition
            "
          >
            <FaTimesCircle />
            Reject Application
          </button>

          <div className="text-xs text-gray-500 mt-2">
            Actions will be logged in Audit Logs
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdmissionDetails;
