import { Cart } from "../../types";
import { ADD_PRODUCT, CartActionTypes, DEL_PRODUCT } from "./actions";

export interface CartState {
  cart: Cart;
  totalAmount: number;
}

export const initialCartState: CartState = {
  cart: {},
  totalAmount: 0,
}

export function cartReducer (
  state = initialCartState,
  action: CartActionTypes
): CartState {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { payload: { product }} = action;
      const quantity = state.cart[product.id]?.quantity || 0;
      const totalSize = Object.keys(state.cart).length;
      return (totalSize < 3 || (totalSize === 3 && state.cart[product.id])) ? {
        cart: {
          ...state.cart,
          [product.id]: {
            product,
            quantity: quantity + 1
          }
        },
        totalAmount: state.totalAmount + product.price
      } : state;
    }
    case DEL_PRODUCT: {
      const { payload: { id }} = action;
      const cart = JSON.parse(JSON.stringify(state.cart));
      const product = cart[id]?.product;
      if (product) {
        cart[id].quantity -= 1;
        if (cart[id].quantity === 0) delete cart[id];
        return {
          cart: cart,
          totalAmount: state.totalAmount - product.price
        }
      }
      return state;
    }
    default:
      return state;
  }
}