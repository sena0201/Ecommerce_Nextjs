"use client";

import { SERVER_NAME } from "@/Api/axiosConfig";
import { removeItem } from "@/Api/cart-api";
import { useCarts } from "@/hooks/useCart";
import { UserStore } from "@/store/user";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { toast } from "react-toastify";
import Logo from "../assets/images/logo.png";
import MobileNavbar from "../components/MobileNavbar";

function Header() {
  const Logout = UserStore((state) => state.Logout);
  const User = UserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: Carts } = useCarts(User?.userId);
  const queryClient = useQueryClient();
  const handleOpenNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleRemove = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    removeItemMutation.mutate(id);
  };
  const handleLogout = async (event: MouseEvent) => {
    event.preventDefault();
    await Logout();
  };
  const removeItemMutation = useMutation({
    mutationFn: (data: number) => removeItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", User?.userId],
      });
    },
    onError: () => {
      toast.error("Error");
    },
  });
  return (
    <header className="fixed top-0 bg-white w-full z-[100] shadow-md">
      <div className="flex justify-between items-center w-11/12 mx-auto max-w-[1536px] min-h-[100px]">
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
            href={"/"}
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
            <div className="relative group before:content-[''] hover:before:block hover:before:absolute hover:before:top-6 hover:before:right-0 hover:before:w-[250px] hover:before:h-[80px] hover:before:z-50 hover:before:cursor-default">
              <div className="absolute hidden top-20 right-0 w-[200px] bg-white cursor-default shadow z-50 overflow-x-auto group-hover:block">
                <button
                  className="text-sm text-center w-full p-4"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
              <Link
                href={"/User"}
                className="flex items-center"
              >
                <p className="text-sm mr-2 md:hidden xs:hidden">
                  {User.firstname + " " + User.lastname}
                </p>
                <Image
                  width={40}
                  height={40}
                  src={SERVER_NAME + User.photo}
                  alt=""
                  className="rounded-full w-8 h-8"
                />
              </Link>
            </div>
          )}
          {/* <div className="xs:hidden sm:hidden">
            <CiSearch />
          </div> */}
          <Link
            href={"/history"}
            className="xs:hidden sm:hidden"
          >
            <TbNotes />
          </Link>
          <Link
            href={"/cart"}
            className="relative group before:content-[''] hover:before:block hover:before:absolute hover:before:top-6 hover:before:right-0 hover:before:w-[400px] hover:before:h-[80px] hover:before:z-50 hover:before:cursor-default"
          >
            {Carts && Carts.length > 0 && (
              <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red text-sm grid place-items-center text-white">
                {Carts?.length}
              </span>
            )}
            {Carts && Carts.length > 0 && (
              <div className="absolute hidden top-20 right-0 w-[400px] max-h-[600px] bg-white cursor-default shadow z-50 overflow-x-auto py-4 group-hover:block lg:group-hover:hidden md:group-hover:hidden sm:group-hover:hidden xs:group-hover:hidden">
                {Carts?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between px-10 py-5 text-base"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-24 h-24">
                        <Image
                          src={
                            SERVER_NAME +
                            item.product.photos[0].url
                          }
                          width={100}
                          height={100}
                          alt="product"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="w-[120px] truncate">
                          {item.product.productName}
                        </p>
                        <div className="flex justify-between">
                          <p>{item.quantity}</p>
                          <span>x</span>
                          <p>{item.product.price}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="text-xl"
                        onClick={(e) =>
                          handleRemove(e, item.cartId)
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
      </div>
    </header>
  );
}

export default Header;
