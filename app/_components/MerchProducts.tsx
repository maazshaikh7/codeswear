/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
type MerchProductsProps = {
  type: string;
};

const MerchProducts: React.FC<MerchProductsProps> = ({ type }) => {
  return (
    <Link href={"/product/itemCode"}>
      <div className="p-2 w-full shadow-md ">
        <span className="block relative h-80 w-56 mx-auto rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </span>
        <div className="mt-4 text-center">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {type}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            The Catalyzer
          </h2>
          <p className="mt-1">₹16.00</p>
        </div>
      </div>
    </Link>
  );
};

export default MerchProducts;
