import { Cart, Coupon } from "../../types";
import { ADD_PRODUCT, CartActionTypes, CHECK_CART_ITEM, DEL_PRODUCT, UNCHECK_CART_ITEM, UPDATE_COUPON } from "./actions";

export interface CartState {
  cart: Cart;
  coupon?: Coupon;
  totalAmount: number;
}

export const initialCartState: CartState = {
  cart: {},
  totalAmount: 0,
}

/**
 * @todo immer 
 */
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
        coupon: state.coupon,
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
          coupon: state.coupon,
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
        coupon: state.coupon,
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
        coupon: state.coupon,
        totalAmount: state.totalAmount,
      }
    }
    case UPDATE_COUPON: {
      const { payload: { coupon }} = action;
      return {
        ...state,
        coupon,
      }
    }
    default:
      return state;
  }
}