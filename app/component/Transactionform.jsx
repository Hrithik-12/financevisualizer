"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function TransactionForm({
  fetchTransactions,
  editingTransaction,
  setEditingTransaction,
}) {
  const [amount, setAmount] = useState(editingTransaction?.amount || "");
  const [description, setDescription] = useState(editingTransaction?.description || "");
  const [date, setDate] = useState(editingTransaction?.date?.slice(0, 10) || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setDescription(editingTransaction.description);
      setDate(editingTransaction.date.slice(0, 10));
    }
  }, [editingTransaction]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!amount || !description || !date) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const transactionData = { amount, description, date };

      if (editingTransaction) {
        await fetch("/api/transactions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingTransaction._id, ...transactionData }),
        });
        setEditingTransaction(null);
        toast.success("Transaction updated successfully!");
      } else {
        await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        });
        toast.success("Transaction added successfully!");
      }

      setAmount("");
      setDescription("");
      setDate("");
      fetchTransactions();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto mt-10"
    >
      <Card className="w-full p-8 bg-white rounded-lg shadow-md border">
        <CardContent>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Track Your Expenses
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="p-4 text-base rounded-md border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="p-4 text-base rounded-md border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-gray-700">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-4 text-base rounded-md border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-3 text-base rounded-md transition-all disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingTransaction
                ? "Update Transaction"
                : "Add Transaction"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
