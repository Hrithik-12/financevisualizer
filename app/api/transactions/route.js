import connectMongo from "@/libdb/db";
import Transactionschema from "@/modalsdb/Transactionschema";

export async function GET() {
  await connectMongo();
  const transactions = await Transactionschema.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(request) {
  await connectMongo();
  const body = await request.json();
  const transaction = await Transactionschema.create(body);
  return Response.json(transaction);
}

export async function PUT(request) {
  await connectMongo();
  const { _id, ...data } = await request.json();
  const transaction = await Transactionschema.findByIdAndUpdate(_id, data, { new: true });
  return Response.json(transaction);
}

export async function DELETE(request) {
  await connectMongo();
  const { _id } = await request.json();
  await Transactionschema.findByIdAndDelete(_id);
  return Response.json({ message: "Deleted" });
}
