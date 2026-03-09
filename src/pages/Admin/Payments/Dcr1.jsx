import { useEffect, useState } from "react";
import CollectionCard from "../../../components/CollectionCard";
import TransactionTable from "../../../components/TransactionTable";
import { getDcr1Report, exportDcr1CSV } from "@/api/dcr1.api";

const Dcr1 = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    month: 0,
    today: 0,
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchDcr1Data = async () => {
    try {
      const res = await getDcr1Report();
      const report = res.data?.report;

      if (!report) return;

      setSummary({
        total: report.summary?.totalCollection?.amount || 0,
        month: report.summary?.monthCollection?.amount || 0,
        today: report.summary?.todayCollection?.amount || 0,
      });

      const formatted =
        report.details?.todayPayments?.map((p) => ({
          id: p.txnId || p.id,
          studentName: p.student?.name || "-",
          admissionNo: p.admission?.admissionNo || "-",
          course: p.admission?.course?.name || "-",
          semester: "-",
          date: new Date(p.createdAt).toLocaleDateString("en-IN"),
          amount: Number(p.totalAmount || 0),
          paymentMode: p.gateway || "-",
          status: p.status === "SUCCESS" ? "Paid" : "Pending",
        })) || [];

      setTransactions(formatted);
    } catch (err) {
      console.error("Failed to load DCR1", err);
    }
  };

  useEffect(() => {
    fetchDcr1Data();
  }, []);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      alert("Please select both dates");
      return;
    }

    if (startDate > endDate) {
      alert("Start date cannot be after end date");
      return;
    }

    try {
      await exportDcr1CSV(startDate, endDate);

      setShowExportModal(false);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Daily Collection Report (DCR1)
        </h1>

        {/* Single Export Button */}
        <button
          onClick={() => setShowExportModal(true)}
          className="bg-[#cc0102] hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard title="Total Admission Collection" amount={summary.total} />
        <CollectionCard title="This Month Admission Collection" amount={summary.month} />
        <CollectionCard title="Today's Admission Collection" amount={summary.today} />
      </div>

      {/* Transactions */}
      <TransactionTable data={transactions} />

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 space-y-4">

            <h2 className="text-lg font-semibold">
              Export DCR1 Report
            </h2>

            <div>
              <label className="text-sm font-medium">From Date</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-[#cc0102]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">To Date</label>
              <input
                type="date"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-[#cc0102]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleExport}
                className="bg-[#cc0102] text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Generate Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dcr1;