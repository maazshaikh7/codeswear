"use client";
import React, { useEffect, useState } from "react";
import MerchProducts from "@/app/_components/MerchProducts";

const Layout = () => {
  const [merchandiseData, setMerchandiseData] = useState([]);

  useEffect(() => {
    // Fetch merchandise data from the API
    fetch("http://localhost:3000/api/getproducts")
      .then((response) => response.json())
      .then((data) => setMerchandiseData(data))
      .catch((error) =>
        console.error("Error fetching merchandise data:", error)
      );
    console.log(merchandiseData);
  }, [merchandiseData]);

  // Filter the merchandise data based on the provided category
  let category = "Product Category";
  const filteredData = merchandiseData.filter(
    (item) => item.category == category
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 gap-6 gap-x-10 justify-center">
          {filteredData.map((item) =>
            item.variants.map((variant) => (
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

export default Layout;
