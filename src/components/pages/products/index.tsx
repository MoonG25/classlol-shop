import React, { useState, useEffect } from 'react';
import ProductCard from './product-card';
import { Cart, Product, ReturnState } from '../../../types';
import { getProductItems } from '../../../data/api';
import styled from 'styled-components';
import { RootState } from '../../../redux';
import { connect } from 'react-redux';

const PageWrapper = styled.div`
  width: 100%;
  margin-bottom: 35px;

  .page-buttons {
    text-align: right;
  }
`;

const PageButton = styled.button<{ isActive: boolean }>`
  width: 28px;
  height: 28px;
  border: 1px solid #eee;
  outline: none;
  
  ${p => p.isActive 
    ? `
      background-color: #000;
      color: #fff;
      ` 
    : `
      background-color: #fff;
      cursor: pointer;
      `
  }
`;

const mapState = (state: RootState) => ({
  cart: state.cart.cart,
});

const connector = connect(mapState);

type ProductPageProps = {
  cart: Cart;
}

const ProductPage: React.FC<ProductPageProps> = ({ cart }) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data: ReturnState = await getProductItems(page);
      setPages(data.pages);
      setTotal(data.total);
      setProducts(data.productItems);
    };
    getProducts();
  }, [page])

  const handlePage = (p: number) => setPage(p);

  const getPageButton = () => {
    const buttons = [];
    for (let i = 1; i <= pages; i++) {
      buttons.push(<PageButton key={i} isActive={page === i} onClick={() => handlePage(i)}>{i}</PageButton>)
    }
    return buttons;
  }

  const isAppended = (id: Product['id']) => cart[id] ? true : false;

  return (
    <PageWrapper>
      <h1>Product</h1>
      { 
        products.map((product: Product) => 
          <ProductCard 
            key={product.id} 
            product={product}
            isAppended={isAppended(product.id)}
          />)
      }
      <div className="page-buttons">
        {
          getPageButton()
        }
      </div>
    </PageWrapper>
  );
};

export default connector(ProductPage);