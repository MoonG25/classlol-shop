import { Product } from "../../types";

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';

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

export type CartActionTypes = AddProductAction | DelProductAction