import { Cart, Coupon } from "../../types";
import { ADD_PRODUCT, CALC_AMOUNT, CartActionTypes, CHECK_CART_ITEM, DEL_PRODUCT, UNCHECK_CART_ITEM, UPDATE_COUPON } from "./actions";

export interface CartState {
  cart: Cart;
  coupon?: Coupon;
  totalAmount: number;
  salesAmount: number;
}

export const initialCartState: CartState = {
  cart: {},
  totalAmount: 0,
  salesAmount: 0,
}

export const calcAmount = async (cart: Cart) => {
  const data = await Object.values(cart).reduce((data, { isChecked, product, quantity }) => {
    if (isChecked) {
      const productPrice = product.price * quantity;
      data.totalAmount += productPrice;
      data.salesAmount += (product.availableCoupon !== false) ? productPrice : 0;
    }
    return data;
  }, {
    totalAmount: 0,
    salesAmount: 0
  });
  return data;
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
        ...state,
        cart: {
          ...state.cart,
          [product.id]: {
            product,
            quantity: quantity + 1,
            isChecked
          }
        },
        coupon: state.coupon,
      } : state;
    }
    case DEL_PRODUCT: {
      const { payload: { id }} = action;
      const cart = JSON.parse(JSON.stringify(state.cart));
      const product = cart[id]?.product;
      const cartSize = Object.keys(cart).length;
      if (product) {
        cart[id].quantity -= 1;
        if (cart[id].quantity === 0) delete cart[id];
        return {
          ...state,
          cart: cart,
          coupon: (cartSize > 1) ? state.coupon : undefined
        }
      }
      return state;
    }
    case CHECK_CART_ITEM: {
      const { payload: { id }} = action;
      const product = state.cart[id].product;
      return {
        ...state,
        cart: {
          ...state.cart,
          [product.id]: {
            ...state.cart[product.id],
            isChecked: true
          }
        },
      }
    }
    case UNCHECK_CART_ITEM: {
      const { payload: { id }} = action;
      const product = state.cart[id].product;
      return {
        ...state,
        cart: {
          ...state.cart,
          [product.id]: {
            ...state.cart[product.id],
            isChecked: false
          }
        },
      }
    }
    case UPDATE_COUPON: {
      const { payload: { coupon }} = action;
      return {
        ...state,
        coupon,
      }
    }
    case CALC_AMOUNT: {
      const { payload } = action;
      return {
        ...state,
        ...payload
      }
    }
    default:
      return state;
  }
}