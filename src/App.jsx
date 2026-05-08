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
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(ref.current);
  }, [target]);

  return display;
}

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(newExpense) {
    setExpenses([...expenses, { ...newExpense, amount: Number(newExpense.amount) }]);
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  function updatedExpense(updated) {
    setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
  }

  function toggleFilter(cat) {
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((f) => f !== cat) : [...prev, cat]
    );
  }

  // Only show categories that exist in expenses, in order of first appearance
  const usedCategories = [...new Set(expenses.map((e) => e.category))];

  const filteredExpenses =
    activeFilters.length === 0
      ? expenses
      : expenses.filter((e) => activeFilters.includes(e.category));

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const animatedTotal = useAnimatedTotal(total);

  return (
    <>
      <div className="header">
        <h1>Hello</h1>
        <p className="total">Total: ${animatedTotal.toFixed(2)}</p>
      </div>

      <ExpenseForm addExpense={addExpense} />

      {usedCategories.length > 0 && (
        <div className="filter-tags">
          {usedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleFilter(cat)}
              className={`filter-tag ${activeFilters.includes(cat) ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <ExpenseList
        filteredExpenses={filteredExpenses}
        deleteExpense={deleteExpense}
        updatedExpense={updatedExpense}
      />
    </>
  );
}