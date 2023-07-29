import connectDb from "@/app/middleware";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await connectDb();
    const data = await req.json();
    const { _id } = data;

    const deleteData = await Product.findByIdAndDelete(_id);

    if (deleteData) {
      return NextResponse.json({
        success: true,
        message: "Product deleted successfully!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete the product. Please try again!",
      });
    }
  } catch (error) {
    console.log("Error in deleting a new product:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
