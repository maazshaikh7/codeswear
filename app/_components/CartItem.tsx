import Image from "next/image";
import React, { useState } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

const CartItem = () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <li className="py-5 px-3">
        <div className="flex items-center space-x-2">
          <Image
            className="rotate-90 rounded-sm shadow-md"
            src="/background.jpg"
            alt="product image"
            width={60}
            height={60}
          />
          <p className="line-clamp-3">T-shirt - 100% </p>
          <button
            onClick={() => setCount(count - 1)}
            disabled={count == 0 ? true : false}
          >
            <BiMinusCircle />
          </button>
          <span>{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            disabled={count >= 5 ? true : false}
          >
            <BiPlusCircle />
          </button>
        </div>
      </li>
      <hr />
    </>
  );
};

export default CartItem;
