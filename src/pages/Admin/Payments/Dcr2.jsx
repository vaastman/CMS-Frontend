import CollectionCard from "../../../components/CollectionCard";
import TransactionTable from "../../../components/TransactionTable";

const transactions = [
  {
    id: "TXN101",
    student: "Amit Singh",
    date: "14 Sep 2025",
    amount: 15000,
    mode: "Card",
  },
];

const Dcr2 = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">DCR 2</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard title="Total Collection" amount={320000} />
        <CollectionCard title="This Month Collection" amount={98000} />
        <CollectionCard title="Today's Collection" amount={6000} />
      </div>

      <TransactionTable data={transactions} />
    </div>
  );
};

export default Dcr2;
