import connectMongo from "@/libdb/db";
import BudgetSchema from "@/modalsdb/BudgetSchema";

// GET Route: Fetch budgets, filtered by month if provided
export async function GET(request) {
  try {
    await connectMongo();

    // Get the month parameter from URL if provided
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");

    let query = {};
    if (month) {
      query.month = month;
    }

    const budgets = await BudgetSchema.find(query).sort({ category: 1 });

    // Properly respond with JSON data
    return new Response(JSON.stringify(budgets), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST Route: Create or update a budget
export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.json();

    // Check if a budget for this category and month already exists
    const existingBudget = await BudgetSchema.findOne({
      category: body.category,
      month: body.month,
    });

    if (existingBudget) {
      // Update the existing budget
      existingBudget.amount = body.amount;
      await existingBudget.save();

      return new Response(JSON.stringify(existingBudget), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Create a new budget
      const budget = await BudgetSchema.create(body);

      return new Response(JSON.stringify(budget), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// DELETE Route: Delete a budget by its ID
export async function DELETE(request) {
  try {
    await connectMongo();
    const { _id } = await request.json();
    const deletedBudget = await BudgetSchema.findByIdAndDelete(_id);

    if (deletedBudget) {
      return new Response(
        JSON.stringify({ message: "Budget deleted" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Budget not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
