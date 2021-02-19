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