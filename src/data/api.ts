import { Product } from '../types';
import productItems from './productItems';

const sortByScore = (p1: Product, p2: Product) => p1.score > p2.score ? -1 : 1;

export const getProductItems = async (page: number, perPage = 5) => {
  const total = productItems.length;
  const pages = Math.ceil(total / perPage);
  const lastIndex = (perPage * page);
  const firstIndex = (page - 1) * perPage;
  const items = await productItems
    .sort(sortByScore)
    .slice(firstIndex, lastIndex);
  return {
    productItems: items,
    total,
    pages,
  }
}