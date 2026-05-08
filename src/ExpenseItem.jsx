export default function ExpenseItem({ expense, deleteExpense, startEdit }) {
  return (
    <>
      <div className="expense-item">
        <p className="name">{expense.name}</p>
        <p className="amount">${expense.amount}</p>
        <p className="category">{expense.category}</p>
        <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>Delete</button>
        <button className= "delete-btn" onClick={() => startEdit(expense.id)}>Edit</button>
      </div>
    </>
  );
}
