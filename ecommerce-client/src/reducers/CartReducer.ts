import { CartItem } from "../module/ICartItem";

export interface ICartAction {
  type: CartACtionType;
  payload: CartItem | any;
}

export enum CartACtionType {
  ADD_ITEM,
  REMOVE_ITEM,
  CHANGE_QUANTITY,
  RESET_CART,
}

export const CartReducer = (cart: CartItem[], action: ICartAction) => {
  const { payload, type } = action;

  switch (type) {
    case CartACtionType.ADD_ITEM: {
      const itemExists = cart.find(
        (item) => item.product.id === payload.product.id
      );

      if (!itemExists) return [...cart, payload];

      return cart.map((item) =>
        item.product.id === payload.product.id
          ? { ...item, quantity: item.quantity + payload.quantity }
          : item
      );
    }

    case CartACtionType.REMOVE_ITEM: {
      return cart.filter((item) => item.product.id !== payload.product.id);
    }
    case CartACtionType.CHANGE_QUANTITY: {
      return cart.map((item) => {
        if (item.product.id === payload.product.id) {
          const totalQuantity = item.quantity + payload.quantity;
          return { ...item, quantity: totalQuantity > 0 ? totalQuantity : 1 };
        }

        return item;
      });
    }
    case CartACtionType.RESET_CART:
      return [];

    default:
      return cart;
  }
};
