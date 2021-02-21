import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../redux';
import { Cart } from '../../../types';
import ItemCard from './item-card';

const mapState = (state: RootState) => ({
  cart: state.cart.cart,
  totalAmount: state.cart.totalAmount,
});

const connector = connect(mapState);

type CartProps = {
  cart: Cart;
  totalAmount: number;
}

/**
 * @todo [x] 체크박스 추가
 * @todo [x] 아이템 수량을 변경
 * @todo [x] 체크박스 유무에 따른 총액 계산
 * @todo [] 쿠폰 추가
 * @todo [] 쿠폰 추가에 따른 총액 계산
 * @todo [] 총액 계산 분리하기
 */
const CartPage: React.FC<CartProps> = ({cart}) => {
  const [totalAmount, setTotalAmount] = useState(0);
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
  return (
    <div>
      <h1>Cart</h1>
      {
        Object.values(cart).map(item => <ItemCard key={item.product.id} item={item} />)
      }
      <br/>
      <h1>총 금액 : ₩{totalAmount.toLocaleString('en-US')} 원</h1>
    </div>
  );
};

export default connector(CartPage);