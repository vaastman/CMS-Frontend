import { useEffect, useState } from "react";
import CollectionCard from "../../../components/CollectionCard";
import TransactionTable from "../../../components/TransactionTable";

const Dcr2 = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const demoData = [
      {
        id: "CERT2026001",
        studentName: "Amit Singh",
        admissionNo: "2023BCA021",
        certificateType: "Bonafide Certificate",
        date: "27 Feb 2026",
        amount: 200,
        paymentMode: "Card",
        status: "Approved",
      },
      {
        id: "CERT2026002",
        studentName: "Rahul Kumar",
        admissionNo: "2022BBA010",
        certificateType: "CLC",
        date: "27 Feb 2026",
        amount: 500,
        paymentMode: "UPI",
        status: "Pending",
      },
    ];

    setTransactions(demoData);
  }, []);

  const totalCollection = transactions.reduce(
    (sum, txn) => sum + txn.amount,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        DCR 2 – Certificate Issue Collection
      </h1>

      {/* Collection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard
          title="Total Certificate Collection"
          amount={totalCollection}
        />
        <CollectionCard
          title="Approved Requests"
          amount={transactions.filter(t => t.status === "Approved").length}
        />
        <CollectionCard
          title="Pending Requests"
          amount={transactions.filter(t => t.status === "Pending").length}
        />
      </div>

      <TransactionTable data={transactions} />
    </div>
  );
};

export default Dcr2;