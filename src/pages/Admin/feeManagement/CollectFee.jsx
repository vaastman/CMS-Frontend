// src/pages/Admin/feeManagement/CollectFee.jsx

import { useState } from "react";

const CollectFee = () => {
  const [form, setForm] = useState({
    studentName: "",
    amount: "",
    paymentMode: "CASH",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Collected Fee:", form);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[color:var(--color-primary)]">
        Collect Fee
      </h2>

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow border space-y-4"
      >
        <input
          name="studentName"
          placeholder="Student Name"
          value={form.studentName}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="paymentMode"
          value={form.paymentMode}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="CASH">Cash</option>
          <option value="ONLINE">Online</option>
          <option value="UPI">UPI</option>
        </select>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Collect
        </button>
      </form>
    </div>
  );
};

export default CollectFee;