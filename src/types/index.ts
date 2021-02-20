export const LOCAL_STORAGE_KEY = 'LOCAL_STORAGE_KEY';
export type CouponType = 'rate' | 'amount';

export default interface Coupon {
  type: CouponType;
  title: string;
  discountRate: number;
}

export interface Product {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}

// export type Cart = { [key: string]: number };

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Cart = { [key: string]: CartItem };