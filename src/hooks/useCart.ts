import { addItem, getCarts } from "@/Api/cart-api";
import { CartType } from "@/types/cart/cart.type";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export const useCarts = (userId?: number) => {
  return useQuery({
    queryKey: ["carts", userId],
    queryFn: () => getCarts(userId),
    enabled: userId !== undefined,
  });
};
