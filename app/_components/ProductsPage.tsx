"use client";
import React, { useEffect, useState } from "react";
import MerchProducts from "@/app/_components/MerchProducts";

type VariantData = {
  size: string;
  color: string;
  price: number;
  qtyInStock: number;
  _id: string;
};

type ProductData = {
  _id: string;
  title: string;
  category: string;
  variants: VariantData[];
};

type ProductsPageProps = {
  category: string;
};

const ProductsPage: React.FC<ProductsPageProps> = ({ category }) => {
  const [merchandiseData, setMerchandiseData] = useState<ProductData[]>([]);

  useEffect(() => {
    // Fetch merchandise data from the API
    fetch("http://localhost:3000/api/getproducts")
      .then((response) => response.json())
      .then((data) => setMerchandiseData(data))
      .catch((error) =>
        console.error("Error fetching merchandise data:", error)
      );
  }, []); // Remove merchandiseData from the dependency array

  // Filter the merchandise data based on the provided category
  const filteredData = merchandiseData.filter(
    (item) => item.category === category
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-center text-3xl font-semibold my-10">
          BEST SELLING {category.toUpperCase()}S ON CODESWEAR
        </h2>
        <hr className="mb-10" />
        <div className="flex flex-wrap -m-4 gap-6 gap-x-10 justify-center">
          {filteredData.map((item: ProductData) =>
            item.variants.map((variant: VariantData) => (
              <MerchProducts
                key={variant._id}
                title={item.title}
                category={item.category}
                size={variant.size}
                color={variant.color}
                price={variant.price}
                qtyInStock={variant.qtyInStock}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
