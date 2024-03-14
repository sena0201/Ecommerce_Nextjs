import img1 from "../assets/images/image-3.png";
import { IoMdShare } from "react-icons/io";
import { BsArrowLeftRight } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { Product } from "@/store/cart";

type Item = {
  AddToCart: (product: Product) => void;
};

function Item(props: Item) {
  const { AddToCart } = props;
  const handleAddToCart = () => {
    AddToCart({
      productId: 123,
      productName: "abc",
      quantity: 12,
      price: 1000,
    });
  };
  return (
    <div className="bg-[#F4F5F7] relative group">
      <div className="absolute top-0 left-0 w-full h-full bg-black z-50 bg-opacity-70 group-hover:grid place-items-center hidden">
        <div className="flex flex-col items-center">
          <button
            className="bg-white px-12 py-4 text-primary font-semibold"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <div className="flex gap-4 text-white mt-5">
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
          </div>
        </div>
      </div>
      <div className="overflow-hidden relative">
        <div className="absolute top-6 right-6 bg-red rounded-full w-10 h-10 text-sm font-semibold text-white grid place-items-center group-hover:hidden">
          -50%
        </div>
        <Image src={img1} alt="img4" className="w-full" />
      </div>
      <div className="px-4 py-6">
        <h3 className="text-2xl font-semibold">
          Syltherine
        </h3>
        <p className="font-sm text-gray my-4">
          Stylish cafe chair
        </p>
        <p className="font-semibold">
          Rp 2.500.000{" "}
          <span className="line-through opacity-50 text-sm">
            Rp 3.500.000
          </span>
        </p>
      </div>
    </div>
  );
}

export default Item;
