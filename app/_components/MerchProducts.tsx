/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

type MerchProductsProps = {
  key: string;
  category: string;
  title: string;
  size: string;
  color: string;
  price: number;
  qtyInStock: number;
};

const MerchProducts: React.FC<MerchProductsProps> = ({
  key,
  title,
  size,
  color,
  price,
  qtyInStock,
  category,
}) => {
  return (
    <Link href={`/product/${key}`}>
      <div className="p-2 w-full shadow-md">
        <span className="block relative h-80 w-56 mx-auto rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </span>
        <div className="mt-4 text-center">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category.toUpperCase()}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title}
            <p className="text-sm">
              {size} - {color}
            </p>
          </h2>
          <p className="mt-1">₹{price.toFixed(2)}</p>
          <p className="text-sm text-green-600">
            {qtyInStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MerchProducts;
