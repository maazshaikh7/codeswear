import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="pt-14 flex justify-center">
      <Image
        src={"/background.jpg"}
        alt="Background Image"
        width={1500}
        height={1}
      />
    </div>
  );
};

export default Hero;
