import { getOrder } from "@/Api/order-api";
import { useQuery } from "@tanstack/react-query";

export const useOrder = (userId?: number) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => getOrder(userId),
    enabled: userId !== undefined,
  });
};
