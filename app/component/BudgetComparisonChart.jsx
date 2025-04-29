"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BudgetComparisonChart({ transactions, budgets, currentMonth }) {
  // Calculate actual spending per category for the current month
  const actualSpending = {};
  
  transactions.forEach(tx => {
    // Check if the transaction is from the current month
    const txDate = new Date(tx.date);
    const txMonth = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`;
    
    if (txMonth === currentMonth) {
      if (!actualSpending[tx.category]) {
        actualSpending[tx.category] = 0;
      }
      actualSpending[tx.category] += Number(tx.amount);
    }
  });
  
  // Transform data for chart
  const chartData = CATEGORIES.map(category => {
    const budgetAmount = budgets.find(b => b.category === category)?.amount || 0;
    return {
      category,
      budget: budgetAmount,
      actual: actualSpending[category] || 0,
      difference: budgetAmount - (actualSpending[category] || 0)
    };
  }).filter(item => item.budget > 0 || item.actual > 0); // Only show categories with budget or spending
  
  if (chartData.length === 0) {
    return <p className="text-center text-gray-500">No budget data for comparison.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Budget vs. Actual Spending
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`Rs ${value}`, '']}
            contentStyle={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
          <Legend />
          <Bar dataKey="budget" name="Budget" fill="#8884d8" />
          <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Same categories as in TransactionForm for consistency
const CATEGORIES = [
  "Food", 
  "Transportation", 
  "Housing", 
  "Entertainment", 
  "Utilities", 
  "Shopping", 
  "Health", 
  "Education", 
  "Travel", 
  "Other"
];