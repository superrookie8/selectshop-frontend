// 메인 페이지
'use client';

import React, { useState, useEffect, KeyboardEvent, useCallback } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductCard from './components/ProductCard';
import SearchItem from './components/SearchItem';
import PriceModal from './components/PriceModal';
import { Product, SearchItem as SearchItemType } from './types/product';
import { numberWithCommas } from './utils/format';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'see' | 'search'>('see');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<SearchItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SearchItemType | null>(null);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 상품 목록을 가져오는 함수를 useCallback으로 메모이제이션
  const showProducts = useCallback(async () => {
    if (isLoading) return;
    
    try {
      console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_API_URL); // 디버깅용
      if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
        throw new Error('백엔드 API URL이 설정되지 않았습니다.');
      }

      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/products`);
      if (!response.ok) throw new Error('상품 목록 조회 실패');
      
      const data = await response.json();
      setProducts(data);
      setSearchResults([]);
    } catch (error) {
      console.error('상품 목록 조회 실패:', error);
      alert('상품 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 상품 목록 로드 (컴포넌트 마운트 시 한 번만 실행)
  useEffect(() => {
    showProducts();
  }, []);

  // 엔터키 이벤트 처리
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const query = searchQuery.trim();
    
    if (!query) {
      alert('검색어를 입력해주세요');
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      searchInput?.focus();
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('검색 실패');
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('검색 실패:', error);
      alert('검색에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (itemDto: SearchItemType) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemDto),
      });

      if (!response.ok) throw new Error('상품 등록 실패');

      const data = await response.json();
      setSelectedProduct(itemDto);
      setTargetId(data.id);
      setIsModalOpen(true);
    } catch (error) {
      console.error('상품 등록 실패:', error);
      alert('상품 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPrice = async (price: number) => {
    if (!selectedProduct || !targetId || isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/products/${targetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ myprice: price }),
      });

      if (!response.ok) throw new Error('가격 설정 실패');

      setIsModalOpen(false);
      setSelectedProduct(null);
      setTargetId(null);
      
      alert('최저가가 설정되었습니다.');
      await showProducts();
    } catch (error) {
      console.error('가격 설정 실패:', error);
      alert('가격 설정에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 탭 변경 시 검색 결과 초기화
  const handleTabChange = (tab: 'see' | 'search') => {
    setActiveTab(tab);
    if (tab === 'see') {
      setSearchResults([]);
      setSearchQuery('');
    }
  };

  return (
    <main>
      <Header />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === 'see' ? (
        <div id="see-area" className="w-[530px] mx-auto">
          <div id="product-container" className="grid grid-cols-1 gap-4">
            {isLoading ? (
              <div className="text-center py-4">로딩 중...</div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => window.open(product.link, '_blank')}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div id="search-area" className="w-[530px] mx-auto">
          <form onSubmit={handleSearch} className="mt-4 relative">
            <input
              type="text"
              id="query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="검색어를 입력하세요"
              className="w-[526px] p-4 rounded-[2px] bg-[#e9ecef] border-none pr-12 [&::placeholder]:text-gray-500 [&:not(:placeholder-shown)]:text-black"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Image
                src="https://s3.ap-northeast-2.amazonaws.com/materials.spartacodingclub.kr/spring/week04/icon-search.png"
                alt="검색"
                width={20}
                height={20}
                className="opacity-50"
              />
            </div>
          </form>
          <div id="search-result-box" className="mt-4">
            {isLoading ? (
              <div className="text-center py-4">검색 중...</div>
            ) : (
              searchResults.map((item, index) => (
                <SearchItem
                  key={`${item.productId}-${item.mallName}-${index}`}
                  item={item}
                  onAddProduct={handleAddProduct}
                />
              ))
            )}
          </div>
        </div>
      )}

      <PriceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
          setTargetId(null);
        }}
        onSetPrice={handleSetPrice}
        isLoading={isLoading}
      />
    </main>
  );
}