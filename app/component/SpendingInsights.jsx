"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function SpendingInsights({ transactions, budgets, currentMonth }) {
  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const txMonth = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`;
    return txMonth === currentMonth;
  });

  // Calculate insights
  const insights = calculateInsights(currentMonthTransactions, budgets);

  if (!insights.length) {
    return (
      <Card className="bg-white rounded-lg shadow-md border">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending Insights</h2>
          <p className="text-center text-gray-500">Not enough data to generate insights yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-md border">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending Insights</h2>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li 
              key={index} 
              className={`p-3 rounded-md flex items-start ${insight.type === 'warning' 
                ? 'bg-orange-50 border-l-4 border-orange-500' 
                : insight.type === 'success' 
                  ? 'bg-green-50 border-l-4 border-green-500' 
                  : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <span className="mr-2 mt-1">
                {insight.type === 'warning' ? '⚠️' : insight.type === 'success' ? '✅' : 'ℹ️'}
              </span>
              <span className="text-gray-800">{insight.message}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function calculateInsights(transactions, budgets) {
  const insights = [];
  
  // Skip if there's no data
  if (!transactions.length) return insights;
  
  // Get total spending for the month
  const totalSpending = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  insights.push({
    type: 'info',
    message: `Total spending this month: Rs ${totalSpending.toFixed(2)}`
  });
  
  // Calculate spending by category
  const spendingByCategory = {};
  transactions.forEach(tx => {
    if (!spendingByCategory[tx.category]) {
      spendingByCategory[tx.category] = 0;
    }
    spendingByCategory[tx.category] += Number(tx.amount);
  });
  
  // Find highest spending category
  let highestCategory = '';
  let highestAmount = 0;
  
  Object.entries(spendingByCategory).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestCategory = category;
      highestAmount = amount;
    }
  });
  
  if (highestCategory) {
    insights.push({
      type: 'info',
      message: `Your highest spending category is ${highestCategory} (Rs ${highestAmount.toFixed(2)})`
    });
  }
  
  // Check budget overruns
  budgets.forEach(budget => {
    const actualSpending = spendingByCategory[budget.category] || 0;
    const budgetAmount = Number(budget.amount);
    
    if (actualSpending > budgetAmount) {
      insights.push({
        type: 'warning',
        message: `You've exceeded your ${budget.category} budget by Rs ${(actualSpending - budgetAmount).toFixed(2)}`
      });
    } else if (actualSpending >= budgetAmount * 0.9 && actualSpending < budgetAmount) {
      insights.push({
        type: 'warning',
        message: `You're approaching your ${budget.category} budget limit (${((actualSpending / budgetAmount) * 100).toFixed(0)}% used)`
      });
    } else if (budgetAmount > 0) {
      insights.push({
        type: 'success',
        message: `You're under budget for ${budget.category} (${((actualSpending / budgetAmount) * 100).toFixed(0)}% used)`
      });
    }
  });
  
  // Daily average spending
  const uniqueDates = new Set(transactions.map(tx => new Date(tx.date).toDateString())).size;
  if (uniqueDates > 0) {
    const dailyAverage = totalSpending / uniqueDates;
    insights.push({
      type: 'info',
      message: `Your daily average spending is Rs ${dailyAverage.toFixed(2)}`
    });
  }
  
  return insights;
}