export type CouponType = 'rate' | 'amount';

export interface Coupon {
  type: CouponType;
  title: string;
  discountRate?: number;
  discountAmount?: number;
}

export interface Product {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isChecked?: boolean;
}

export type Cart = { [key: string]: CartItem };

export interface ReturnState {
  productItems: Product[];
  total: number;
  pages: number;
}