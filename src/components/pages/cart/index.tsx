import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../redux';
import { Cart, Coupon as CouponState } from '../../../types';
import ItemCard from './item-card';
import styled from 'styled-components';
import CouponBox from './coupon-box';

const ResultBox = styled.div`
  width: 100%;
  text-align: right;

  h4 {
    margin: 11px 0;
  }
`;

const CouponButton = styled.button`
  border: 1px solid #eee;
  background-color: #fff;
  padding: 10px 30px;
  cursor: pointer;
  outline: none;
  :hover {
    background-color: #ccc;
  }
`;

const mapStateToProps = (state: RootState) => ({
  ...state.cart,
});

const connector = connect(mapStateToProps);

type CartPageProps = {
  cart: Cart;
  coupon?: CouponState;
  salesAmount: number;
  totalAmount: number;
}

const CartPage: React.FC<CartPageProps> = ({ cart, coupon, salesAmount, totalAmount }) => {
  const [isShow, setIsShow] = useState(false);
  const openCouponBox = () => {
    if (Object.values(cart).length) {
      setIsShow(true);
    }
  }
  const closeCouponBox = () => setIsShow(false);
  const getDiscount = () => {
    if (coupon) {
      if (coupon.type === 'rate') {
        return salesAmount * ((coupon.discountRate || 100) / 100);
      } else {
        return coupon.discountAmount || 0;
      }
    }
    return 0;
  }
  return (
    <div>
      <h1>Cart</h1>
      {
        Object.values(cart).map(item => <ItemCard key={item.product.id} item={item} />)
      }
      <ResultBox>
        <CouponButton onClick={openCouponBox}>쿠폰추가</CouponButton>
        <h4>총 금액 : {totalAmount.toLocaleString('en-US')} 원</h4>
        <h4>할인 : {getDiscount().toLocaleString('en-US')} 원</h4>
        <h4>최종금액 : {(totalAmount - getDiscount()).toLocaleString('en-US')} 원</h4>
      </ResultBox>
      { isShow && <CouponBox totalAmount={totalAmount} salesAmount={salesAmount} closeCouponBox={closeCouponBox} prevCoupon={coupon} /> }
    </div>
  );
};

export default connector(CartPage);