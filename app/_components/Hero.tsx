import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      {" "}
      <div className="pt-14 flex justify-center w-screen">
        <Image
          src={"/background.jpg"}
          alt="Background Image"
          className="h-[80vh] w-auto opacity-90 object-cover"
          width="1000"
          height="1000"
        />
        <button className="absolute top-3/4 bg-white text-black font-bold p-2 px-4 rounded-full">
          <Link href="/tshirts">SHOP NOW</Link>
        </button>
        <div className="flex justify-between top-[30vh] absolute text-5xl pt-24 lg:px-16 w-screen">
          <button className="bg-pink-100 h-16 w-16 md:h-20 md:w-20 rounded-full">
            {"<"}
          </button>
          <button className="bg-pink-100 h-16 w-16 md:h-20 md:w-20 rounded-full">
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
