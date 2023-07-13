import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <Image
        src={"/background.jpg"}
        alt="Background Image"
        width={2000}
        height={2000}
      />
    </div>
  );
};

export default Hero;
