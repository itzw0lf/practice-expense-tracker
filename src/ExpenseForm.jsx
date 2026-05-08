import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  function handleSubmit() {
    if (name === "" || amount === "") return;
    addExpense({ id: Date.now(), name, amount, category });
    setName("");
    setAmount("");
    setCategory("food");
  }

  return (
    <div className="expense-form">
      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        placeholder="Price"
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="entertainment">Entertainment</option>
        <option value="other">Other</option>
      </select>
      <button onClick={handleSubmit}>Add Expense</button>
    </div>
  );
}