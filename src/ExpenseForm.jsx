import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  function handleSubmit() {
    if (name === "" || amount === "") return;
    const newExpense = {
      id: Date.now(),
      name: name,
      amount: amount,
      category: category,
    };
    addExpense(newExpense);
    setName("");
    setAmount("");
    setCategory("food");
  }
  return (
    <>
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
          <option value="transport">transport</option>
          <option value="entertainment">entertainment</option>
          <option value="other">other</option>
        </select>
        <button onClick={handleSubmit}>Add Expense</button>
      </div>
    </>
  );
}
