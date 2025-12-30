import CollectionCard from "../../../components/CollectionCard";
import TransactionTable from "../../../components/TransactionTable";

const DCRSection = ({ title, transactions }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard title="Total Collection" amount={520000} />
        <CollectionCard title="This Month Collection" amount={145000} />
        <CollectionCard title="Today's Collection" amount={12500} />
      </div>

      {/* Transaction Table */}
      <TransactionTable data={transactions} />
    </section>
  );
};

export default DCRSection;
