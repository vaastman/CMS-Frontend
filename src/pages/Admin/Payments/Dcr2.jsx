import { useEffect, useState } from "react";
import { getDcr2Report, exportDcr2CSV } from "@/api/dcr2.api";
import { toast } from "react-toastify";

const Dcr2 = () => {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const [stats, setStats] = useState({
    totalApplications: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [collections, setCollections] = useState({
    todayCollection: 0,
    totalCollection: 0,
  });

  const [transactions, setTransactions] = useState([]);

  const getCollectionAmount = (value, nestedAmount) => {
    if (typeof value === "number" || typeof value === "string") {
      return Number(value) || 0;
    }
    if (value && typeof value === "object" && "amount" in value) {
      return Number(value.amount) || 0;
    }
    return Number(nestedAmount) || 0;
  };

  const fetchDCR2Data = async () => {
    try {
      setLoading(true);
      const response = await getDcr2Report();
      const report = response?.data?.report || {};
      const summary = report?.summary || {};
      const collectionsData = report?.collections || {};
      const recentPayments = report?.last10Payments || [];

      setStats({
        totalApplications: summary.totalApplications || 0,
        approved: summary.approved ?? summary.approvedApplications ?? 0,
        pending: summary.pending ?? summary.pendingApplications ?? 0,
        rejected: summary.rejected ?? summary.rejectedApplications ?? 0,
      });

      setCollections({
        todayCollection: getCollectionAmount(
          collectionsData.todayCollection,
          collectionsData.todaysCollection?.amount
        ),
        totalCollection: getCollectionAmount(
          collectionsData.totalCollection,
          collectionsData.totalCollectionDetails?.amount
        ),
      });

      setTransactions(recentPayments);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load DCR2 report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDCR2Data();
  }, []);

  const handleExport = async () => {
    try {
      setExporting(true);
      await exportDcr2CSV(dateRange.startDate, dateRange.endDate);
      toast.success("DCR2 report exported successfully");
      setShowExportModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Export failed");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">DCR2 - Certificate Payment Report</h1>
          <p className="text-gray-600 mt-1">Certificate fee collection and applications</p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
        >
          📥 Export CSV
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading DCR2 report...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Total Applications" value={stats.totalApplications} color="blue" />
            <StatCard label="Approved" value={stats.approved} color="green" />
            <StatCard label="Pending" value={stats.pending} color="yellow" />
            <StatCard label="Rejected" value={stats.rejected} color="red" />
          </div>

          {/* Collection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CollectionCard
              label="Today's Collection"
              value={collections.todayCollection}
              icon="💰"
              color="green"
            />
            <CollectionCard
              label="Total Collection"
              value={collections.totalCollection}
              icon="🏦"
              color="blue"
            />
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Recent Certificate Payments</h2>
            </div>
            {transactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No certificate payments found
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Certificate Type</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-right">Amount</th>
                    <th className="p-4 text-left">Transaction ID</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        {txn.displayDate ||
                          (txn.date && !Number.isNaN(new Date(txn.date).getTime())
                            ? new Date(txn.date).toLocaleDateString("en-IN")
                            : "Invalid Date")}
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {txn.certificateType}
                        </span>
                      </td>
                      <td className="p-4 font-medium">{txn.name}</td>
                      <td className="p-4 text-right font-semibold">
                        ₹{(Number(txn.amount) || 0).toFixed(2)}
                      </td>
                      <td className="p-4 text-xs">{txn.txnId}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            txn.status === "SUCCESS"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowExportModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Export DCR2 Report</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, startDate: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, endDate: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                {exporting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Exporting...
                  </>
                ) : (
                  "Export CSV"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-sm opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
};

const CollectionCard = ({ label, value, icon, color }) => {
  const colors = {
    green: "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-800",
    blue: "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800",
  };

  return (
    <div className={`rounded-xl border p-6 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-75">{label}</p>
          <p className="text-4xl font-bold mt-2">₹{Number(value).toFixed(2)}</p>
        </div>
        <span className="text-5xl">{icon}</span>
      </div>
    </div>
  );
};

export default Dcr2;
