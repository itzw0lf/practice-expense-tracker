import ExpenseCard from './ExpenseCard.jsx'

export default function ExpenseList({ filteredExpenses, deleteExpense, updatedExpense }) {
  return (
    <>
      {filteredExpenses.map((expense) => (
        <div className="expense-list" key={expense.id}>
          <ExpenseCard
            expense={expense}
            deleteExpense={deleteExpense}
            updatedExpense={updatedExpense}
          />
        </div>
      ))}
    </>
  );
}