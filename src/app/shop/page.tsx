"use client";

import { useShopStore } from "@/store/shop";
import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
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
import { useGetAllProduct } from "@/hooks/useProduct";
import { SERVER_NAME } from "@/Api/axiosConfig";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CartType } from "@/types/cart/cart.type";
import { addItem } from "@/Api/cart-api";
import { toast } from "react-toastify";
import { UserStore } from "@/store/user";
import { MoonLoader } from "react-spinners";

function ShopPage() {
  const user = UserStore((state) => state.user);
  const queryClient = useQueryClient();
  const [pageSize, setPageSize] = useState<number>(16);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] =
    useState<string>("");
  const { data, isLoading } = useGetAllProduct(
    page,
    searchValue
  );
  const [pageCount, setPageCount] = useState<number>(5);
  const [pageList, setPageList] = useState<number[]>([]);
  const display = useShopStore((state) => state.display);
  const toList = useShopStore((state) => state.toList);
  const toMenu = useShopStore((state) => state.toMenu);

  useEffect(() => {
    setPageSize(data?.pageSize ? data?.pageSize : 5);
    setPageCount(data?.pageCount ? data?.pageCount : 0);
    setPageList(
      Array.from(
        { length: data?.pageCount ? data?.pageCount : 0 },
        (_, i) => i + 1
      )
    );
  }, [data]);

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

  const handleChangePage = (p: number) => {
    setPage(p);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          className="w-full min-h-[200px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div>
            <Image src={logo} alt="Logo" />
          </div>
          <h1 className="text-5xl my-2">Shop</h1>
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
                Showing {pageSize * (page - 1) + 1}-
                {pageSize * page}
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
        {isLoading && (
          <div className="flex justify-center mt-5">
            <MoonLoader color="#000000" size={40} />
          </div>
        )}
        {display === "menu" && (
          <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-8 my-10">
            {data?.products.map((product) => (
              <Item
                key={product.productId}
                productID={product.productId}
                description={product.description}
                photo={SERVER_NAME + product.photos[0].url}
                price={product.price}
                productName={product.productName}
                isNew={true}
                user={user}
                AddToCartMutation={AddToCartMutation}
              />
            ))}
          </div>
        )}
        {display === "list" && (
          <div className="mt-10">
            {data?.products.map((product) => (
              <ItemHorizontal
                key={product.productId}
                productID={product.productId}
                description={product.description}
                photo={SERVER_NAME + product.photos[0].url}
                price={product.price}
                productName={product.productName}
                isNew={true}
                user={user}
                AddToCartMutation={AddToCartMutation}
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
            {pageList.map((p) => (
              <li key={p}>
                <button
                  className={`py-4 px-6 rounded-md ${
                    p === page
                      ? "bg-primary text-white"
                      : "bg-[#F9F1E7]"
                  }`}
                  onClick={() => handleChangePage(p)}
                >
                  {p}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`py-4 px-6 bg-[#F9F1E7] rounded-md ${
                  page === pageCount ? "opacity-50" : ""
                }`}
                disabled={page === pageCount ? true : false}
                onClick={() => handleChangePage(page + 1)}
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
