"use client";

import { useState, useEffect } from "react";
import BudgetForm from "./BudgetForm";
import BudgetComparisonChart from "./BudgetComparisonChart";
import SpendingInsights from "./SpendingInsights";

export default function BudgetDashboard({ transactions }) {
  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentYearMonth());
  const [availableMonths, setAvailableMonths] = useState([]);

  // Get current year and month in YYYY-MM format
  function getCurrentYearMonth() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  // Fetch budgets for the current month
  async function fetchBudgets() {
    try {
      const res = await fetch(`/api/budget?month=${currentMonth}`);
      const data = await res.json();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  }

  // Calculate available months from transactions data
  useEffect(() => {
    const months = new Set();
    
    // Add current month and past 11 months
    const now = new Date();
    for(let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthStr);
    }
    
    // Add months from transactions
    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      const monthStr = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthStr);
    });
    
    // Sort months in descending order
    const sortedMonths = Array.from(months).sort().reverse();
    setAvailableMonths(sortedMonths);
  }, [transactions]);

  // Fetch budgets when component loads or month changes
  useEffect(() => {
    fetchBudgets();
  }, [currentMonth]);

  return (
    <div className="space-y-6">
      {/* Month Selector */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Budget Management</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="month-select" className="text-gray-700">Select Month:</label>
          <select
            id="month-select"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            {availableMonths.map(month => {
              const [year, monthNum] = month.split('-');
              const monthName = new Date(year, parseInt(monthNum) - 1).toLocaleString('default', { month: 'long' });
              return (
                <option key={month} value={month}>
                  {monthName} {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Form */}
        <div>
          <BudgetForm 
            fetchBudgets={fetchBudgets} 
            currentMonth={currentMonth} 
          />
        </div>

        {/* Spending Insights */}
        <div>
          <SpendingInsights 
            transactions={transactions} 
            budgets={budgets} 
            currentMonth={currentMonth} 
          />
        </div>
      </div>

      {/* Budget Comparison Chart */}
      <div className="mt-6">
        <BudgetComparisonChart 
          transactions={transactions} 
          budgets={budgets} 
          currentMonth={currentMonth} 
        />
      </div>
    </div>
  );
}