import { useEffect, useState } from "react";
import CollectionCard from "../../../components/CollectionCard";
import TransactionTable from "../../../components/TransactionTable";
// import { getDcr1Data } from "@/api/fee.api"; // when backend ready

const Dcr1 = () => {
  const [transactions, setTransactions] = useState([]);

  // Example college admission payment data
  useEffect(() => {
    const demoData = [
      {
        id: "ADM2025001",
        studentName: "Sumit Kumar",
        admissionNo: "2025BCA001",
        course: "BCA",
        semester: "1st",
        date: "12 Feb 2026",
        amount: 25000,
        paymentMode: "UPI",
        status: "Paid",
      },
      {
        id: "ADM2025002",
        studentName: "Birendra Kumar",
        admissionNo: "2025BBA002",
        course: "BBA",
        semester: "1st",
        date: "12 Feb 2026",
        amount: 30000,
        paymentMode: "Cash",
        status: "Paid",
      },
    ];

    setTransactions(demoData);

    // When backend ready:
    // getDcr1Data().then(res => setTransactions(res.data))
  }, []);

  // Calculations
  const totalCollection = transactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );

  const todayCollection = transactions
    .filter((txn) => txn.date === "12 Feb 2026") // replace with dynamic date logic
    .reduce((sum, txn) => sum + txn.amount, 0);

  const thisMonthCollection = totalCollection; // replace with month filter logic

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Daily Collection Report (DCR1) – Admission Fees
      </h1>

      {/* Collection Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard title="Total Admission Collection" amount={totalCollection} />
        <CollectionCard title="This Month Admission Collection" amount={thisMonthCollection} />
        <CollectionCard title="Today's Admission Collection" amount={todayCollection} />
      </div>

      {/* Transaction Table */}
      <TransactionTable data={transactions} />
    </div>
  );
};

export default Dcr1;