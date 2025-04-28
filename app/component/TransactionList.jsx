"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TransactionList({
  transactions,
  fetchTransactions,
  setEditingTransaction,
}) {
  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/transactions`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      if (res.ok) {
        toast.success("Transaction deleted!");
        fetchTransactions();
      } else {
        toast.error("Failed to delete transaction");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  // Ensure transactions is defined and an array before checking its length
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Transaction History
      </h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {transactions.map((tx) => (
          <Card
            key={tx._id}
            className="flex flex-col p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
          >
            {/* Left side: Transaction Info */}
            <div className="flex flex-col mb-3">
              {/* Top row: Amount and Description */}
              <div className="flex items-center gap-4 mb-2">
                <span className="text-lg font-semibold text-gray-800">
                  Rs {Number(tx.amount).toFixed(2)}
                </span>
                <span className="text-gray-700">{tx.description}</span>
              </div>

              {/* Bottom row: Category and Date */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="text-indigo-600">{tx.category}</span>
                <span>{new Date(tx.date).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Right side: Actions (Edit & Delete Buttons) */}
            <div className="flex gap-2 items-center mt-auto">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditingTransaction(tx)}
                className="h-8 w-8"
              >
                ✏️
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(tx._id)}
                className="h-8 w-8"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
