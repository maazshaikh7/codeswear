"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack, BiCart, BiMenuAltLeft, BiX } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import ShoppingCart from "./ShoppingCart";
import { usePathname, useRouter } from "next/navigation";
import CartContext, { CartContextProps } from "../_context/CartContext";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cart } = useContext(CartContext) as CartContextProps;
  const [hidden, setHidden] = useState(false);
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);
  const [token, setToken] = useState(
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null
  );
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedOutToast, setLoggedOutToast] = useState(false);

  useEffect(() => {
    if (token) {
      router.refresh;
    }
  });

  const ToggleClass = () => {
    setHidden(!hidden);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setLoggedOutToast(true);
    setTimeout(() => {
      setLoggedOutToast(false);
    }, 3000);
    setUserName("");
    router.push("/");
  };

  useEffect(() => {
    // Get the token and user's name from local storage on component mount
    if (typeof localStorage !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUserName = localStorage.getItem("user");

      if (storedToken && storedUserName) {
        setToken(storedToken);
        const names = JSON.parse(storedUserName).name.split(" ");
        if (names.length > 0) {
          setUserName(names[0].charAt(0).toUpperCase() + names[0].slice(1));
        }
      }
    }

    if (Object.keys(cart).length === 0) {
      setIsCartDisplayed(false);
    }
  }, [cart]);

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
        className={`flex flex-col md:flex-row ${
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

      {/* Check if the user is logged in and display the appropriate content */}
      {userName ? (
        <div className="md:relative absolute right-12 md:right-14 md:top-1 top-3">
          <MdAccountCircle
            className="text-3xl text-pink-600 cursor-pointer"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute flex justify-center flex-col top-12 right-0 bg-white border shadow-lg border-gray-200 rounded-md ">
              <Link href="/account" className="text-center p-1 hover:underline">
                Account
              </Link>
              <Link href="/orders" className="text-center p-1 hover:underline">
                Orders
              </Link>
              <hr />
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 focus:outline-none"
              >
                Logout
              </button>
            </div>
          )}
          <p className="text-xs hidden md:block text-center font-semibold text-gray-700">
            {userName}
          </p>
        </div>
      ) : (
        <div className={`md:w-32 ${hidden ? "hidden md:block" : ""}`}>
          <button
            onClick={() => router.push("/signup")}
            className="bg-pink-600 text-white px-3 rounded-full "
          >
            Sign up
          </button>
        </div>
      )}
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
      {loggedOutToast && (
        <div className="absolute top-20 flex justify-center w-screen">
          <p className=" px-4 py-2 bg-pink-300 font-medium rounded-md animate-smooth-bounce">
            Logged out successfully!
          </p>
        </div>
      )}
      {!isCartDisplayed && pathname !== "/checkout" && (
        <div className="absolute top-2 right-2 text-sm bg-pink-600 rounded-full px-1">
          {Object.keys(cart).length}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
