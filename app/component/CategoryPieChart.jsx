"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#6366f1", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#64748b"];

export default function CategoryPieChart({ transactions }) {
  // Process data for the pie chart
  const categoryData = transactions.reduce((acc, tx) => {
    if (!acc[tx.category]) {
      acc[tx.category] = 0;
    }
    acc[tx.category] += Number(tx.amount);
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((category, index) => ({
    name: category,
    value: categoryData[category],
    color: COLORS[index % COLORS.length],
  }));

  if (chartData.length === 0) {
    return <p className="text-center text-gray-500">No data for chart.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Spending by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90} // Increased outerRadius for more space
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}`, 'Amount']}
            contentStyle={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px", // Extra padding
              fontSize: "14px", // Slightly smaller text
            }}
            cursor={false} // Avoid the cursor area from overlapping
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: "10px" }} // Adjusted padding for space
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
