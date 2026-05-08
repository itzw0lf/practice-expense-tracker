import { useState } from "react";

export default function ExpenseCard({ expense, updatedExpense, deleteExpense }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  function handleSave() {
    if (name === "" || amount === "") return;
    updatedExpense({ id: expense.id, name, amount, category });
    setIsEditing(false);
  }

  function handleCancel() {
    setName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="expense-item editing">
        <input
          className="edit-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="edit-input amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="edit-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
        <button className="delete-btn save" onClick={handleSave}>Save</button>
        <button className="delete-btn" onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="expense-item">
      <p className="name">{expense.name}</p>
      <span className="category">{expense.category}</span>
      <p className="amount">${expense.amount}</p>
      <button className="delete-btn" onClick={() => setIsEditing(true)}>Edit</button>
      <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>Delete</button>
    </div>
  );
}