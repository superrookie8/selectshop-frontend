// 검색바 컴포넌트
'use client';

import { useState } from 'react';
import { SearchItem } from '@/app/types/product';

interface Props {
  onSearch: (results: SearchItem[]) => void;
  onSearching: (isSearching: boolean) => void;
}

async function searchProducts(query: string): Promise<SearchItem[]> {
  const response = await fetch(`/api/products?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('검색 실패');
  return response.json();
}

export default function SearchBar({ onSearch, onSearching }: Props) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    onSearching(true);
    try {
      const results = await searchProducts(query);
      onSearch(results);
    } catch (error) {
      console.error('검색 실패:', error);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="flex-1 px-4 py-2 border rounded-lg [&::placeholder]:text-gray-500 [&:not(:placeholder-shown)]:text-black"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          검색
        </button>
      </div>
    </form>
  );
}
