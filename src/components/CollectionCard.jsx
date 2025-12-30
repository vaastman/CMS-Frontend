const CollectionCard = ({ title, amount }) => {
  return (
    <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-sm p-6 flex flex-col justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-[color:var(--color-text)] mt-2">
          ₹ {amount.toLocaleString()}
        </h2>
      </div>

      <button className="mt-4 self-start bg-[color:var(--color-primary)] text-white text-sm px-4 py-2 rounded-lg hover:opacity-90">
        Export Report
      </button>
    </div>
  );
};

export default CollectionCard;
