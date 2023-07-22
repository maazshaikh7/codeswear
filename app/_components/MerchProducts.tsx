/* eslint-disable @next/next/no-img-element */
// MerchProducts.tsx
import React from "react";
import Link from "next/link";

export type SizeData = {
  size: string;
  price: number;
  qtyInStock: number;
  _id: string;
};

export type ColorVariantData = {
  size: string | number | readonly string[] | undefined;
  color: string;
  sizes: SizeData[];
  _id: string;
};

type MerchProductsProps = {
  title: string;
  slug: string;
  category: string;
  colorVariants: ColorVariantData[];
};

const MerchProducts: React.FC<MerchProductsProps> = ({
  title,
  slug,
  category,
  colorVariants,
}) => {
  return (
    <Link href={`/product/${slug}`}>
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
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category.toUpperCase()}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title}
          </h2>
          <p className="mt-1">₹{colorVariants[0].sizes[0].price.toFixed(2)}</p>
          <hr className="my-2" />
          {colorVariants.length > 0 && (
            <p>
              Color:
              {colorVariants.map((colorVariant) => (
                <li
                  key={colorVariant._id}
                  className="inline bg-pink-200 px-2 m-1 rounded-full"
                >
                  {colorVariant.color}
                </li>
              ))}
            </p>
          )}
          <p>
            Sizes:
            {colorVariants.length > 0 &&
              colorVariants[0].sizes.map((size) => (
                <li
                  key={size._id}
                  className="inline bg-pink-200 px-2 m-1 rounded-full"
                >
                  {size.size}
                </li>
              ))}
          </p>
          {/* Display the price of the first variant */}
          <p className="text-sm text-gray-600">
            {colorVariants.some((colorVariant) =>
              colorVariant.sizes.some((size) => size.qtyInStock > 0)
            )
              ? ""
              : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MerchProducts;
