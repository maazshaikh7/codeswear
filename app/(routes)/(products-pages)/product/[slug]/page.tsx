/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import CartContext, { CartContextProps } from "@/app/_context/CartContext";
import { ColorVariantData } from "@/app/_components/MerchProducts";
import { ProductData } from "@/app/_components/ProductsPage";
import Loading from "@/app/loading";

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { addToCart } = useContext(CartContext) as CartContextProps;
  const [pin, setPin] = useState<null | string>();
  const [service, setService] = useState<null | boolean>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [hasSelectedColorAndSize, setHasSelectedColorAndSize] = useState(false);
  const [attemptedAddToCart, setAttemptedAddToCart] = useState(false);

  useEffect(() => {
    // Check if the user has made both color and size selections
    setHasSelectedColorAndSize(!!selectedColor && !!selectedSize);
  }, [selectedColor, selectedSize]);

  const handleAddToCart = () => {
    setAttemptedAddToCart(true);
    if (productData && selectedColor && selectedSize) {
      const variant = productData.colorVariants.find(
        (v: ColorVariantData) =>
          v.color === selectedColor &&
          v.sizes.some((s) => s.size === selectedSize)
      );
      if (variant) {
        const selectedSizeData = variant.sizes.find(
          (s) => s.size === selectedSize
        );
        if (selectedSizeData) {
          addToCart(
            selectedSizeData._id,
            1,
            selectedSizeData.price,
            productData.title,
            selectedSizeData.size,
            variant.color,
            productData.img ?? ""
          );
        }
      }
    }
  };

  const handleBuyNow = () => {
    setAttemptedAddToCart(true);
    handleAddToCart();
    if (productData && selectedColor && selectedSize) {
      router.push("/checkout");
    }
  };

  const handleCheckServiceAvailability = async () => {
    try {
      const pinsResponse = await fetch("http://localhost:3000/api/pincode");
      const pinsJson = await pinsResponse.json();

      if (pinsJson.includes(pin ? parseInt(pin) : "")) {
        setService(true);
      } else {
        setService(false);
      }
    } catch (error) {
      console.error("Error occurred while fetching pin codes:", error);
    }
  };

  useEffect(() => {
    // Fetch products data from the API
    fetch("/api/products/getproducts")
      .then((response) => response.json())
      .then((data) => {
        // Find the product data with the matching slug
        const foundProduct = data.find(
          (item: ProductData) => item.slug === params.slug
        );
        if (foundProduct) {
          setProductData(foundProduct);
        }
      })
      .catch((error) => console.error("Error fetching products data:", error));
  }, [params.slug]);

  if (!productData) {
    // Show loading or error message if the product data is not yet fetched
    return <Loading />;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={productData.title + " image"}
            className="lg:w-1/2 w-full pt-12 lg:h-96 object-contain rounded"
            src={productData.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {productData.category.toUpperCase()}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {productData.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-pink-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">{productData.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {productData.colorVariants.map(
                  (colorVariant: ColorVariantData) => {
                    return (
                      <button
                        key={colorVariant.color}
                        style={{
                          backgroundColor: colorVariant.color,
                          border: "2px solid #D1D5DB",
                          marginLeft: "0.25rem",
                          borderRadius: "9999px",
                          width: "1.5rem",
                          height: "1.5rem",
                          outline: "none",
                          boxShadow:
                            selectedColor === colorVariant.color
                              ? "0 0 0 2px gray"
                              : "none",
                        }}
                        onClick={() => setSelectedColor(colorVariant.color)}
                      ></button>
                    );
                  }
                )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    value={selectedSize || ""}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select Size</option>
                    {productData.colorVariants
                      .filter(
                        (colorVariant) => colorVariant.color === selectedColor
                      )
                      .map((colorVariant) =>
                        colorVariant.sizes.map((size) => (
                          <option key={size._id} value={size.size}>
                            {size.size}
                          </option>
                        ))
                      )}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="title-font font-medium text-2xl text-gray-900 mb-10">
                ₹{productData.colorVariants[0]?.sizes[0]?.price}
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </span>
              <button
                onClick={handleAddToCart}
                className=" text-white bg-neutral-800 border-0 py-2 px-3 focus:outline-none hover:bg-neutral-900 rounded-full"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className=" text-white w-full bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded-full"
              >
                Buy Now
              </button>
              {attemptedAddToCart && !hasSelectedColorAndSize && (
                <p className="text-red-500 p-2 text-sm">
                  Please select a color and size before proceeding.
                </p>
              )}
            </div>
            <div className="pincode mt-10 mx-auto w-screen sm:w-auto">
              <input
                onChange={(e) => setPin(e.target.value)}
                className="border-black border-[1px] p-1 sm:p-2 rounded-l-full"
                type="number"
                name="pincode"
                id="pincode"
              />
              <label htmlFor="pincode">
                <button
                  onClick={handleCheckServiceAvailability}
                  className="p-1 sm:p-2 rounded-r-full border-black border-[1px] bg-black text-white"
                >
                  Check Availability
                </button>
              </label>
              {(!service && service !== null && (
                <p className="text-red-500 p-2 text-sm">
                  Sorry! We do not deliver to this pincode.
                </p>
              )) ||
                (service && (
                  <p className="text-green-600 p-2 text-sm">
                    Yay! Pincode eligible for delivery.
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
