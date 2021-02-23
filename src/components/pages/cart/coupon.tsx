import React from 'react';
import styled from 'styled-components';
import { Coupon as CouponState } from '../../../types';

const CouponWrapper = styled.div`    
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  width: 100%;
  padding: 5px;
`;

type CouponProps = {
  index: number;
  coupon: CouponState;
  selectCoupon: Function;
  checked: boolean;
}

const Coupon: React.FC<CouponProps> = ({ index, coupon, selectCoupon, checked }) => {
  const couponId: string = `coupon-${index}`;
  const handleClickCoupon = () => selectCoupon(coupon);
  return (
    <CouponWrapper>
      <input 
        type="radio" 
        id={couponId} 
        name="coupon" 
        value={index}
        checked={checked}
        onChange={handleClickCoupon} 
      />
      <label htmlFor={couponId}>{coupon.title}</label>
    </CouponWrapper>
  )
};

export default Coupon;