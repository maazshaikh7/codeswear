"use client";
import AddProduct from "@/app/_components/AddProduct";
import React, { useState } from "react";

const Dashboard = () => {
  const [addProduct, setAddProduct] = useState(false);
  const toggleAddProduct = () => {
    setAddProduct(!addProduct);
  };
  return (
    <div className="pt-16 grid place-items-center">
      <div>
        <button className="mx-auto" onClick={toggleAddProduct}>
          Add product
        </button>
        {addProduct && <AddProduct />}
      </div>
      {/* <div>
        <button className="mx-auto" onClick={toggleAddProduct}>
          Add product
        </button>
        {addProduct && <AddProduct />}
      </div>
      <div>
        <button className="mx-auto" onClick={toggleAddProduct}>
          Add product
        </button>
        {addProduct && <AddProduct />}
      </div> */}
    </div>
  );
};

export default Dashboard;
