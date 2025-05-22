import React from 'react';
import { Product } from '../types/product';
import { numberWithCommas } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const isLowestPrice = product.lprice <= product.myprice;

  return (
    <div 
      className="product-card w-[300px] mx-auto cursor-pointer"
      onClick={onClick}
    >
      <div className="card-header w-[300px]">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-[300px] h-auto object-cover"
        />
      </div>
      <div className="card-body mt-4">
        <div className="title text-[15px] leading-tight tracking-[-0.75px] mb-2.5 truncate">
          {product.title}
        </div>
        <div className="lprice text-[15.8px] leading-tight tracking-[-0.79px] mb-2.5">
          <span className="text-[21.4px] font-semibold tracking-[-0.43px] text-[#E8344E]">
            {numberWithCommas(product.lprice)}
          </span>
          원
        </div>
        {isLowestPrice && (
          <div className="isgood mt-2.5 px-5 py-2.5 text-white rounded-[2.6px] bg-[#ff8787] w-[42px]">
            최저가
          </div>
        )}
      </div>
    </div>
  );
}
