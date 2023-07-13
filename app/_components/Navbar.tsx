import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCart } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="flex flex-col fixed w-full md:flex-row justify-between bg-white items-center">
      <div className="logo">
        <Image
          src="/codeswear.png"
          alt="Codes-Wear logo"
          width={200}
          height={50}
        />
      </div>
      <ul className="flex flex-col md:flex-row text-center p-3 md:space-x-6 font-semibold">
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
      {/* empty div for centering using justify-between */}
      <div></div>
      <div className="cart absolute top-2 right-3">
        <button className="text-pink-600 text-3xl">
          <BiCart />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
