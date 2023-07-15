"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

type CartItem = {
  qty: number;
  price: number;
  name: string;
  size: "S" | "M" | "L" | "XL";
  variant: string;
};

type Cart = {
  [itemCode: string]: CartItem;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart>({});
  const [subTotal, setSubTotal] = useState<number>(0);
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart !== null) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addToCart = (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: "S" | "M" | "L" | "XL",
    variant: string
  ): void => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const removeFromCart = (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: "S" | "M" | "L" | "XL",
    variant: string
  ): void => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty < 1) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart({});
    localStorage.setItem("cart", JSON.stringify({}));
  };
  console.log(children);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// newCart[itemCode] = {
//   qty: 2,
//   price: 19.99,
//   name: "T-Shirt",
//   size: "M",
//   variant: "Red",
// };
