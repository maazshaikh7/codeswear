/* eslint-disable @next/next/no-img-element */
import React from "react";
type MerchProductsProps = {
  type: string;
};

const MerchProducts: React.FC<MerchProductsProps> = ({ type }) => {
  return (
    <div className="lg:w-1/4 sm:w-1/2 md:w-1/3 p-2 w-full shadow-md ">
      <a className="block relative h-80 w-56 mx-auto rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      </a>
      <div className="mt-4 text-center">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {type}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          The Catalyzer
        </h2>
        <p className="mt-1">$16.00</p>
      </div>
    </div>
  );
};

export default MerchProducts;
