import React from 'react';

interface NavigationProps {
  activeTab: 'see' | 'search';
  onTabChange: (tab: 'see' | 'search') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="w-[530px] mx-auto my-8 flex items-center justify-around">
      <div
        className={`cursor-pointer ${activeTab === 'see' ? 'font-bold' : ''}`}
        onClick={() => onTabChange('see')}
      >
        모아보기
      </div>
      <div
        className={`cursor-pointer ${activeTab === 'search' ? 'font-bold' : ''}`}
        onClick={() => onTabChange('search')}
      >
        탐색하기
      </div>
    </nav>
  );
} 