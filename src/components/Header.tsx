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
import { MouseEvent, useEffect, useState } from "react";
import { User, UserStore } from "@/store/user";
import { useCartStore } from "@/store/cart";
import product from "@/assets/images/image-3.png";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

function Header() {
  const cart = useCartStore((state) => state.cart);
  const Logout = UserStore((state) => state.Logout);
  const User = UserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleOpenNavbar = () => {
    setIsOpen(!isOpen);
  };
  const removeFromCart = useCartStore(
    (state) => state.RemoveFromCart
  );
  const handleRemove = (event: MouseEvent, id: number) => {
    event.preventDefault();
    removeFromCart(id);
  };
  const handleLogout = async (event: MouseEvent) => {
    event.preventDefault();
    await Logout();
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
          {!User && (
            <Link
              href={"/account"}
              className="xs:hidden sm:hidden"
            >
              <CiUser />
            </Link>
          )}
          {User && (
            <Link
              href={"/User"}
              className="flex items-center gap-2 relative group before:content-[''] hover:before:block hover:before:absolute hover:before:top-6 hover:before:right-0 hover:before:w-[200px] hover:before:h-[80px] hover:before:z-50 hover:before:cursor-default"
            >
              <div className="absolute hidden top-20 right-0 w-[200px] bg-white cursor-default shadow z-50 overflow-x-auto group-hover:block lg:group-hover:hidden md:group-hover:hidden sm:group-hover:hidden xs:group-hover:hidden">
                <button
                  className="text-sm text-center w-full p-4"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
              <p className="text-sm">
                {User.firstname + " " + User.lastname}
              </p>
              <Image
                src={Logo}
                alt="avata"
                className="w-[40px] h-[40px] rounded-full"
              />
            </Link>
          )}
          {/* <Link
            href={"/account"}
            className="xs:hidden sm:hidden"
          >
            <CiUser />
          </Link> */}
          <div className="xs:hidden sm:hidden">
            <CiSearch />
          </div>
          <Link
            href={"/wishlist"}
            className="xs:hidden sm:hidden"
          >
            <CiHeart />
          </Link>
          <Link
            href={"/cart"}
            className="relative group before:content-[''] hover:before:block hover:before:absolute hover:before:top-6 hover:before:right-0 hover:before:w-[400px] hover:before:h-[80px] hover:before:z-50 hover:before:cursor-default"
          >
            {cart.length > 0 && (
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red text-sm grid place-items-center text-white">
                {cart.length}
              </div>
            )}
            {cart.length > 0 && (
              <div className="absolute hidden top-20 right-0 w-[400px] max-h-[600px] bg-white cursor-default shadow z-50 overflow-x-auto py-4 group-hover:block lg:group-hover:hidden md:group-hover:hidden sm:group-hover:hidden xs:group-hover:hidden">
                {cart.map((item) => (
                  <div
                    key={item.productID}
                    className="flex items-center justify-between px-10 py-5 text-base"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-24 h-24">
                        <Image
                          src={product}
                          alt="product"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="w-[120px] truncate">
                          {item.productName}
                        </p>
                        <div className="flex justify-between">
                          <p>{item.quantity}</p>
                          <span>x</span>
                          <p>{item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="text-xl"
                        onClick={(event) =>
                          handleRemove(
                            event,
                            item.productID
                          )
                        }
                      >
                        <IoIosCloseCircle />
                      </button>
                    </div>
                  </div>
                ))}
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
