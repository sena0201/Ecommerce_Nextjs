import { OrderType } from "@/types/order/order.type";
import AxiosClient from "./axiosConfig";

type Response = {
  orderId: number;
  userId: number;
  orderTime: string;
  statusId: number;
};

export const createOrder = async (userId: number) => {
  const res = await AxiosClient.post<Response>("/Order", {
    userId,
  });
  return res.data;
};

export const getOrder = async (userId?: number) => {
  const res = await AxiosClient.get<OrderType[]>(
    `/Order/User/${userId}`
  );
  return res.data;
};
