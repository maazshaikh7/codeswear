import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import connectDb from "@/app/middleware";

export const GET = async () => {
  try {
    await connectDb();
    const products = await Product.find();

    // Filter out products that have no color variants or all variants with qtyInStock equal to 0
    const filteredProducts = products.filter((product: any) => {
      if (
        product.colorVariants &&
        Array.isArray(product.colorVariants) &&
        product.colorVariants.length > 0
      ) {
        // Filter out variants with qtyInStock equal to 0
        product.colorVariants = product.colorVariants.filter((variant: any) =>
          variant.sizes.some((size: any) => size.qtyInStock > 0)
        );
        return product.colorVariants.length > 0;
      }
      return false;
    });

    return NextResponse.json(filteredProducts);
  } catch (err) {
    console.error(err);
    return new NextResponse("hello", { status: 500 });
  }
};
