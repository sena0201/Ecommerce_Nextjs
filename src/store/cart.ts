import { Product } from "@/types/product";
import { create } from "zustand";

export type ProductOfCart = Product & {
  quantity: number;
};

type Cart = {
  cart: ProductOfCart[];
  AddToCart: (product: ProductOfCart) => void;
  RemoveFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const useCartStore = create<Cart>((set) => ({
  cart: [],
  AddToCart: (product: ProductOfCart) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productID === product.productID
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return { cart: [...state.cart] };
      } else {
        return { cart: [...state.cart, product] };
      }
    }),
  RemoveFromCart: (id: number) =>
    set((state) => ({
      cart: state.cart.filter(
        (product) => product.productID !== id
      ),
    })),
  incrementQuantity: (id: number) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.productID === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    })),
  decrementQuantity: (id: number) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.productID === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ),
    })),
  updateQuantity: (id: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.productID === id
          ? { ...product, quantity }
          : product
      ),
    })),
}));
