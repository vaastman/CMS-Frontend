import { useEffect, useState } from "react";
import CollectionCard from "../../../components/CollectionCard";
import TransactionTable from "../../../components/TransactionTable";
import { getDcr1Report } from "@/api/dcr1.api";

const Dcr1 = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    month: 0,
    today: 0,
  });

  const fetchDcr1Data = async () => {
    try {
      const res = await getDcr1Report();

      const report = res.data.report;

      setSummary({
        total: report.summary.totalCollection.amount || 0,
        month: report.summary.monthCollection.amount || 0,
        today: report.summary.todayCollection.amount || 0,
      });

      const formatted = report.details.todayPayments.map((p) => ({
        id: p.txnId,
        studentName: p.student?.name || "-",
        admissionNo: p.admission?.admissionNo || "-",
        course: p.admission?.course?.name || "-",
        semester: "-",
        date: new Date(p.createdAt).toLocaleDateString("en-IN"),
        amount: Number(p.totalAmount || 0),
        paymentMode: p.gateway || "-",
        status: p.status === "SUCCESS" ? "Paid" : "Pending",
      }));

      setTransactions(formatted);
    } catch (err) {
      console.error("Failed to load DCR1", err);
    }
  };

  useEffect(() => {
    fetchDcr1Data();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Daily Collection Report (DCR1)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard title="Total Admission Collection" amount={summary.total} />
        <CollectionCard title="This Month Admission Collection" amount={summary.month} />
        <CollectionCard title="Today's Admission Collection" amount={summary.today} />
      </div>

      <TransactionTable data={transactions} />
    </div>
  );
};

export default Dcr1;