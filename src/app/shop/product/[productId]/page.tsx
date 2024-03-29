"use client";

import Wrapper from "../../../../components/Wrapper";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";
import { useCartStore } from "@/store/cart";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useShopStore } from "@/store/shop";
import { Product } from "@/types/product";
import { toast } from "react-toastify";

function ProductInformation({
  params,
}: {
  params: { productId: string };
}) {
  const products = useShopStore((state) => state.products);
  const product = products.find(
    (product) =>
      product.productID === parseInt(params.productId)
  );
  const sizes = ["L", "XL", "XS"];
  const colors = ["primary", "red", "green"];
  const AddToCart = useCartStore(
    (state) => state.AddToCart
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeSize, setActiveSize] = useState("L");
  const [activeColor, setActiveColor] = useState("primary");
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
  const handleAddToCart = (product?: Product) => {
    if (product) {
      AddToCart({
        ...product,
        quantity: quantity,
      });
    } else {
      toast.error("Error");
    }
  };
  const handleChangeSize = (size: string) => {
    setActiveSize(size);
  };
  const handleChangeColor = (color: string) => {
    setActiveColor(color);
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
              <span className="text-gray">Shop</span>
              <MdOutlineNavigateNext />{" "}
              <span className="border-l-2 border-gray pl-5 ml-4">
                Asgaard sofa
              </span>
            </p>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <div className="flex gap-20 mt-10">
          <div className="flex w-1/2 gap-5">
            <div className="flex flex-wrap gap-5 w-[120px] max-h-[500px] overflow-auto">
              <div className="bg-[#F9F1E7] w-[80px] h-[80px] rounded overflow-hidden"></div>
              <div className="bg-[#F9F1E7] w-[80px] h-[80px] rounded overflow-hidden"></div>
              <div className="bg-[#F9F1E7] w-[80px] h-[80px] rounded overflow-hidden"></div>
              <div className="bg-[#F9F1E7] w-[80px] h-[80px] rounded overflow-hidden"></div>
              <div className="bg-[#F9F1E7] w-[80px] h-[80px] rounded overflow-hidden"></div>
              <div className="bg-[#F9F1E7] w-[80px] h-[80px] rounded overflow-hidden"></div>
            </div>
            <div className="bg-[#F9F1E7] max-h-[500px] w-full"></div>
          </div>
          <div className="w-1/2">
            <div className="pb-10 border-b-2 border-gray border-opacity-50">
              <h1 className="text-[42px]">
                {product?.productName}
              </h1>
              <p className="text-gray text-2xl">
                {product?.price}
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
              <h6 className="opacity-50 mt-5">Size</h6>
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
                {/* <button className="w-[30px] h-[30px] text-sm rounded bg-[#F9F1E7] text-black">
                    L
                  </button>
                  <button className="w-[30px] h-[30px] text-sm rounded bg-[#F9F1E7] text-black">
                    XL
                  </button>
                  <button className="w-[30px] h-[30px] text-sm rounded bg-[#F9F1E7] text-black">
                    XS
                  </button> */}
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
                {/* <button className="w-[30px] h-[30px] bg-primary rounded-full outline outline-offset-2 outline-primary"></button>
                  <button className="w-[30px] h-[30px] bg-red rounded-full"></button>
                  <button className="w-[30px] h-[30px] bg-green rounded-full"></button> */}
              </div>
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
                  onClick={() => handleAddToCart(product)}
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
