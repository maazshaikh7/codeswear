import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import connectDb from "@/app/middleware";
import { NextApiRequest } from "next";

export async function POST(req: Request) {
  try {
    await connectDb();

    const data = await req.json();

    const saveData = await Product.create(data);

    if (saveData) {
      return NextResponse.json({
        success: true,
        message: "Product added successfully!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to add the Product. Please try again!",
      });
    }
  } catch (error) {
    console.log("Error in adding a new Product:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
