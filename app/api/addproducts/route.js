import { NextResponse } from "next/server";
import Product from "@/app/models/Product";
import connectDb from "@/app/middleware";

export const POST = async (req) => {
  try {
    await connectDb(); // Await the database connection
    if (req.body !== null) {
      for (let i = 0; i < req.body.length; i++) {
        const newProduct = new Product({
          title: req.body[i].title,
          description: req.body[i].description,
          category: req.body[i].category,
          img: req.body[i].img,
          price: req.body[i].price,
          qtyInStock: req.body[i].qtyInStock,
          slug: req.body[i].slug,
          color: req.body[i].color,
          size: req.body[i].size,
        });
        await newProduct.save();
      }
      return new NextResponse("success", { status: 200 }); // Return success after all products are processed
    }
  } catch (err) {
    console.error(err); // It's better to log the actual error to debug
    return new NextResponse("error", { status: 500 }); // Return error if something goes wrong
  }
};
