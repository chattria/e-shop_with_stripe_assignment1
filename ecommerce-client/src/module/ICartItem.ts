import { IProduct } from "../../../ecommerce-api/src/models/IProduct";

export interface CartItem {
  product: IProduct;
  quantity: number;
}
