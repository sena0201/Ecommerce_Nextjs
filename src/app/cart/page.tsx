"use client";

import Wrapper from "@/components/Wrapper";
import { useCarts } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart";
import { UserStore } from "@/store/user";
import { ProductType } from "@/types/product/product.type";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import {
  MdDelete,
  MdOutlineNavigateNext,
} from "react-icons/md";
import img from "../../assets/images/Rectangle_1.png";
import product from "../../assets/images/image-3.png";
import logo from "../../assets/images/logo.png";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { removeItem, updateItem } from "@/Api/cart-api";
import { toast } from "react-toastify";
import { SERVER_NAME } from "@/Api/axiosConfig";
import { CartType } from "@/types/cart/cart.type";
import { MoonLoader } from "react-spinners";
import { createOrder } from "@/Api/order-api";
import {
  OrderDetail,
  createOrderDetail,
} from "@/Api/order-detail-api";
import { useRouter } from "next/navigation";

type Item = {
  cartId: number;
  quantity: number;
  product: ProductType;
  checked: boolean;
};

function CartPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const User = UserStore((state) => state.user);
  const { data: Carts } = useCarts(User?.userId);
  const [checkedAll, setCheckedAll] =
    useState<boolean>(false);
  const [newCart, setNewCart] =
    useState<(CartType & { checked: boolean })[]>();
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

  const UpdateQuantityMutation = useMutation({
    mutationFn: (data: {
      cartId: number;
      quantity: number;
    }) => updateItem(data.cartId, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", User?.userId],
      });
    },
  });

  const CreateOrderDetailMutation = useMutation({
    mutationFn: (data: OrderDetail) =>
      createOrderDetail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", User?.userId],
      });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Error");
    },
  });

  const handleCheckedAll = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedAll(!checkedAll);
    setNewCart(
      newCart?.map((item) =>
        e.target.checked === true
          ? { ...item, checked: true }
          : { ...item, checked: false }
      )
    );
  };

  const handleChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const cartId = parseInt(e.target.name);
    const value = parseInt(e.target.value);
    if (isNaN(value) || isNaN(cartId)) {
      toast.warning("Number");
    } else {
      UpdateQuantityMutation.mutate({
        cartId: cartId,
        quantity: value,
      });
    }
  };

  const handleChecked = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let id = parseInt(e.target.name);
    if (e.target.checked === true) {
      setNewCart(
        newCart?.map((item) =>
          item.cartId === id
            ? { ...item, checked: true }
            : item
        )
      );
    } else {
      setNewCart(
        newCart?.map((item) =>
          item.cartId === id
            ? { ...item, checked: false }
            : item
        )
      );
    }
  };

  const handleOrder = async () => {
    if (User) {
      let hasChecked = newCart?.some(
        (item) => item.checked === true
      );
      if (hasChecked) {
        const getOrderId = await createOrder(User.userId);
        if (getOrderId) {
          let checkedList = newCart?.filter((item) => {
            return item.checked === true;
          });
          const data: OrderDetail = {
            List: checkedList,
            orderId: getOrderId.orderId,
          };
          CreateOrderDetailMutation.mutate(data);
          checkedList?.forEach((item) => {
            removeItemMutation.mutate(item.cartId);
          });
        }
      }
    }
  };

  useEffect(() => {
    setNewCart(
      Carts?.map((item) => {
        return { ...item, checked: false };
      })
    );
  }, [Carts]);
  useEffect(() => {
    if (!User) {
      router.push("/account");
    }
  }, [User, router]);

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
          <h1 className="text-5xl my-2">Cart</h1>
          <p className="flex gap-2 items-center">
            <span className="font-semibold">Home</span>{" "}
            <MdOutlineNavigateNext /> Cart
          </p>
        </div>
      </div>
      <Wrapper>
        <div className="grid grid-cols-3 md:grid-cols-2 md:grid-rows-2 sm:grid-cols-1 sm:grid-rows-2 xs:grid-cols-1 xs:grid-rows-2 my-5">
          <div className="col-span-2">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9F1E7]">
                  <th className="w-[50px]">
                    <input
                      type="checkbox"
                      checked={checkedAll}
                      onChange={handleCheckedAll}
                    />
                  </th>
                  <th className=" py-4">Product</th>
                  <th className="text-start py-4">Price</th>
                  <th className="text-start py-4">
                    Quantity
                  </th>
                  <th className="text-start py-4">
                    Subtotal
                  </th>
                  <th className="py-4"></th>
                </tr>
              </thead>
              <tbody>
                {newCart?.map((item: Item) => (
                  <tr key={item.cartId}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        name={item.cartId.toString()}
                        checked={item.checked}
                        onChange={handleChecked}
                      />
                    </td>
                    <td className="flex flex-wrap md:flex-col sm:flex-col xs:flex-col items-center my-6">
                      <Image
                        src={
                          SERVER_NAME +
                          item.product.photos[0].url
                        }
                        alt="Logo"
                        className="w-[100px]"
                        width={100}
                        height={100}
                      />
                      <span className="ml-4">
                        {item.product.productName}
                      </span>
                    </td>
                    <td className="my-6">
                      {item.product.price}
                    </td>
                    <td className="my-6 ">
                      <button
                        onClick={() =>
                          UpdateQuantityMutation.mutate({
                            cartId: item.cartId,
                            quantity: item.quantity - 1,
                          })
                        }
                        className="text-xl border-[1px] px-2 rounded"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        name={item.cartId.toString()}
                        value={item.quantity}
                        className="border-none outline-none px-4 py-2 w-20 text-center"
                        onChange={handleChangeQuantity}
                      />
                      <button
                        onClick={() =>
                          UpdateQuantityMutation.mutate({
                            cartId: item.cartId,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="text-xl border-[1px] px-2 rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="my-6">
                      {item.product.price * item.quantity}
                    </td>
                    <td className="text-xl text-primary">
                      <button
                        onClick={() =>
                          removeItemMutation.mutate(
                            item.cartId
                          )
                        }
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ml-12 md:col-start-2 md:m-0 sm:m-0 xs:m-0">
            <div className="bg-[#F9F1E7] flex flex-col items-center py-4 px-8 lg:px-6">
              <h1 className="text-3xl mb-8 md:text-2xl">
                Cart Totals
              </h1>
              <div className="w-1/2 flex justify-between mb-4 lg:w-full md:w-full sm:w-full xs:w-full">
                <p>Subtotal</p>{" "}
                <p>
                  {newCart?.reduce(
                    (acc, item) =>
                      item.checked
                        ? acc +
                          item.product.price * item.quantity
                        : acc,
                    0
                  )}
                </p>
              </div>
              <div className="w-1/2 flex justify-between mb-6 lg:w-full md:w-full sm:w-full xs:w-full">
                <p>Total</p>{" "}
                <p>
                  {newCart?.reduce(
                    (acc, item) =>
                      item.checked
                        ? acc +
                          item.product.price * item.quantity
                        : acc,
                    0
                  )}
                </p>
              </div>
              <button
                className={`py-2 px-6 border-[1px] border-black rounded-xl mb-10 hover:bg-primary hover:text-white ${
                  newCart?.some(
                    (item) => item.checked === true
                  )
                    ? ""
                    : "hover:bg-inherit hover:text-black opacity-50"
                }`}
                onClick={handleOrder}
                disabled={
                  newCart?.some(
                    (item) => item.checked === true
                  )
                    ? false
                    : true
                }
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default CartPage;
