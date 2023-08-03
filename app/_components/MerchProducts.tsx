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
  image: string;
};

const MerchProducts: React.FC<MerchProductsProps> = ({
  title,
  slug,
  category,
  colorVariants,
  image,
}) => {
  return (
    <Link href={`/product/${slug}`}>
      {/* Use the first variant's ID for the link */}
      <div className="p-2 w-72 shadow-md">
        <div className="mt-4 text-center">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {category.toUpperCase()}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium line-clamp-1">
            {title}
          </h2>
        </div>
        <span className="block relative my-3 h-64 w-56 mx-auto rounded-md overflow-hidden border-y-2 border-gray-100">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={image}
          />
        </span>

        <div className="text-center">
          <p className="my-2 bg-pink-50">
            ₹{colorVariants[0].sizes[0].price.toFixed(2)}
          </p>
          <hr className="my-2" />
          {colorVariants.length > 0 && (
            <ul className="flex justify-center">
              Color:
              {colorVariants.map((colorVariant) => (
                <li
                  key={colorVariant._id}
                  style={{
                    backgroundColor: colorVariant.color,
                    filter: "brightness(95%)",
                    border: "2px solid #D1D5DB",
                    marginLeft: "0.25rem",
                    borderRadius: "9999px",
                    width: "1.5rem",
                    height: "1.5rem",
                    outline: "none",
                  }}
                ></li>
              ))}
            </ul>
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
