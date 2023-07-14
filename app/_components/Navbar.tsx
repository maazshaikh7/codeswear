"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { BiCart, BiMenuAltLeft } from "react-icons/bi";

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const ToggleClass = () => {
    setActive(!isActive);
  };
  return (
    <nav className="flex flex-col fixed w-full md:flex-row justify-between bg-white items-center p-1.5">
      <div className="logo">
        <Image
          src="/codeswear.png"
          alt="Codes-Wear logo"
          width={150}
          height={30}
        />
      </div>
      <ul
        className={` flex flex-col md:flex-row ${
          isActive ? "hidden md:flex" : ""
        } text-center p-3 md:space-x-6 font-semibold`}
      >
        <Link href={"/"}>
          <li>T-shirts</li>
        </Link>
        <Link href={"/"}>
          <li>Hoodies</li>
        </Link>
        <Link href={"/"}>
          <li>Sweatshirts</li>
        </Link>
        <Link href={"/"}>
          <li>Mugs</li>
        </Link>
      </ul>
      <div className={`md:w-32 ${isActive ? "hidden md:block" : ""}`}>
        <button className="bg-pink-600 text-white px-3 rounded-full ">
          Login
        </button>
      </div>
      <div className="cart absolute top-3 right-4">
        <button className="text-pink-600 text-3xl ">
          <BiCart />
        </button>
      </div>
      <div className="hamburger absolute top-3 left-4 md:hidden">
        <button onClick={ToggleClass} className="text-pink-600 text-3xl ">
          <BiMenuAltLeft />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
