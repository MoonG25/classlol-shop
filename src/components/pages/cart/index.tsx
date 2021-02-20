import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../redux';
import { Cart, CartItem } from '../../../types';
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

const CartPage: React.FC<CartProps> = ({cart, totalAmount}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const createItems = async () => {
      const cartItems = await Object.values(cart);
      setItems(cartItems);
    };
    createItems();
  }, [totalAmount]);
  return (
    <ul>
      {
        items.map((item) => <ItemCard key={item.product.id} item={item} />)
      }
      <br/>
      <h1>total : {totalAmount}</h1>
    </ul>
  );
};

export default connector(CartPage);