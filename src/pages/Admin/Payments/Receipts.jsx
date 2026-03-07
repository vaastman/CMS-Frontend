import { useEffect, useState } from "react";
import { FaFilePdf, FaSearch, FaReceipt, FaRupeeSign } from "react-icons/fa";
import { getAllPayments, downloadInvoice } from "../../../api/payment.api";

const Receipts = () => {

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await getAllPayments();

      const successful = res.data.payments.filter(
        (p) => p.status === "SUCCESS"
      );

      setPayments(successful);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = payments.filter(
    (p) =>
      p.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.txnId?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = payments.reduce(
    (sum, p) => sum + Number(p.totalAmount || 0),
    0
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">
          Receipts
        </h1>

        <p className="text-sm text-gray-600">
          View and download generated payment receipts
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <StatCard
          title="Total Receipts"
          value={payments.length}
          icon={<FaReceipt />}
        />

        <StatCard
          title="Total Amount"
          value={`₹${totalAmount.toLocaleString()}`}
          icon={<FaRupeeSign />}
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b">

          <h3 className="font-semibold">
            Receipt Records
          </h3>

          <div className="relative">

            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />

            <input
              placeholder="Search receipt / student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg text-sm"
            />

          </div>

        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-500">

            <tr>
              <th className="px-6 py-3 text-left">Receipt No</th>
              <th className="px-6 py-3 text-left">Transaction ID</th>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-center">PDF</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-400">
                  Loading receipts...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-400">
                  No receipts available
                </td>
              </tr>
            ) : (
              filtered.map((p) => (

                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-mono text-xs">
                    {p.receiptNo}
                  </td>

                  <td className="px-6 py-4 font-mono text-xs">
                    {p.txnId}
                  </td>

                  <td className="px-6 py-4">
                    {p.student?.name}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ₹{Number(p.totalAmount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <a
                      href={downloadInvoice(p.id)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg
                        bg-red-50 text-red-600
                        hover:bg-red-100 transition
                        flex items-center justify-center mx-auto"
                    >
                      <FaFilePdf />
                    </a>

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

const StatCard = ({ title, value, icon }) => (

  <div className="bg-white border rounded-xl p-5 flex items-center justify-between">

    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-1 text-[#111827]">
        {value}
      </h2>
    </div>

    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
      {icon}
    </div>

  </div>

);

export default Receipts;