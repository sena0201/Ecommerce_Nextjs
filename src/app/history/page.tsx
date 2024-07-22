"use client";
import Wrapper from "@/components/Wrapper";
import { useOrder } from "@/hooks/useOrder";
import { UserStore } from "@/store/user";
import { OrderDetailtype } from "@/types/orderDetails/OrderDetail.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HistoryPage() {
  const router = useRouter();
  const User = UserStore((state) => state.user);
  const { data: order } = useOrder(User?.userId);
  function calculateTotalPrice(
    orderDetails?: OrderDetailtype[]
  ) {
    let totalPrice = 0;

    orderDetails?.forEach((orderDetail) => {
      const quantity = orderDetail.quantity;
      const price = orderDetail.product.price;
      totalPrice += quantity * price;
    });

    return totalPrice;
  }
  useEffect(() => {
    if (!User) {
      router.push("/account");
    }
  }, [User, router]);
  return (
    <div className="my-10">
      <Wrapper>
        <h1 className="text-4xl">Order history</h1>
        <div>
          {order?.map((order) => (
            <div
              key={order.orderId}
              className="border-2 p-4 rounded-md mt-4"
            >
              <div className="flex justify-between">
                <p className="text-2xl">#{order.orderId}</p>
                {order.statusId === 1 && (
                  <p className="text-2xl text-yellow-500">
                    Pending
                  </p>
                )}
                {order.statusId === 2 && (
                  <p className="text-2xl text-green">
                    Success
                  </p>
                )}
                {order.statusId === 0 && (
                  <p className="text-2xl text-red">
                    Reject
                  </p>
                )}
                {order.statusId === -1 && (
                  <p className="text-2xl text-gray">
                    Cancel
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <p>Order Time:</p>
                <p>{order.orderTime}</p>
              </div>
              <div>
                <p className="text-xl">Details</p>
                <div className="ml-10">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-start pb-2">
                          Name
                        </th>
                        <th className=" pb-2">Price</th>
                        <th className=" pb-2">Quantity</th>
                        <th className="text-end pb-2">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderDetails?.map(
                        (orderDetail) => (
                          <tr
                            key={orderDetail.orderDetailId}
                            className=""
                          >
                            <td className="w-[500px]">
                              {
                                orderDetail.product
                                  .productName
                              }
                            </td>
                            <td className="w-[400px] text-center">
                              {orderDetail.product.price.toLocaleString(
                                "vi-VN"
                              )}
                            </td>
                            <td className="text-center">
                              {orderDetail.quantity}
                            </td>
                            <td className="text-end">
                              {(
                                orderDetail.quantity *
                                orderDetail.product.price
                              ).toLocaleString("vi-VN")}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end border-t-2 mt-4 pt-2 border-opacity-50">
                {calculateTotalPrice(
                  order.orderDetails
                ).toLocaleString("vi-VN")}
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}

export default HistoryPage;
