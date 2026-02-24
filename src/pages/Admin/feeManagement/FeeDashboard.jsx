// src/pages/Admin/feeManagement/FeeDashboard.jsx

import { Link } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaHistory,
  FaTable
} from "react-icons/fa";

const FeeDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-[color:var(--color-primary)]">
        Fee Management
      </h2>

      {/* Updated to 3 cards (clean ERP layout) */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Manage Fee Structure */}
        <Link
          to="/admin/fees/manage-structure"
          className="bg-white border rounded-xl shadow p-6 hover:shadow-md transition"
        >
          <FaTable className="text-2xl mb-3 text-blue-600" />
          <h3 className="font-semibold text-lg">
            Manage Fee Structure
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Configure Part A & Part B semester-wise fees
          </p>
        </Link>

        {/* Collect Fee */}
        <Link
          to="/admin/fees/collect"
          className="bg-white border rounded-xl shadow p-6 hover:shadow-md transition"
        >
          <FaMoneyCheckAlt className="text-2xl mb-3 text-green-600" />
          <h3 className="font-semibold text-lg">Collect Fee</h3>
          <p className="text-sm text-gray-500 mt-1">
            Accept student payments
          </p>
        </Link>

        {/* Fee History */}
        <Link
          to="/admin/fees/history"
          className="bg-white border rounded-xl shadow p-6 hover:shadow-md transition"
        >
          <FaHistory className="text-2xl mb-3 text-purple-600" />
          <h3 className="font-semibold text-lg">Fee History</h3>
          <p className="text-sm text-gray-500 mt-1">
            View payment records
          </p>
        </Link>

      </div>
    </div>
  );
};

export default FeeDashboard;