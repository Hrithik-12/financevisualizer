import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String, // Format: "YYYY-MM"
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure uniqueness of category+month combination
BudgetSchema.index({ category: 1, month: 1 }, { unique: true });

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);