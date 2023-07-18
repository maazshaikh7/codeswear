"use client";

import { createContext, useState, useEffect } from "react";

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

export type CartContextProps = {
  cart: Cart;
  addToCart: (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: "S" | "M" | "L" | "XL",
    variant: string
  ) => void;
  removeFromCart: (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: "S" | "M" | "L" | "XL",
    variant: string
  ) => void;
  clearCart: () => void;
  subTotal: number;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
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

  useEffect(() => {
    // Calculate subtotal whenever cart changes
    const calculateSubTotal = () => {
      let total = 0;
      Object.values(cart).forEach((item) => {
        total += item.qty * item.price;
      });
      setSubTotal(total);
      console.log(subTotal);
    };

    calculateSubTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const addToCart = (
    itemCode: string,
    qty: number,
    price: number,
    name: string,
    size: "S" | "M" | "L" | "XL",
    variant: string
  ) => {
    let newCart = { ...cart };

    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (itemCode: string, qty: number) => {
    let newCart = { ...cart };

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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, subTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
