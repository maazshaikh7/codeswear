import React from "react";
import Carousel from "./Carousel";

const Hero = () => {
  const images = [
    "/carousel2.webp",
    "/carousel1.webp",
    "/carousel3.webp",
    "/carousel4.webp",
    "/carousel5.webp",
  ];

  return (
    <main className="pt-16">
      <Carousel images={images} />
    </main>
  );
};

export default Hero;
