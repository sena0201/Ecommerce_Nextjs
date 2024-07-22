import { ProductResponse } from "@/types/product/product-response.type";
import AxiosClient from "./axiosConfig";
import { ProductType } from "@/types/product/product.type";

export const getAllProduct = async (
  page?: number,
  searchValue?: string
) => {
  const res = await AxiosClient.get<ProductResponse>(
    `/Product${
      page && searchValue
        ? "?page=" + page + "&searchValue=" + searchValue
        : page && !searchValue && page > 1
        ? "?page=" + page
        : searchValue && !page
        ? "?searchValue=" + searchValue
        : ""
    }`
  );
  return res.data;
};

export const getByID = async (id: number) => {
  const res = await AxiosClient.get<ProductType>(
    `/Product/${id}`
  );
  return res.data;
};
