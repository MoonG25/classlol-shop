import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { ADD_PRODUCT, CartActionTypes, CHECK_CART_ITEM, DEL_PRODUCT, UNCHECK_CART_ITEM } from '../../../redux/cart/actions';
import { CartItem, Product } from '../../../types';
import styled from 'styled-components';

const ItemCardWrapper = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  column-gap: 1em;
  border-bottom: 1px solid #eee;

  input[type="checkbox"] {
    width: 22px;
    height: 22px;
  }

  img {
    width: 336px;
    height: 189px;
  }

  .cart__item-info {
    flex: 2;
    font-size: 18px;
  }

  .cart__item-title {
    margin-bottom: 10px;
    display: block;
  }

  .cart__item-price {
    font-weight: bold;
  }

  .cart__item-actions {
    margin: 10px 0;
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
    background-color: #fff;
    outline: none;
  }

  .warning-coupon {
    color: red;
  }
`;

const mapDispatchToProps = (dispatch: Dispatch<CartActionTypes>) => {
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
        <h4 className="cart__item-title">{product.title}</h4>
        <span className="cart__item-price">{product.price.toLocaleString('en-US')} 원</span>
        <div className="cart__item-actions">
          <button className="cart__item-button" onClick={handleDel}>-</button>
          <input type="text" pattern="[0-9]*" readOnly value={quantity} />
          <button className="cart__item-button" onClick={handleAdd}>+</button>
        </div>
        { (product.availableCoupon === false) && <span className="warning-coupon">쿠폰불가</span> }
      </div>
    </ItemCardWrapper>
  )
}

export default connector(ItemCard);