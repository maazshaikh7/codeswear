"use client";
import { useContext } from "react";
import CartItem from "./CartItem";
import CartContext, { CartContextProps } from "@/app/_context/CartContext";
import { useRouter } from "next/navigation";

type ShoppingCartProps = {
  display: boolean;
  checkoutPage: boolean;
};

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  display,
  checkoutPage,
}) => {
  const router = useRouter();
  const { subTotal, clearCart, cart } = useContext(
    CartContext
  ) as CartContextProps;
  const handleOnClick = () => {
    if (checkoutPage) {
      router.push("/order");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <aside
      className={`${display ? "translate-x-0" : "translate-x-full"} ${
        checkoutPage
          ? "pt-24 px-2 md:mx-10"
          : "min-h-screen absolute top-0 duration-300 right-0 bg-pink-50 px-8 py-8 lg:w-[30%] w-3/4 sm:w-1/2 "
      }`}
    >
      <h2 className="font-bold text-2xl pb-6 ">
        {checkoutPage ? "ORDER SUMMARY" : "Your cart"}
      </h2>
      <hr className="bg-black h-1" />
      <ol className="font-semibold my-8">
        {Object.keys(cart).map(() => {
          return <CartItem key={987} checkoutPage={checkoutPage} />;
        })}
      </ol>
      {Object.keys(cart).length == 0 && <p>No items in your cart!</p>}
      <div className="text-center">
        <div className="font-semibold my-8">Subtotal : ₹{subTotal}</div>
        <button
          onClick={handleOnClick}
          disabled={Object.keys(cart).length == 0}
          className="bg-pink-600 text-white px-3 py-1 m-3 rounded-md"
        >
          {checkoutPage ? `Place Order` : "Checkout"}
        </button>
        <button
          onClick={clearCart}
          className="bg-pink-400 text-white px-3 py-1 m-3 rounded-md"
        >
          Clear
        </button>
      </div>
    </aside>
  );
};

export default ShoppingCart;
