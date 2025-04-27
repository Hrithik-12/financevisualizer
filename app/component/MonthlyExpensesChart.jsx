"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyExpensesChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", { month: "short", year: "2-digit" }); // e.g., "Apr '25"

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    monthlyData[month] += Number(tx.amount);
  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    total: monthlyData[month],
  }));

  if (chartData.length === 0) {
    return <p className="text-center text-gray-500">No data for chart.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9f9f9", border: "1px solid #ccc", borderRadius: "8px" }}
            itemStyle={{ color: "#333" }}
          />
          <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
