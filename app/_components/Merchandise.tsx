/* eslint-disable @next/next/no-img-element */
import React from "react";
import MerchProducts from "./MerchProducts";
type MerchandiseProps = {
  type: string;
  quantity: number;
};
const Merchandise: React.FC<MerchandiseProps> = ({ type, quantity }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 gap-6 gap-x-10 justify-center">
          {[...Array(quantity)].map((_, index) => (
            <MerchProducts key={index} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Merchandise;
