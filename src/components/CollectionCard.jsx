import { exportDcr1CSV } from "@/api/dcr1.api";

const CollectionCard = ({ title, amount }) => {

  const exportCSV = () => {
    const today = new Date().toISOString().split("T")[0];
    exportDcr1CSV(today, today);
  };

  return (
    <div
      className="rounded-2xl shadow-sm p-6 flex flex-col justify-between"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div>
        <p
          className="text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {title}
        </p>

        <h2
          className="text-2xl font-bold mt-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          ₹ {amount.toLocaleString()}
        </h2>
      </div>

      <button
        onClick={exportCSV}
        className="mt-4 self-start text-sm px-4 py-2 rounded-lg text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        Export Report
      </button>
    </div>
  );
};

export default CollectionCard;