"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

// Same categories as in TransactionForm
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

export default function BudgetForm({ fetchBudgets, currentMonth }) {
  const [budgets, setBudgets] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialize budgets when the component loads or month changes
  useEffect(() => {
    const initializeBudgets = async () => {
      try {
        const res = await fetch(`/api/budget?month=${currentMonth}`);
        const data = await res.json();
        
        // Convert the array of budgets to an object keyed by category
        const budgetObj = {};
        data.forEach(budget => {
          budgetObj[budget.category] = budget.amount;
        });
        
        setBudgets(budgetObj);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    
    initializeBudgets();
  }, [currentMonth]);

  const handleBudgetChange = (category, value) => {
    setBudgets(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const saveBudget = async (category) => {
    if (!budgets[category] || isNaN(budgets[category]) || budgets[category] <= 0) {
      toast.error("Please enter a valid budget amount");
      return;
    }

    try {
      setLoading(true);
      
      await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          amount: Number(budgets[category]),
          month: currentMonth
        }),
      });
      
      toast.success(`Budget for ${category} saved successfully!`);
      if (fetchBudgets) fetchBudgets();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white rounded-lg shadow-md border">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Set Monthly Budgets
        </h2>
        <div className="space-y-4">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center gap-4">
              <div className="w-1/3">
                <Label htmlFor={`budget-${category}`} className="text-gray-700">
                  {category}
                </Label>
              </div>
              <div className="w-1/3">
                <Input
                  id={`budget-${category}`}
                  type="number"
                  step="0.01"
                  min="0"
                  value={budgets[category] || ""}
                  onChange={(e) => handleBudgetChange(category, e.target.value)}
                  placeholder="Enter budget"
                  className="p-2 text-base rounded-md border focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
              <div className="w-1/3">
                <Button
                  onClick={() => saveBudget(category)}
                  disabled={loading}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 text-base rounded-md transition-all disabled:opacity-50"
                >
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}