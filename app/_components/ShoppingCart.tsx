import React from "react";
import CartItem from "./CartItem";
type ShoppingCartProps = {
  display: boolean;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({ display }) => {
  return (
    <div
      className={`${
        display ? "translate-x-0" : "translate-x-full"
      } absolute min-h-screen top-0 duration-300 right-0 bg-pink-50 px-8 py-8 lg:w-[30%] w-3/4 sm:w-1/2 `}
    >
      <h2 className="font-bold text-2xl pb-6">Shopping Cart</h2>
      <hr className="bg-black h-1" />
      <ol className="font-semibold my-8">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </ol>
      <div className="font-semibold my-8">Subtotal : ₹23987</div>
      <button className="bg-pink-500 text-white px-3 py-1 m-3 rounded-md">
        Checkout
      </button>
      <button className="bg-pink-500 text-white px-3 py-1 m-3 rounded-md">
        Clear
      </button>
    </div>
  );
};

export default ShoppingCart;
