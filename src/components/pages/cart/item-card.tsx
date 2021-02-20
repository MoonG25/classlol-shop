import React from 'react';
import { connect } from 'react-redux';
import { ADD_PRODUCT, DEL_PRODUCT } from '../../../redux/cart/actions';
import { CartItem, Product } from '../../../types';

const mapDispatchToProps = (dispatch: any) => {
  return {
    addProduct: (product: Product) => dispatch({ type: ADD_PRODUCT, payload: { product }}),
    delProduct: (id: Product['id']) => dispatch({ type: DEL_PRODUCT, payload: { id }}),
  };
};

const connector = connect(null, mapDispatchToProps);

type ItemProps = {
  item: CartItem;
  addProduct: Function;
  delProduct: Function;
}

const ItemCard: React.FC<ItemProps> = ({item: { product, quantity }, addProduct, delProduct}) => {
  const handleAdd = () => addProduct(product);
  const handleDel = () => delProduct(product.id);
  return (
    <li>
      <img src={product.coverImage} width="75" height="75" alt="product_image" /> :
      <span>{product.title}</span> :
      <span>{product.price}</span> : 
      <span>{product.score}</span>
      <button onClick={handleAdd}>add</button>
      <button onClick={handleDel}>del</button>
      <h1>수량 : {quantity}</h1>
    </li>
  )
}

export default connector(ItemCard);