import { CartType } from "@/types/cart/cart.type";
import AxiosClient from "./axiosConfig";

export const getCarts = async (userId?: number) => {
  const res = await AxiosClient.get<CartType[]>(
    `/Cart/${userId}`
  );
  return res.data;
};

export const addItem = async (
  data: Omit<CartType, "cartId" | "product">
) => {
  const res = await AxiosClient.post(`/Cart`, data);
  return res.data;
};

export const removeItem = async (cartId: number) => {
  const res = await AxiosClient.delete(`/Cart/${cartId}`);
  return res.data;
};

export const updateItem = async (
  cartId: number,
  quantity: number
) => {
  const res = await AxiosClient.put(`/Cart/${cartId}`, {
    quantity,
  });
  return res.data;
};
