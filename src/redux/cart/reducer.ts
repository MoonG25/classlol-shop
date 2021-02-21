import { Cart } from "../../types";
import { ADD_PRODUCT, CartActionTypes, CHECK_CART_ITEM, DEL_PRODUCT, UNCHECK_CART_ITEM } from "./actions";

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
      const cart = state.cart[product.id];
      const isChecked = (cart?.isChecked === undefined) ? true : cart.isChecked;
      const quantity = cart?.quantity || 0;
      const totalSize = Object.keys(state.cart).length;
      return (totalSize < 3 || (totalSize === 3 && state.cart[product.id])) ? {
        cart: {
          ...state.cart,
          [product.id]: {
            product,
            quantity: quantity + 1,
            isChecked
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
    case CHECK_CART_ITEM: {
      const { payload: { id }} = action;
      const product = state.cart[id].product;
      return {
        cart: {
          ...state.cart,
          [product.id]: {
            ...state.cart[product.id],
            isChecked: true
          }
        },
        totalAmount: state.totalAmount,
      }
    }
    case UNCHECK_CART_ITEM: {
      const { payload: { id }} = action;
      const product = state.cart[id].product;
      return {
        cart: {
          ...state.cart,
          [product.id]: {
            ...state.cart[product.id],
            isChecked: false
          }
        },
        totalAmount: state.totalAmount,
      }
    }
    default:
      return state;
  }
}