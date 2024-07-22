"use client";

import { User } from "@/store/user";
import { CartType } from "@/types/cart/cart.type";
import { UseMutationResult } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BsArrowLeftRight,
  BsCartPlus,
} from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";

type PropType = {
  productID: number;
  productName: string;
  description: string;
  price: number;
  isNew: boolean;
  photo: string;
  user: User | null;
  AddToCartMutation?: UseMutationResult<
    any,
    Error,
    Omit<CartType, "cartId" | "product">,
    unknown
  >;
};

function ItemHorizontal(props: PropType) {
  const router = useRouter();
  const {
    productID,
    productName,
    description,
    price,
    isNew,
    photo,
    user,
    AddToCartMutation,
  } = props;
  const handleAddToCart = () => {
    if (user) {
      AddToCartMutation?.mutate({
        productId: productID,
        userId: user?.userId as number,
        quantity: 1,
      });
    } else {
      toast.warning("Login please!");
    }
  };
  const handleClick = (productId: number) => {
    router.push(`/shop/product/${productId}`);
  };
  return (
    <div className="flex mb-5">
      <div className="">
        <Image
          src={photo}
          alt="product-image"
          width={100}
          height={100}
          className="w-[300px] h-[300px]"
        />
      </div>
      <div className="flex-1 px-5 py-5 border-t-[1px] border-r-[1px] border-b-[1px]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {productName}
            </h1>
            <p className="opacity-50 mt-5 w-1/2">
              Description
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="flex items-center gap-2 bg-green text-white px-6 py-2 rounded"
              onClick={handleAddToCart}
            >
              <BsCartPlus />
              <span>Add To Cart</span>
            </button>
            {/* <div className="flex gap-4 mt-5">
              <button className="flex gap-1 items-center font-semibold text-base">
                <IoMdShare />
                Share
              </button>
              <button className="flex gap-1 items-center font-semibold text-base">
                <BsArrowLeftRight />
                Compare
              </button>
              <button className="flex gap-1 items-center font-semibold text-base">
                <FaRegHeart />
                Like
              </button>
            </div> */}
          </div>
        </div>
        <div className="text-end mt-28">
          <div>
            <span className="line-through opacity-50 mr-5">
              Rp 3,500.00
            </span>
            {price.toLocaleString("vi-VN")}
          </div>
          <div className="grid place-content-end mt-2">
            <button
              className="flex items-center justify-end gap-2"
              onClick={() => handleClick(productID)}
            >
              <span>View Details</span>
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemHorizontal;
