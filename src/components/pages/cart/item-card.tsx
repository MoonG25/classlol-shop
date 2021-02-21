import React from 'react';
import { connect } from 'react-redux';
import { ADD_PRODUCT, CHECK_CART_ITEM, DEL_PRODUCT, UNCHECK_CART_ITEM } from '../../../redux/cart/actions';
import { CartItem, Product } from '../../../types';
import styled from 'styled-components';

const ItemCardWrapper = styled.div`
  width: 100%;
  height: 149px;
  padding: 12px;
  display: flex;
  column-gap: 1em;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;

  input[type="checkbox"] {
    width: 22px;
    height: 22px;
  }

  img {
    width: 125px;
    height: 125px;
  }

  .cart__item-info {
    flex: 2;
    font-size: 18px;
  }

  .cart__item-title {
    margin-bottom: 10px;
    display: block;
  }

  .cart__item-actions {
    margin-top: 10px;
    display: flex;
  }

  .cart__item-actions input {
    border: 1px solid #eee;
    font-size: 16px;
    padding: 4px;
    text-align: center;
    width: 3em;
    outline: none;
    cursor: default;
  }

  .cart__item-actions button {
    cursor: pointer;
  }

  .cart__item-button {
    width: 28px;
    height: 28px;
    border: 1px solid #eee;
    background-color: white;
    outline: none;
  }

  .cart__item-coupon {
    height: 28px;
    border: 1px solid #eee;
    background-color: white;
    outline: none;
  }
`;

const mapDispatchToProps = (dispatch: any) => {
  return {
    addProduct: (product: Product) => dispatch({ type: ADD_PRODUCT, payload: { product }}),
    delProduct: (id: Product['id']) => dispatch({ type: DEL_PRODUCT, payload: { id }}),
    checkCartItem: (id: Product['id']) => dispatch({ type: CHECK_CART_ITEM, payload: { id }}),
    unCheckCartItem: (id: Product['id']) => dispatch({ type: UNCHECK_CART_ITEM, payload: { id }}),
  };
};

const connector = connect(null, mapDispatchToProps);

type ItemProps = {
  item: CartItem;
  addProduct: Function;
  delProduct: Function;
  checkCartItem: Function;
  unCheckCartItem: Function;
}

const ItemCard: React.FC<ItemProps> = ({
  item: { product, quantity, isChecked }, 
  addProduct, 
  delProduct, 
  checkCartItem, 
  unCheckCartItem 
}) => {
  const handleAdd = () => addProduct(product);
  const handleDel = () => delProduct(product.id);
  const handleItemCheck = () => {
    if (isChecked) unCheckCartItem(product.id);
    else checkCartItem(product.id);
  };
  return (
    <ItemCardWrapper>
      <input type="checkbox" checked={isChecked} onChange={handleItemCheck}></input>
      <img src={product.coverImage} alt="product_image" />
      <div className="cart__item-info">
        <h2 className="cart__item-title">{product.title}</h2>
        <span className="cart__item-price">{product.price.toLocaleString('en-US')}</span> 원
        <div className="cart__item-actions">
          <button className="cart__item-button" onClick={handleDel}>-</button>
          <input type="text" pattern="[0-9]*" readOnly value={quantity} />
          <button className="cart__item-button" onClick={handleAdd}>+</button>
          <button className="cart__item-coupon">coupon</button>
        </div>
      </div>
    </ItemCardWrapper>
  )
}

export default connector(ItemCard);