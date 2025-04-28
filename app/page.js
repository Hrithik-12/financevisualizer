"use client";

import { useState, useEffect } from "react";
import TransactionForm from "./component/Transactionform";
import TransactionList from "./component/TransactionList";
import MonthlyExpensesChart from "./component/MonthlyExpensesChart";
import CategoryPieChart from "./component/CategoryPieChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  useEffect(() => {
    async function initializeData() {
      try {
        await fetchTransactions();
      } catch (error) {
        console.error("Initialization error:", error);
      }
    }

    initializeData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-indigo-600 py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Personal Finance Visualizer</h1>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-4 px-6 font-medium ${
              activeTab === "dashboard"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`py-4 px-6 font-medium ${
              activeTab === "add"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
          >
            Add Transaction
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`py-4 px-6 font-medium ${
              activeTab === "history"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
          >
            Transaction History
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Dashboard Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Expenses and Most Recent Transactions (50% Width) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2 md:col-span-1">
                  {/* Total Expenses Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Expenses</h2>
                    <div className="text-3xl font-bold text-indigo-600">
                      Rs {transactions.reduce((acc, tx) => acc + Number(tx.amount), 0).toFixed(2)}
                    </div>
                  </div>

                  {/* Most Recent Transactions Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Most Recent Transactions</h2>
                    <ul className="space-y-4">
                      {transactions.slice(0, 5).map((tx) => (
                        <li key={tx._id} className="flex justify-between text-gray-700">
                          <div>
                            <p className="font-semibold">{tx.description}</p>
                            <p className="text-sm">{new Date(tx.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-indigo-600">Rs {tx.amount.toFixed(2)}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Monthly Expenses Chart (50% Width) */}
                <div className="bg-white p-6 rounded-lg shadow-md border col-span-2 md:col-span-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Expenses</h2>
                  <MonthlyExpensesChart transactions={transactions} />
                </div>
              </div>

              {/* Category Pie Chart (Spending by Category) */}
              <div className="bg-white p-6 rounded-lg shadow-md border col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending by Category</h2>
                <CategoryPieChart transactions={transactions} />
              </div>
            </div>
          )}

          {/* Add Transaction View */}
          {activeTab === "add" && (
            <TransactionForm
              fetchTransactions={fetchTransactions}
              editingTransaction={editingTransaction}
              setEditingTransaction={setEditingTransaction}
            />
          )}

          {/* Transaction History View */}
          {activeTab === "history" && (
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <TransactionList
                transactions={transactions}
                fetchTransactions={fetchTransactions}
                setEditingTransaction={(tx) => {
                  setEditingTransaction(tx);
                  setActiveTab("add");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
