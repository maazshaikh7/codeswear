import React, { useContext } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import CartContext, { CartContextProps } from "@/app/_context/CartContext";

type CartItemProps = {
  itemCode: string;
  checkoutPage?: boolean;
};

const CartItem: React.FC<CartItemProps> = ({ itemCode, checkoutPage }) => {
  const { cart, addToCart, removeFromCart } = useContext(
    CartContext
  ) as CartContextProps;
  const item = cart[itemCode];

  if (!item) {
    // Item not found in the cart, handle this case
    return (
      <>
        <li className="py-5 sm:px-3">
          <div
            className={`flex justify-between p-1 ${
              checkoutPage ? "md:mx-10 " : ""
            }`}
          >
            <p>Item not found in the cart.</p>
          </div>
        </li>
        <hr />
      </>
    );
  }

  const addToCartHandler = () => {
    addToCart(
      itemCode,
      1,
      item.price,
      item.name,
      item.size,
      item.variant,
      item.image
    );
  };

  const removeFromCartHandler = () => {
    removeFromCart(itemCode, 1);
  };

  return (
    <>
      <li className="py-5 sm:px-3">
        <div
          className={`flex justify-between items-center p-1 ${
            checkoutPage ? "md:mx-10 " : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-sm hidden sm:block shadow-md w-20 h-20"
            src={item.image}
            alt="product image"
          />
          <p className="line-clamp-3 m-4">
            {`${item.name} - ${item.variant} (${item.size})`}
            {!checkoutPage && (
              <>
                <br />
                <span className="font-light">{`₹${item.price}`}</span>
              </>
            )}
          </p>
          {checkoutPage && (
            <span className="font-light my-auto">{`₹${item.price}`}</span>
          )}
          <div className="flex space-x-2 items-center">
            <button onClick={removeFromCartHandler}>
              <BiMinusCircle />
            </button>
            <span>{item.qty || 0}</span>
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
