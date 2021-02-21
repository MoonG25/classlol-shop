import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../redux';
import { Cart, Coupon as CouponState } from '../../../types';
import ItemCard from './item-card';
import styled from 'styled-components';
import CouponBox from './coupon-box';

const ResultBox = styled.div`
  width: 100%;
  text-align: right;
`;

const CouponButton = styled.button`
  border: 1px solid #eee;
  background-color: white;
`;

const mapState = (state: RootState) => ({
  cart: state.cart.cart,
  coupon: state.cart.coupon,
  totalAmount: state.cart.totalAmount,
});

const connector = connect(mapState);

type CartProps = {
  cart: Cart;
  coupon?: CouponState;
  totalAmount: number;
}

/**
 * @todo [x] 체크박스 추가
 * @todo [x] 아이템 수량을 변경
 * @todo [x] 체크박스 유무에 따른 총액 계산
 * @todo [x] 쿠폰 추가
 * @todo [x] 쿠폰 추가에 따른 총액 계산
 * @todo [] 쿠폰 가능한 아이템 분리
 * @todo [] 총액 계산 분리하기
 */
const CartPage: React.FC<CartProps> = ({ cart, coupon }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const calcTotalAmount = async () => {
      const total = await Object.values(cart).reduce((total, { isChecked, product, quantity }) => {
        if (isChecked) total += (product.price * quantity);
        return total;
      }, 0);
      setTotalAmount(total);
    };

    calcTotalAmount();
  }, [cart]);
  const openCouponBox = () => {
    if (Object.values(cart).length) {
      setIsShow(true);
    }
  }
  const closeCouponBox = () => setIsShow(false);
  const getDiscount = () => {
    if (coupon) {
      if (coupon.type === 'rate') {
        return totalAmount * ((coupon.discountRate || 100) / 100);
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
        <h1>총 금액 : {totalAmount.toLocaleString('en-US')} 원</h1>
        <h2>할인 : {getDiscount().toLocaleString('en-US')} 원</h2>
        <h1>최종금액 : {(totalAmount - getDiscount()).toLocaleString('en-US')} 원</h1>
      </ResultBox>
      { isShow && <CouponBox totalAmount={totalAmount} closeCouponBox={closeCouponBox} prevCoupon={coupon} /> }
    </div>
  );
};

export default connector(CartPage);