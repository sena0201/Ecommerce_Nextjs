"use client";

import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import background from "../../assets/images/background.png";
import Link from "next/link";
import img1 from "../../assets/images/image-100.png";
import img2 from "../../assets/images/image-101.png";
import img3 from "../../assets/images/image-106.png";
import Item from "@/components/Item";
import { useCartStore } from "@/store/cart";

function HomePage() {
  return (
    <div>
      <div className="w-full h-auto relative">
        <Image
          src={background}
          alt="background"
          className="w-full"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-[10%] w-1/3 lg:w-1/2 h-fit bg-[#FFF3E3] rounded-xl md:hidden sm:hidden xs:hidden">
          <div className="px-10 py-12">
            <p className="font-medium">New Arrival</p>
            <h1 className="font-bold text-[52px] text-primary">
              Discover Our New Collection
            </h1>
            <p className="mt-4 font-medium">
              Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis.
            </p>
            <Link
              href={"/shop"}
              className="text-white font-medium bg-primary px-10 py-4 mt-10 block w-fit"
            >
              BUY NOW
            </Link>
          </div>
        </div>
      </div>
      <Wrapper>
        <div className="py-12">
          <h1 className="w-full text-center text-4xl font-bold">
            Brown The Range
          </h1>
          <p className="w-full text-center text-gray mt-2">
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit
          </p>
          <div className="flex justify-between mt-14 flex-wrap">
            <div className="overflow-hidden flex flex-col items-center w-[30%] sm:w-full sm:mt-5 xs:w-full xs:mt-5">
              <Image
                src={img1}
                alt="img1"
                className="rounded-xl w-full"
              />
              <p className="font-bold text-2xl mt-8">
                Dining
              </p>
            </div>
            <div className="overflow-hidden flex flex-col items-center w-[30%] sm:w-full sm:mt-5 xs:w-full xs:mt-5">
              <Image
                src={img2}
                alt="img2"
                className="rounded-xl w-full"
              />
              <p className="font-bold text-2xl mt-8">
                Dining
              </p>
            </div>
            <div className="overflow-hidden flex flex-col items-center w-[30%] sm:w-full sm:mt-5 xs:w-full xs:mt-5">
              <Image
                src={img3}
                alt="img3"
                className="rounded-xl w-full"
              />
              <p className="font-bold text-2xl mt-8">
                Dining
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
      <Wrapper>
        <div className="py-12">
          <h1 className="w-full text-center text-4xl font-bold">
            Our Products
          </h1>
          <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-8 mt-14">
            {/* <Item
              productID={123}
              productName="abc"
              price={1000}
              // AddToCart={AddToCart}
            /> */}
            {/* <Item AddToCart={AddToCart} />
            <Item AddToCart={AddToCart} />
            <Item AddToCart={AddToCart} />
            <Item AddToCart={AddToCart} />
            <Item AddToCart={AddToCart} />
            <Item AddToCart={AddToCart} />
            <Item AddToCart={AddToCart} /> */}
          </div>
          <div className="flex justify-center mt-8">
            <button className="text-primary font-semibold border-2 border-primary px-8 py-3">
              Show More
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default HomePage;
