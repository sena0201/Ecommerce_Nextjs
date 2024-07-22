import { useCarts } from "@/hooks/useCart";
import { CartType } from "@/types/cart/cart.type";
import { create } from "zustand";

type Cart = {
  cart: CartType[];
  getCart: (userId: number) => void;
};

export const useCartStore = create<Cart>((set) => ({
  cart: [],
  getCart: (userId: number) => {
    set((state) => ({}));
  },
}));
