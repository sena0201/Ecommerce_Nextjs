"use client";

import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import img from "../../assets/images/Rectangle_1.png";
import logo from "../../assets/images/logo.png";
import { MdOutlineNavigateNext } from "react-icons/md";
import product from "../../assets/images/image-3.png";
import { MdDelete } from "react-icons/md";
import { useCartStore } from "@/store/cart";
import { ChangeEvent, useState } from "react";

function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const [checkedAll, setCheckedAll] =
    useState<boolean>(false);
  const [newCart, setNewCart] = useState(
    cart.map((item) => {
      return { ...item, checked: false };
    })
  );
  const removeFromCart = useCartStore(
    (state) => state.RemoveFromCart
  );
  const increment = useCartStore(
    (state) => state.incrementQuantity
  );
  const decrement = useCartStore(
    (state) => state.decrementQuantity
  );

  const handleIncrement = (id: number) => {
    increment(id);
  };

  const handleDecrement = (id: number) => {
    decrement(id);
    cart.forEach((item) => {
      if (item.productID === id && item.quantity === 0) {
        removeFromCart(id);
      }
    });
  };

  const handleCheckedAll = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedAll(!checkedAll);
    setNewCart(
      newCart.map((item) =>
        e.target.checked == true
          ? { ...item, checked: true }
          : { ...item, checked: false }
      )
    );
  };

  const handleChecked = (id: number) => {
    setNewCart(
      newCart.map((item) =>
        item.productID === id
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
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
                {newCart.map((item) => (
                  <tr key={item.productID}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() =>
                          handleChecked(item.productID)
                        }
                      />
                    </td>
                    <td className="flex flex-wrap items-center my-6">
                      <Image
                        src={product}
                        alt="Logo"
                        className="w-[100px]"
                      />
                      <span className="ml-4">
                        {item.productName}
                      </span>
                    </td>
                    <td className="my-6">{item.price}</td>
                    <td className="my-6">
                      <button
                        onClick={() =>
                          handleDecrement(item.productID)
                        }
                        className="text-xl border-[1px] px-2 rounded"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        name="quantity"
                        value={item.quantity}
                        className="border-none outline-none px-4 py-2 w-20 text-center"
                      />
                      <button
                        onClick={() =>
                          handleIncrement(item.productID)
                        }
                        className="text-xl border-[1px] px-2 rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="my-6">
                      {item.price * item.quantity}
                    </td>
                    <td className="text-xl text-primary">
                      <button
                        onClick={() =>
                          handleRemove(item.productID)
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
                  {newCart.reduce(
                    (acc, item) =>
                      item.checked
                        ? acc + item.price * item.quantity
                        : acc,
                    0
                  )}
                </p>
              </div>
              <div className="w-1/2 flex justify-between mb-6 lg:w-full md:w-full sm:w-full xs:w-full">
                <p>Total</p>{" "}
                <p>
                  {newCart.reduce(
                    (acc, item) =>
                      item.checked
                        ? acc + item.price * item.quantity
                        : acc,
                    0
                  )}
                </p>
              </div>
              <button className="py-2 px-6 border-[1px] border-black rounded-xl mb-10">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default CartPage;
