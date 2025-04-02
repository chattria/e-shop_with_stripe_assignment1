import { useContext } from "react";
import CartContext from "../context/CartContext";
import { CartItem } from "../module/ICartItem";
import { IProduct } from "../../../ecommerce-api/src/models/IProduct";
import { CartACtionType } from "../reducers/CartReducer";

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }

  const { cart, dispatch } = context;

  const totalCartPrice = cart.reduce(
    (total, item: CartItem) => total + item.quantity * item.product.price,
    0
  );

  const handleAddToCart = (product: IProduct, quantity: number) => {
    const item = { product, quantity };
    dispatch({
      type: CartACtionType.ADD_ITEM,
      payload: item,
    });
    console.log("Added to cart", item);
  };

  const handleChangeQuantity = (product: IProduct, quantity: number) => {
    const item = { product, quantity };
    dispatch({
      type: CartACtionType.CHANGE_QUANTITY,
      payload: item,
    });
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch({
      type: CartACtionType.REMOVE_ITEM,
      payload: cartItem,
    });
  };

  const handleResetCart = () => {
    dispatch({
      type: CartACtionType.RESET_CART,
      payload: null,
    });
  };

  return {
    cart,
    totalCartPrice,
    handleAddToCart,
    handleChangeQuantity,
    handleRemoveFromCart,
    handleResetCart,
  };
};
