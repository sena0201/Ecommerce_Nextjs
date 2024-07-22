import { ProductType } from "./../product/product.type";
export type CartType = {
  cartId: number;
  userId: number;
  productId: number;
  quantity: number;
  product: ProductType;
};
