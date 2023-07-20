import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import connectDb from "@/app/middleware";

export const GET = async () => {
  try {
    await connectDb();
    const products = await Product.find();
    // Filter out variants with qtyInStock equal to 0
    products.forEach((product: any) => {
      if (product.variants && Array.isArray(product.variants)) {
        product.variants = product.variants.filter(
          (variant: any) => variant.qtyInStock > 0
        );
      }
    });
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return new NextResponse("hello", { status: 500 });
  }
};
