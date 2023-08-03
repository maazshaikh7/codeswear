"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hover:scale-110 duration-300"
            src={img}
            alt={`Image ${index + 1}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
