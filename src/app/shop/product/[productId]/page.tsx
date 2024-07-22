"use client";

import { useGetByID } from "@/hooks/useProduct";
import { useCartStore } from "@/store/cart";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdOutlineNavigateNext } from "react-icons/md";
import Wrapper from "../../../../components/Wrapper";
import Image from "next/image";
import { SERVER_NAME } from "@/Api/axiosConfig";
import Link from "next/link";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CartType } from "@/types/cart/cart.type";
import { addItem } from "@/Api/cart-api";
import { UserStore } from "@/store/user";
import { toast } from "react-toastify";

function ProductInformation({
  params,
}: {
  params: { productId: string };
}) {
  const user = UserStore((state) => state.user);
  const { data: product, isLoading } = useGetByID(
    parseInt(params.productId)
  );
  const queryClient = useQueryClient();
  const [mainPhoto, setMainPhoto] = useState<string>("");
  const sizes = ["L", "XL", "XS"];
  const colors = ["primary", "red", "green"];

  const [quantity, setQuantity] = useState<number>(1);
  const [activeSize, setActiveSize] = useState("L");
  const [activeColor, setActiveColor] = useState("primary");
  useEffect(() => {
    setMainPhoto(
      product?.photos[0].url
        ? SERVER_NAME + product?.photos[0].url
        : ""
    );
  }, [product]);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!isNaN(parseInt(value))) {
      if (parseInt(value) === 0) {
        setQuantity(1);
      } else {
        setQuantity(parseInt(value));
      }
    }
  };
  const AddToCartMutation = useMutation({
    mutationFn: (
      data: Omit<CartType, "cartId" | "product">
    ) => addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", user?.userId],
      });
      toast.success("Add success!");
    },
    onError: () => {
      toast.error("Error");
    },
  });
  const handleChangeSize = (size: string) => {
    setActiveSize(size);
  };
  const handleChangeColor = (color: string) => {
    setActiveColor(color);
  };
  const handleChangeMainPhoto = (id: number) => {
    product?.photos.forEach((photo) => {
      if (photo.photoId === id) {
        setMainPhoto(SERVER_NAME + photo.url);
      }
    });
  };
  const handleAddToCart = () => {
    if (user) {
      let data: Omit<CartType, "cartId" | "product"> = {
        productId: product?.productId as number,
        quantity: quantity,
        userId: user?.userId as number,
      };
      AddToCartMutation.mutate(data);
    } else {
      toast.warning("Login please");
    }
  };
  return (
    <>
      <div className="w-full min-h-[100px] bg-[#F9F1E7] flex items-center">
        <Wrapper>
          <div>
            <p className="flex gap-2 items-center">
              <span className="font-semibold text-gray">
                Home
              </span>{" "}
              <MdOutlineNavigateNext />{" "}
              <Link href={"/shop"} className="text-gray">
                Shop
              </Link>
              <MdOutlineNavigateNext />{" "}
              <span className="border-l-2 border-gray pl-5 ml-4">
                {product?.productName}
              </span>
            </p>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <div className="flex gap-20 mt-10">
          <div className="flex w-1/2 gap-5">
            <div className="flex flex-col gap-5 w-[120px] max-h-[500px] overflow-auto">
              {product?.photos.map((photo) => (
                <div
                  key={photo.photoId}
                  className="bg-[#F9F1E7] w-[80px] h-[80px] rounded overflow-hidden"
                  onClick={() =>
                    handleChangeMainPhoto(photo.photoId)
                  }
                >
                  <Image
                    src={SERVER_NAME + photo.url}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
            <div className="bg-[#F9F1E7] max-h-[500px] w-full">
              <Image
                src={mainPhoto}
                alt=""
                width={100}
                height={100}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="pb-10 border-b-2 border-gray border-opacity-50">
              <h1 className="text-[42px]">
                {product?.productName}
              </h1>
              <p className="text-gray text-2xl">
                {product?.price.toLocaleString("vi-VN")}
              </p>
              <div className="flex gap-2 items-center mt-4">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <p className="border-l-2 border-gray pl-4 ml-2 text-gray opacity-50">
                  5 Customer Review
                </p>
              </div>
              <p className="text-xs w-1/2 mt-4">
                Setting the bar as one of the loudest
                speakers in its class, the Kilburn is a
                compact, stout-hearted hero with a
                well-balanced audio which boasts a clear
                midrange and extended highs for a sound.
              </p>
              {/* <h6 className="opacity-50 mt-5">Size</h6>
              <div className="flex gap-2 my-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleChangeSize(size)}
                    className={
                      size === activeSize
                        ? `w-[30px] h-[30px] text-sm rounded bg-primary text-white`
                        : `w-[30px] h-[30px] text-sm rounded bg-[#F9F1E7] text-black`
                    }
                  >
                    {size}
                  </button>
                ))}
                
              </div>
              <h6 className="opacity-50">Color</h6>
              <div className="flex gap-2 my-4">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleChangeColor(color)}
                    className={
                      activeColor === color
                        ? `w-[30px] h-[30px] bg-${color} rounded-full outline outline-offset-2 outline-${color}`
                        : `w-[30px] h-[30px] bg-${color} rounded-full`
                    }
                  ></button>
                ))}
                
              </div> */}
              <div className="flex gap-5 flex-wrap my-8">
                <div className=" flex px-4 py-2 border-2 w-fit border-gray rounded-lg">
                  <button
                    onClick={handleDecrement}
                    className="text-xl"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    onChange={handleChangeQuantity}
                    value={quantity}
                    className="border-none outline-none w-12 text-center"
                  />
                  <button
                    onClick={handleIncrement}
                    className="text-xl"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="border-2 w-fit border-gray rounded-lg px-4 py-2"
                >
                  Add To Cart
                </button>
                <button className="border-2 w-fit border-gray rounded-lg px-4 py-2">
                  + Compare
                </button>
              </div>
            </div>
            <div className="py-10">
              <div className="flex items-center text-black opacity-50 mb-2">
                <p className="w-20 mr-2">SKU</p>
                <span>:</span>
                <p className="ml-2">SS001</p>
              </div>
              <div className="flex items-center text-black opacity-50 mb-2">
                <p className="w-20 mr-2">Category</p>
                <span>:</span>
                <p className="ml-2">SS001</p>
              </div>
              <div className="flex items-center text-black opacity-50 mb-2">
                <p className="w-20 mr-2">Tags</p>
                <span>:</span>
                <p className="ml-2">SS001</p>
              </div>
              <div className="flex items-center text-black">
                <p className="w-20 mr-2 opacity-50">
                  Share
                </p>
                <span>:</span>
                <div className="ml-2 flex gap-2">
                  <button className="text-xl">
                    <FaFacebook />
                  </button>
                  <button className="text-xl">
                    <FaLinkedin />
                  </button>
                  <button className="text-xl">
                    <AiFillTwitterCircle />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <div className="border-y-[1px] border-gray border-opacity-50 py-10">
        <Wrapper>
          <div className="grid place-items-center">
            <div className="flex gap-8 text-2xl">
              <div>Description</div>
              <div>Additional Information</div>
              <div className="flex gap-2">
                Review<p>[5]</p>
              </div>
            </div>
          </div>
          <div className="w-4/5 mx-auto mt-10">
            <p className="max-h-[200px] overflow-auto opacity-50">
              Embodying the raw, wayward spirit of rock ‘n’
              roll, the Kilburn portable active stereo
              speaker takes the unmistakable look and sound
              of Marshall, unplugs the chords, and takes the
              show on the road.
              <br /> Weighing in under 7 pounds, the Kilburn
              is a lightweight piece of vintage styled
              engineering. Setting the bar as one of the
              loudest speakers in its class, the Kilburn is
              a compact, stout-hearted hero with a
              well-balanced audio which boasts a clear
              midrange and extended highs for a sound that
              is both articulate and pronounced. The
              analogue knobs allow you to fine tune the
              controls to your personal preferences while
              the guitar-influenced leather strap enables
              easy and stylish travel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-8">
            <div className="h-[350px] bg-primary"></div>
            <div className="h-[350px] bg-primary"></div>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <h1>Related Products</h1>
        <div>
          <button>Show More</button>
        </div>
      </Wrapper>
    </>
  );
}

export default ProductInformation;
