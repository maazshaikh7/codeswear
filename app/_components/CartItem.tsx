import Image from "next/image";
import React, { useContext } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import CartContext, { CartContextProps } from "@/app/_context/CartContext";
type cartItemProps = {
  checkoutPage?: boolean;
};
const CartItem: React.FC<cartItemProps> = ({ checkoutPage }) => {
  const { addToCart, removeFromCart, cart } = useContext(
    CartContext
  ) as CartContextProps;

  const addToCartHandler = () => {
    addToCart("12345", 1, 500, "TSHIRT", "S", "RED");
  };
  const removeFromCartHandler = () => {
    removeFromCart("12345", 1);
  };

  return (
    <>
      <li className="py-5 px-3">
        <div className={`flex justify-between ${checkoutPage ? "mx-10" : ""}`}>
          <Image
            className="rounded-sm shadow-md"
            src="/background.jpg"
            alt="product image"
            width={40}
            height={50}
          />
          <p className="line-clamp-3 m-4">
            {`${cart["12345"]?.name} - ${cart["12345"]?.variant} (${cart["12345"]?.size})`}
            {!checkoutPage && (
              <>
                <br />
                <span className="font-light">
                  {`₹${cart["12345"]?.price}`}{" "}
                </span>
              </>
            )}
          </p>
          {checkoutPage && (
            <span className="font-light my-auto">
              {`₹${cart["12345"]?.price}`}{" "}
            </span>
          )}
          <div className="flex space-x-2 items-center">
            <button onClick={removeFromCartHandler}>
              <BiMinusCircle />
            </button>
            <span>{cart["12345"]?.qty || 0}</span>
            <button onClick={addToCartHandler}>
              <BiPlusCircle />
            </button>
          </div>
        </div>
      </li>
      <hr />
    </>
  );
};

export default CartItem;
