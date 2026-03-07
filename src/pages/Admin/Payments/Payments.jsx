import { useEffect, useState } from "react";
import { FaCheckCircle, FaSearch, FaRupeeSign } from "react-icons/fa";
import { getAllPayments, getPaymentStats } from "../../../api/payment.api";

const Payments = () => {

  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PAYMENTS ================= */

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getAllPayments();
      setPayments(res.data.payments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getPaymentStats();
      setStats(res.data.stats || []);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SEARCH ================= */

  const filteredPayments = payments.filter((p) =>
    p.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.txnId?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = payments.reduce(
    (sum, p) => sum + Number(p.totalAmount || 0),
    0
  );

  const successCount = payments.filter(
    (p) => p.status === "SUCCESS"
  ).length;

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">
          Payments Overview
        </h1>

        <p className="text-sm text-gray-600">
          Monitor student payments and transaction history
        </p>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <StatCard
          title="Total Payments"
          value={payments.length}
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Successful Payments"
          value={successCount}
          icon={<FaCheckCircle />}
          green
        />

        <StatCard
          title="Total Amount"
          value={`₹${totalAmount.toLocaleString()}`}
          icon={<FaRupeeSign />}
        />

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-xl border overflow-hidden">

        {/* Table Header */}

        <div className="flex justify-between items-center px-6 py-4 border-b">

          <h3 className="font-semibold text-[#111827]">
            Transaction History
          </h3>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />

            <input
              placeholder="Search student / transaction..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>

        </div>

        {/* Table */}

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500">

            <tr>
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-400">
                  Loading payments...
                </td>
              </tr>
            ) : filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-400">
                  No payment records available
                </td>
              </tr>
            ) : (
              filteredPayments.map((p) => (

                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-mono text-xs">
                    {p.txnId}
                  </td>

                  <td className="px-6 py-4">
                    {p.student?.name}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ₹{Number(p.totalAmount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          p.status === "SUCCESS"
                            ? "bg-green-100 text-green-600"
                            : p.status === "FAILED"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {p.status}
                    </span>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon, green }) => (

  <div className="bg-white border rounded-xl p-5 flex items-center justify-between">

    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-1 text-[#111827]">
        {value}
      </h2>
    </div>

    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center
      ${green ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
    >
      {icon}
    </div>

  </div>

);

export default Payments;