"use client";
//TODO : Display different colors of same product as different cards
import React, { useEffect, useState } from "react";
import MerchProducts, {
  ColorVariantData,
  SizeData,
} from "@/app/_components/MerchProducts";
import Loading from "../loading";

export type ProductData = {
  variants: any;
  img: string | undefined;
  description: string;
  _id: string;
  slug: string;
  title: string;
  category: string;
  colorVariants: ColorVariantData[];
};

type ProductsPageProps = {
  category: string;
};

const ProductsPage: React.FC<ProductsPageProps> = ({ category }) => {
  const [merchandiseData, setMerchandiseData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products data from the API
    fetch("/api/getproducts")
      .then((response) => response.json())
      .then((data) => {
        setMerchandiseData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap -m-4 gap-6 gap-x-10 justify-center">
            {filteredData.length === 0 && (
              <p>
                Sorry all the {category}s are out of stock. New stock coming
                soon!
              </p>
            )}
            {filteredData.map((item: ProductData) => (
              <MerchProducts
                key={item._id}
                slug={item.slug}
                title={item.title}
                category={item.category}
                colorVariants={item.colorVariants}
                image={
                  item.img ??
                  "https://cdn1.vectorstock.com/i/1000x1000/60/10/grayscale-silhouette-with-male-t-shirt-vector-13486010.jpg"
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
