import { getAllProduct, getByID } from "@/Api/product-api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProduct = (
  page?: number,
  searchValue?: string
) => {
  return useQuery({
    queryKey: ["products", page ? page : 1, searchValue],
    queryFn: () => getAllProduct(page, searchValue),
  });
};

export const useGetByID = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getByID(id),
  });
};
