import { useState, useEffect, useRef } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";

function useAnimatedTotal(target) {
  const [display, setDisplay] = useState(target);
  const ref = useRef(null);

  useEffect(() => {
    const start = display;
    const end = target;
    const duration = 600;
    const startTime = performance.now();

    cancelAnimationFrame(ref.current);

    ref.current = requestAnimationFrame(function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * eased);

      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    });

    return () => cancelAnimationFrame(ref.current);
  }, [target]);

  return display;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(newExpense) {
    setExpenses([
      ...expenses,
      { ...newExpense, amount: Number(newExpense.amount) },
    ]);
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const animatedTotal = useAnimatedTotal(total);

  return (
    <>
      <div className="header">
        <h1>Hello</h1>
        <p className="total">Total: ${animatedTotal.toFixed(2)}</p>
      </div>
      <div className="expense-tracker">
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">all</option>
          <option value="food">Food</option>
          <option value="transport">transport</option>
          <option value="entertainment">entertainment</option>
          <option value="other">other</option>
        </select>
      </div>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList
        filteredExpenses={filteredExpenses}
        deleteExpense={deleteExpense}
      />
    </>
  );
}