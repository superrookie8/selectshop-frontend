import React, { useState } from 'react';

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetPrice: (price: number) => void;
  isLoading?: boolean;
}

export default function PriceModal({ isOpen, onClose, onSetPrice, isLoading = false }: PriceModalProps) {
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseInt(price.replace(/,/g, ''));
    if (isNaN(numericPrice)) {
      alert('올바른 가격을 입력해주세요.');
      return;
    }
    onSetPrice(numericPrice);
    setPrice('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content relative w-[370px] rounded-[11px] bg-white shadow-xl">
        <div className="p-6">
          <button 
            className="absolute top-4 right-4 text-[#adb5bd] hover:text-gray-700 transition-colors text-[19px] border-none bg-transparent"
            onClick={onClose}
            disabled={isLoading}
          >
            ✕
          </button>
          <h1 className="text-[22px] font-medium leading-none tracking-[-1.1px] mb-3">
            ⏰ 최저가 설정하기
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            최저가를 설정해두면 선택하신 상품의 최저가가 떴을 때<br/> 표시해드려요!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="200,000"
                className="flex-1 h-[42px] rounded-[4px] border border-[#dee2e6] px-3 focus:outline-none focus:border-[#15aabf] transition-colors"
                disabled={isLoading}
              />
              <span className="text-gray-600">원</span>
            </div>
            <button 
              type="submit"
              className="w-full h-[42px] rounded-[4px] bg-[#15aabf] text-white font-medium hover:bg-[#0d8a9c] transition-colors disabled:opacity-50 disabled:hover:bg-[#15aabf]"
              disabled={isLoading}
            >
              {isLoading ? '설정 중...' : '설정하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 