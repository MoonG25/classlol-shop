import { Coupon, Product } from "../../types";

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';
export const CHECK_CART_ITEM = 'CHECK_CART_ITEM';
export const UNCHECK_CART_ITEM = 'UNCHECK_CART_ITEM';
export const UPDATE_COUPON = 'UPDATE_COUPON';
export const CALC_AMOUNT = 'CALC_AMOUNT';

interface AddProductAction {
  type: typeof ADD_PRODUCT,
  payload: {
    product: Product;
  }
}

interface DelProductAction {
  type: typeof DEL_PRODUCT,
  payload: {
    id: Product['id']
  }
}

interface CheckCartItemAction {
  type: typeof CHECK_CART_ITEM,
  payload: {
    id: Product['id']
  }
}

interface UnCheckCartItemAction {
  type: typeof UNCHECK_CART_ITEM,
  payload: {
    id: Product['id']
  }
}

interface UpdateCouponAction {
  type: typeof UPDATE_COUPON,
  payload: {
    coupon: Coupon
  }
}

interface CalcAmountAction {
  type: typeof CALC_AMOUNT,
  payload: {
    totalAmount: number,
    salesAmount: number
  }
}

export type CartActionTypes = AddProductAction 
  | DelProductAction
  | CheckCartItemAction
  | UnCheckCartItemAction
  | UpdateCouponAction
  | CalcAmountAction;