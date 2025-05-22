export interface ItemDto {
  // 백엔드의 ItemDto와 동일한 필드들을 정의
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export interface SearchItem {
  title: string;
  link: string;
  image: string;
  lprice: number;
  hprice: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export interface Product extends SearchItem {
  id: number;
  myprice: number;
  createdAt: string;
  updatedAt: string;
} 