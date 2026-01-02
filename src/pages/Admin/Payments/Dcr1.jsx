import CollectionCard from "../../../components/CollectionCard";
import TransactionTable from "../../../components/TransactionTable";

const transactions = [
  {
    id: "TXN001",
    student: "Sumit Kumar",
    date: "12 Sep 2025",
    amount: 12000,
    mode: "UPI",
  },
  {
    id: "TXN002",
    student: "Birendra Kumar",
    date: "13 Sep 2025",
    amount: 8000,
    mode: "Cash",
  },
];

const Dcr1 = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">DCR 1</h1>

      {/* Collection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard title="Total Collection" amount={520000} />
        <CollectionCard title="This Month Collection" amount={145000} />
        <CollectionCard title="Today's Collection" amount={12500} />
      </div>

      {/* Transactions */}
      <TransactionTable data={transactions} />
    </div>
  );
};

export default Dcr1;
