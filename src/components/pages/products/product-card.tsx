import React from 'react';
import { connect } from 'react-redux';
import { ADD_PRODUCT, DEL_PRODUCT } from '../../../redux/cart/actions';
import { Product } from '../../../types';
import styled from 'styled-components';

const ProductCardWrapper = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  column-gap: 1em;
  border-bottom: 1px solid #eee;

  img {
    width: 336px;
    height: 189px;
  }

  .product-info {
    flex: 2;
    font-size: 18px;
  }

  .product-title {
    margin-bottom: 10px;
    display: block;
  }

  .product-price {
    font-weight: bold;
  }

  .product-actions {
    margin-top: 10px;
    display: flex;

    button {
      cursor: pointer;
      height: 28px;
      border: 1px solid #eee;
      background-color: #fff;
      outline: none;

      :hover {
        background-color: #ccc;
      }

      :active {
        opacity: 0.6;
      }
    }
  }
`;

const mapDispatchToProps = (dispatch: any) => {
  return {
    addProduct: (product: Product) => dispatch({ type: ADD_PRODUCT, payload: { product }}),
    delProduct: (id: Product['id']) => dispatch({ type: DEL_PRODUCT, payload: { id }}),
  };
};

const connector = connect(null, mapDispatchToProps);

type ProductProps = {
  product: Product;
  isAppended: boolean;
  addProduct: Function;
  delProduct: Function;
}

const ProductCard: React.FC<ProductProps> = ({product, isAppended, addProduct, delProduct}) => {
  const handleAdd = () => addProduct(product);
  const handleDel = () => delProduct(product.id);
  return (
    <ProductCardWrapper>
      <img src={product.coverImage} alt="product_image" />
      <div className="product-info">
        <h4 className="product-title">{product.title}</h4>
        <span className="product-price">{product.price.toLocaleString('en-US')} 원</span>
        <div className="product-actions">
          <button onClick={handleAdd} disabled={isAppended}>담기</button>
          { isAppended && <button onClick={handleDel}>빼기</button> }
        </div>
      </div>
    </ProductCardWrapper>
  )
}

export default connector(ProductCard);