"use client";

import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import img from "../../assets/images/Rectangle_1.png";
import logo from "../../assets/images/logo.png";
import { MdOutlineNavigateNext } from "react-icons/md";
import product from "../../assets/images/image-3.png";
import { MdDelete } from "react-icons/md";
import { useCartStore } from "@/store/cart";

function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore(
    (state) => state.RemoveFromCart
  );

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
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F9F1E7]">
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
                {cart.map((item) => (
                  <tr key={item.productId}>
                    <td className="flex justify-evenly items-center my-6">
                      <Image
                        src={product}
                        alt="Logo"
                        className="w-[100px]"
                      />
                      <span>{item.productName}</span>
                    </td>
                    <td className="my-6">{item.price}</td>
                    <td className="my-6">
                      {item.quantity}
                    </td>
                    <td className="my-6">
                      {item.price * item.quantity}
                    </td>
                    <td className="text-xl text-primary">
                      <button
                        onClick={() =>
                          handleRemove(item.productId)
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
          <div className="ml-12">
            <div className="bg-[#F9F1E7] flex flex-col items-center py-4 px-8">
              <h1 className="text-3xl mb-8">Cart Totals</h1>
              <div className="w-1/2 flex justify-between mb-4">
                <p>Subtotal</p>{" "}
                <p>
                  {cart.reduce(
                    (acc, item) =>
                      acc + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
              <div className="w-1/2 flex justify-between mb-6">
                <p>Total</p>{" "}
                <p>
                  {cart.reduce(
                    (acc, item) =>
                      acc + item.price * item.quantity,
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
