import ExpenseItem from './ExpenseItem.jsx'

export default function ExpenseList({ filteredExpenses, deleteExpense }) {
  return (
    <>
      {filteredExpenses.map((filteredExpense, index) => (
        <div className="expense-list" key={filteredExpense.id}>
            <ExpenseItem expense={filteredExpense} deleteExpense={deleteExpense}/>

        </div>
      ))}
    </>
  );
}
