"use client";

import Image from "next/image";
import Logo from "../assets/images/logo.png";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMenuSharp } from "react-icons/io5";
import MobileNavbar from "./MobileNavbar";
import { useState } from "react";
import { UserStore } from "@/store/user";
import { useCartStore } from "@/store/cart";

function Header() {
  const cart = useCartStore((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="fixed top-0 bg-white w-full z-[100] shadow-md">
      <header className="flex justify-between items-center w-11/12 mx-auto max-w-[1536px] min-h-[100px]">
        {isOpen && (
          <MobileNavbar
            handleOpenNavbar={handleOpenNavbar}
          />
        )}
        <div className="flex gap-5">
          <button
            className="text-3xl hidden xs:block sm:block"
            onClick={handleOpenNavbar}
          >
            <IoMenuSharp />
          </button>
          <Link
            href={"/home"}
            className="flex gap-2 items-center text-3xl font-semibold"
          >
            <Image
              src={Logo}
              width={50}
              height={32}
              alt="Logo"
            />
            <h1 className="font-logo">Furniro</h1>
          </Link>
        </div>
        <nav className="sm:hidden xs:hidden">
          <ul className="flex gap-8">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-6 text-2xl">
          <Link
            href={"/account"}
            className="xs:hidden sm:hidden"
          >
            <CiUser />
          </Link>
          <div className="xs:hidden sm:hidden">
            <CiSearch />
          </div>
          <Link
            href={"/wishlist"}
            className="xs:hidden sm:hidden"
          >
            <CiHeart />
          </Link>
          <Link href={"/cart"} className="relative">
            {cart.length > 0 && (
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red text-sm grid place-items-center text-white">
                {cart.length}
              </div>
            )}
            <MdOutlineShoppingCart />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
