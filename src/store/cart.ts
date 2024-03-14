import { create } from "zustand";

export type Product = {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};

type Cart = {
  cart: Product[];
  AddToCart: (product: Product) => void;
  RemoveFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const useCartStore = create<Cart>((set) => ({
  cart: [],
  AddToCart: (product: Product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  RemoveFromCart: (id: number) =>
    set((state) => ({
      cart: state.cart.filter(
        (product) => product.productId !== id
      ),
    })),
  incrementQuantity: (id: number) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.productId === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    })),
  decrementQuantity: (id: number) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.productId === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ),
    })),
  updateQuantity: (id: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.productId === id
          ? { ...product, quantity }
          : product
      ),
    })),
}));
