import React from 'react';
import { Product } from '../../../types';

type ProductProps = {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({product}) => {
  return (
    <li>
      <img src={product.coverImage} width="75" height="75" alt="product_image" /> :
      <span>{product.title}</span> :
      <span>{product.price}</span> : 
      <span>{product.score}</span>
      <button>add</button>
      <button>del</button>
    </li>
  )
}

export default ProductCard;