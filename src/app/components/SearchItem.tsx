import React from 'react';
import Image from 'next/image';
import { SearchItem as SearchItemType } from '../types/product';

interface SearchItemProps {
  item: SearchItemType;
  onAddProduct: (item: SearchItemType) => void;
}

export default function SearchItem({ item, onAddProduct }: SearchItemProps) {
  return (
    <div className="search-itemDto w-[530px] flex flex-row items-center justify-around">
      <div className="search-itemDto-left">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-[159px] h-[159px] object-cover"
        />
      </div>
      <div className="search-itemDto-center flex flex-col items-center justify-evenly">
        <div className="w-[280px] h-[23px] text-lg font-normal leading-[1.3] tracking-[-0.9px] truncate">
          {item.title}
        </div>
        <div className="price h-[27px] text-[27px] font-semibold leading-none tracking-[-0.54px] text-[#E8344E]">
          {item.lprice.toLocaleString()}
          <span className="unit w-[17px] h-[18px] text-lg font-medium leading-none tracking-[-0.9px] text-center">
            원
          </span>
        </div>
      </div>
      <div className="search-itemDto-right inline-block h-full align-middle">
        <Image 
          src="https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/spring/week04/icon-save.png"
          alt="저장"
          width={25}
          height={25}
          className="align-middle mt-[60px] cursor-pointer"
          onClick={() => onAddProduct(item)}
        />
      </div>
    </div>
  );
} 