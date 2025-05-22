// 상품 카드 컴포넌트
'use client';

import { useState } from 'react';
import { Product } from '@/app/types/product';
import Image from 'next/image';

interface Props {
  product: Product;
  onUpdatePrice: (id: number, price: number) => Promise<void>;
}

export default function ProductCard({ product, onUpdatePrice }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [myprice, setMyprice] = useState(product.myprice);

  const handleUpdatePrice = async () => {
    try {
      await onUpdatePrice(product.id, myprice);
      setIsEditing(false);
    } catch (error) {
      console.error('가격 업데이트 실패:', error);
      alert('가격 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">최저가: {product.lprice.toLocaleString()}원</span>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={myprice}
                onChange={(e) => setMyprice(Number(e.target.value))}
                className="w-24 px-2 py-1 border rounded"
              />
              <button
                onClick={handleUpdatePrice}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                저장
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <span className="text-blue-600">
                관심가: {product.myprice ? `${product.myprice.toLocaleString()}원` : '미설정'}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                수정
              </button>
            </div>
          )}
        </div>
        
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          상품 보기
        </a>
      </div>
    </div>
  );
}