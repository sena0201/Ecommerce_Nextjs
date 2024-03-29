"use client";

import { useShopStore } from "@/store/shop";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import Wrapper from "@/components/Wrapper";
import img from "../../assets/images/Rectangle_1.png";
import logo from "../../assets/images/logo.png";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdFilterAlt } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import { ImMenu } from "react-icons/im";
import Item from "@/components/Item";
import { useCartStore } from "@/store/cart";
import ItemHorizontal from "@/components/ItemHorizontal";

function ShopPage() {
  const products = useShopStore((state) => state.products);
  const AddToCart = useCartStore(
    (state) => state.AddToCart
  );

  const [pageSize, setPageSize] = useState<number>(16);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(5);
  const [pageList, setPageList] = useState<number[]>([]);
  const display = useShopStore((state) => state.display);
  const toList = useShopStore((state) => state.toList);
  const toMenu = useShopStore((state) => state.toMenu);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setPageSize(value);
    } else setPageSize(1);
  };

  const handleMenuDisplay = (type: string) => {
    toMenu(type);
  };
  const handleListDisplay = (type: string) => {
    toList(type);
  };

  const handleChangePage = () => {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (products.length % pageSize === 0) {
      setPageCount(products.length / pageSize);
    } else {
      setPageCount(
        Math.floor(products.length / pageSize) + 1
      );
    }
    if (pageCount === 0) {
      setPageCount(1);
    }
    setPageList(
      Array.from(
        { length: pageCount },
        (_, index) => index + 1
      )
    );
    console.log(pageList);
  };

  return (
    <div>
      <div className="relative">
        <Image
          src={img}
          alt="Cart background"
          className="w-full"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div>
            <Image src={logo} alt="Logo" />
          </div>
          <h1 className="text-5xl my-2">Cart</h1>
          <p className="flex gap-2 items-center">
            <span className="font-semibold">Home</span>{" "}
            <MdOutlineNavigateNext /> Shop
          </p>
        </div>
      </div>
      <div className="bg-[#F9F1E7] min-h-[100px] flex items-center py-4">
        <Wrapper>
          <div className="flex justify-between items-center flex-wrap gap-5">
            <div className="text-2xl flex items-center gap-5">
              <button className="flex gap-2 items-center">
                <MdFilterAlt />
                <p className="text-base">Filter</p>
              </button>
              <button
                className={
                  display === "menu"
                    ? "border-[1px] border-black p-1"
                    : ""
                }
                onClick={() => handleMenuDisplay("menu")}
              >
                <CgMenuGridR />
              </button>
              <button
                className={
                  display === "list"
                    ? "border-[1px] border-black p-1"
                    : ""
                }
                onClick={() => handleListDisplay("list")}
              >
                <ImMenu />
              </button>
              <p className="text-base border-l-2 border-gray pl-5">
                Showing 1-{pageSize} of {products.length}{" "}
                results
              </p>
            </div>
            <form
              className="flex gap-2 items-center"
              onSubmit={handleSubmit}
            >
              Show
              <input
                type="number"
                name="pageSize"
                className="border-none outline-none p-2 w-16"
                onChange={handleChange}
              />
              Short by
              <input
                type="number"
                placeholder="Default"
                name="shortby"
                className="border-none outline-none p-2 w-40"
              />
              <button></button>
            </form>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        {display === "menu" && (
          <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-8 my-10">
            {products.map((product) => (
              <Item
                key={product.productID}
                productID={product.productID}
                productName={product.productName}
                price={product.price}
                discount={product.discount}
                isNew={product.isNew}
                AddToCart={AddToCart}
              />
            ))}
          </div>
        )}
        {display === "list" && (
          <div className="mt-10">
            {products.map((product) => (
              <ItemHorizontal
                key={product.productID}
                productID={product.productID}
                productName={product.productName}
                price={product.price}
                discount={product.discount}
                isNew={product.isNew}
                AddToCart={AddToCart}
              />
            ))}
          </div>
        )}
        {/* <div className="mt-10">
          {products.map((product) => (
            <ItemHorizontal
              key={product.productID}
              productID={product.productID}
              productName={product.productName}
              price={product.price}
              discount={product.discount}
              isNew={product.isNew}
              AddToCart={AddToCart}
            />
          ))}
        </div> */}
        <div className="flex justify-center items-center py-5">
          <ul className="flex gap-2">
            <li>
              <button
                className="py-4 px-6 bg-[#F9F1E7] rounded-md"
                onClick={handleChangePage}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </Wrapper>
    </div>
  );
}

export default ShopPage;
