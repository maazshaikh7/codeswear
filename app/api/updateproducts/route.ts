import connectDb from "@/app/middleware";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await connectDb();
    const data = await req.json();
    const {
      title,
      _id,
      description,
      slug,
      quantity,
      price,
      category,
      img,
      variants,
    } = data;

    const saveData = await Product.findByIdAndUpdate(
      { _id },
      {
        title: title,
        description: description,
        slug: slug,
        price: price,
        quantity: quantity,
        category: category,
        img: img,
        variants: variants,
      }
    );

    if (saveData) {
      return NextResponse.json({
        success: true,
        message: "Product updated successfully!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to update the product. Please try again!",
      });
    }
  } catch (error) {
    console.log("Error in updating a new product:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
