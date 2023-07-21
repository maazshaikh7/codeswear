/* eslint-disable @next/next/no-img-element */
// MerchProducts.tsx
import React from "react";
import Link from "next/link";

type VariantData = {
  size: string;
  color: string;
  price: number;
  qtyInStock: number;
  _id: string;
};

type MerchProductsProps = {
  title: string;
  category: string;
  variants: VariantData[];
};

const MerchProducts: React.FC<MerchProductsProps> = ({
  title,
  category,
  variants,
}) => {
  return (
    <Link href={`/product/${variants[0]._id}`}>
      {" "}
      {/* Use the first variant's ID for the link */}
      <div className="p-2 w-full shadow-md">
        <span className="block relative h-80 w-56 mx-auto rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </span>
        <div className="mt-4 text-center">
          <h3 className="text-gray-500 text-xs  tracking-widest title-font mb-1">
            {category.toUpperCase()}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title}
          </h2>
          <p className="mt-1">₹{variants[0].price.toFixed(2)}</p>
          <hr className="my-2" />
          {variants.length > 0 && (
            <p>
              Size:
              {variants.map((variant) => (
                <li
                  key={variant._id}
                  className="inline bg-pink-200  px-2 m-1 rounded-full"
                >
                  {variant.size}
                </li>
              ))}
            </p>
          )}

          {/* Display the price of the first variant */}
          <p className="text-sm text-gray-600">
            {variants.some(
              (variant) => variant.qtyInStock > 0
            ) /* Check if any variant is in stock */
              ? ""
              : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MerchProducts;
