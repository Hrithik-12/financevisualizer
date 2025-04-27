"use client";

import { useState, useEffect } from "react";
import TransactionForm from "./component/Transactionform";
import TransactionList from "./component/TransactionList";
import MonthlyExpensesChart from "./component/MonthlyExpensesChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  async function fetchTransactions() {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Personal Finance Visualizer
      </h1>

      {/* Content */}
      <section className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        
        {/* Left - Form */}
        <div className="w-full md:w-1/2">
          <TransactionForm
            fetchTransactions={fetchTransactions}
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />
        </div>

        {/* Right - Chart + List */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Chart */}
          <MonthlyExpensesChart transactions={transactions} />

          {/* List */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <TransactionList
              transactions={transactions}
              fetchTransactions={fetchTransactions}
              setEditingTransaction={setEditingTransaction}
            />
          </div>

        </div>
      </section>
    </main>
  );
}
