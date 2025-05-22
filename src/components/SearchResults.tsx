'use client';

import { SearchItem } from '@/app/types/product';
import Image from 'next/image';

interface Props {
  results: SearchItem[];
  onAddProduct: (product: SearchItem) => Promise<void>;
}

export default function SearchResults({ results, onAddProduct }: Props) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-48">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">
                최저가: {item.lprice.toLocaleString()}원
              </span>
              <button
                onClick={() => onAddProduct(item)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                관심 상품 추가
              </button>
            </div>
            
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              상품 보기
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}