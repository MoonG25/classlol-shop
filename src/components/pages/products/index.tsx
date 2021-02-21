import React, { useState, useEffect } from 'react';
import ProductCard from './product-card';
import productItems from '../../../data/productItems';
import { Product } from '../../../types';

/**
 * @todo pagination
 */
const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const sortProducts = async () => {
      const sortedProducts: Product[] = await productItems.sort((p1, p2) => p1.score > p2.score ? -1 : 1);
      setProducts(sortedProducts);
    };
    sortProducts();
  }, [])
  return (
    <ul>
      { 
        products.map((product: Product) => 
          <ProductCard 
            key={product.id} 
            product={product} 
          />)
      }
    </ul>
  );
};

export default ProductPage;