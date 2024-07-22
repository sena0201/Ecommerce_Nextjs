import { CartType } from "@/types/cart/cart.type";
import AxiosClient from "./axiosConfig";
import { removeItem } from "./cart-api";

export type OrderDetail = {
  List?: (CartType & { checked: boolean })[];
  orderId: number;
};

export const createOrderDetail = async (
  data: OrderDetail
) => {
  data.List?.forEach(async (item) => {
    await AxiosClient.post("/OrderDetail", {
      orderId: data.orderId,
      productId: item.productId,
      quantity: item.quantity,
    });
  });
};
