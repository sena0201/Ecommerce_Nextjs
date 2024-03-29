import { products } from "@/data/data";
import { Product } from "@/types/product";
import { create } from "zustand";

type Shop = {
  products: Product[];
  display: string;
  getAll: () => void;
  toList: (type: string) => void;
  toMenu: (type: string) => void;
};

export const useShopStore = create<Shop>((set) => ({
  products: [...products],
  display: "menu",
  getAll: () =>
    set((state) => ({
      products: [],
    })),
  toList: (type: string) =>
    set((state) => ({ display: type })),
  toMenu: (type: string) =>
    set((state) => ({ display: type })),
}));
