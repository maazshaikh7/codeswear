import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import connectDb from "@/app/middleware";

export const GET = async () => {
  await connectDb();
  try {
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return new NextResponse("hello", { status: 500 });
  }
};
