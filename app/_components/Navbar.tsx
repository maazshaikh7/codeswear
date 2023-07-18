"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { BiArrowBack, BiCart, BiMenuAltLeft, BiX } from "react-icons/bi";
import ShoppingCart from "./ShoppingCart";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const ToggleClass = () => {
    setHidden(!hidden);
  };
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);
  const ToggleCart = () => {
    setIsCartDisplayed(!isCartDisplayed);
  };
  return (
    <nav className="flex flex-col fixed w-full md:flex-row justify-between bg-white z-10 shadow-md items-center p-1.5">
      <div className="logo">
        <Link href="/">
          <Image
            src="/codeswear.png"
            alt="Codes-Wear logo"
            width={150}
            height={30}
          />
        </Link>
      </div>
      <ul
        className={` flex flex-col md:flex-row ${
          hidden ? "hidden md:flex" : ""
        } text-center p-3 md:space-x-6 font-semibold`}
      >
        <Link href={"/tshirts"}>
          <li className="hover:text-pink-600">T-shirts</li>
        </Link>
        <Link href={"/hoodies"}>
          <li className="hover:text-pink-600">Hoodies</li>
        </Link>
        <Link href={"/sweatshirts"}>
          <li className="hover:text-pink-600">Sweatshirts</li>
        </Link>
        <Link href={"/mugs"}>
          <li className="hover:text-pink-600">Mugs</li>
        </Link>
      </ul>
      <div className={`md:w-32 ${hidden ? "hidden md:block" : ""}`}>
        <button className="bg-pink-600 text-white px-3 rounded-full ">
          Login
        </button>
      </div>

      {(pathname === "/checkout" && (
        <button
          className="absolute top-4 right-4  text-3xl "
          onClick={router.back}
        >
          <BiArrowBack />
        </button>
      )) ||
        (!(pathname === "/checkout") && (
          <button
            className="absolute top-3 right-4  text-3xl "
            onClick={ToggleCart}
          >
            <BiCart />
          </button>
        ))}

      <div className="hamburger absolute top-3 left-4 md:hidden">
        <button onClick={ToggleClass} className="text-3xl ">
          <BiMenuAltLeft />
        </button>
      </div>
      {!(pathname == "/checkout") && (
        <ShoppingCart display={isCartDisplayed} checkoutPage={false} />
      )}

      <button
        className={`text-3xl z-10 absolute top-3 right-4 ${
          !isCartDisplayed || pathname == "/checkout" ? "hidden" : ""
        }`}
        onClick={ToggleCart}
      >
        <BiX />
      </button>
    </nav>
  );
};

export default Navbar;
