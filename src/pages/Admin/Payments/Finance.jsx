import DCRSection from "./DCRSection";

const Finance = () => {
  const transactions = [
    {
      id: "TXN001",
      student: "Amit Kumar",
      date: "12 Sep 2025",
      amount: 2500,
      mode: "Online",
    },
    {
      id: "TXN002",
      student: "Neha Singh",
      date: "12 Sep 2025",
      amount: 1800,
      mode: "Cash",
    },
  ];

  return (
    <div className="space-y-12">
      <DCRSection title="DCR 1" transactions={transactions} />
      <DCRSection title="DCR 2" transactions={transactions} />
    </div>
  );
};

export default Finance;
