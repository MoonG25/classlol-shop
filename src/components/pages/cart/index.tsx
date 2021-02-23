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

const mapState = (state: RootState) => ({
  cart: state.cart.cart,
  coupon: state.cart.coupon,
  totalAmount: state.cart.totalAmount,
});

const connector = connect(mapState);

type CartPageProps = {
  cart: Cart;
  coupon?: CouponState;
  totalAmount: number;
}

const CartPage: React.FC<CartPageProps> = ({ cart, coupon }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [salesAmount, setSalesAmount] = useState(0);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const calcTotalAmount = async () => {
      const {total, sales} = await Object.values(cart).reduce((data, { isChecked, product, quantity }) => {
        if (isChecked) {
          const currentProductPrice = (product.price * quantity);
          data.total += currentProductPrice;
          data.sales += (product.availableCoupon !== false) ? currentProductPrice : 0;
        }
        return data;
      }, {
        total: 0,
        sales: 0
      });
      setTotalAmount(total);
      setSalesAmount(sales);
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