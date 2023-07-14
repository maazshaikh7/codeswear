import React from "react";
import { BiSolidDiscount } from "react-icons/bi";
import { TbHanger, TbTruckDelivery } from "react-icons/tb";

const Content = () => {
  return (
    <section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-6 text-gray-900">
              Wear the &lt; code &gt;
            </h1>
            <p className="lg:w-2/3 w-full leading-relaxed text-gray-500">
              Introducing CodesWear, a revolutionary e-commerce platform that
              delivers amazing products at unbeatable prices. Built on a
              foundation of NextJs and MongoDB, our website offers a seamless
              shopping experience powered by server-side rendering.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 text-2xl inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <TbHanger />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Premium Tshirts
                </h2>
                <p className="leading-relaxed text-base">
                  Our T-Shirts are 100% made of cotton.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 text-2xl inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <TbTruckDelivery />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Free Shipping
                </h2>
                <p className="leading-relaxed text-base">
                  We ship all over India for FREE.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 text-2xl inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <BiSolidDiscount />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Exciting Offers
                </h2>
                <p className="leading-relaxed text-base">
                  We provide amazing offers & discount
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Content;
