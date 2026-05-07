export default function ExpenseItem({ expense, deleteExpense }) {
  return (
    <>
      <div className="expense-item">
        <p className="name">{expense.name}</p>
        <p className="amount">${expense.amount}</p>
        <p className="category">{expense.category}</p>
        <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>Delete</button>
      </div>
    </>
  );
}
