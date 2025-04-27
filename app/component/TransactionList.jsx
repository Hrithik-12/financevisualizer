"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TransactionList({ transactions, fetchTransactions, setEditingTransaction }) {
  
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
      

  if (transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Transaction History
    </h2>
  
    {transactions.map((tx) => (
      <Card
        key={tx._id}
        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition"
      >
        {/* Left side: Single line information */}
        <div className="flex items-center gap-4">
          <span className="text-gray-800 font-semibold">
            ${tx.amount}
          </span>
          <span className="text-gray-500">{tx.description}</span>
          <span className="text-gray-400 text-sm">
            {new Date(tx.date).toLocaleDateString()}
          </span>
        </div>
  
        {/* Right side: Actions */}
        <div className="flex gap-2 items-center">
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
  
  );
}
