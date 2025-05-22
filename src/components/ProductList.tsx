// 관심 상품 목록 컴포넌트
'use client';

import { Product } from '@/app/types/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  onUpdatePrice: (id: number, price: number) => Promise<void>;
}

export default function ProductList({ products, onUpdatePrice }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        관심 상품이 없습니다. 검색을 통해 상품을 추가해보세요!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </div>
  );
}