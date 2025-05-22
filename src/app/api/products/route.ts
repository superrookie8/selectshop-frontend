import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Product, SearchItem } from "@/app/types/product";

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// 백엔드 API URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// API 라우트 핸들러들
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 검색 및 상품 목록 API 엔드포인트
export async function GET(request: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      throw new Error('백엔드 API URL이 설정되지 않았습니다.');
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    // 검색 요청인 경우
    if (query) {
      const response = await fetch(`${BACKEND_API_URL}/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('검색 실패');
      return NextResponse.json(await response.json(), { headers: corsHeaders });
    }

    // 상품 목록 조회인 경우
    const response = await fetch(`${BACKEND_API_URL}/api/products`);
    if (!response.ok) throw new Error('상품 목록 조회 실패');
    return NextResponse.json(await response.json(), { headers: corsHeaders });
  } catch (error) {
    console.error('API 호출 실패:', error);
    return NextResponse.json(
      { error: 'API 호출 실패' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      throw new Error('백엔드 API URL이 설정되지 않았습니다.');
    }

    const productData = await request.json();
    const response = await fetch(`${BACKEND_API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error('상품 등록 실패');
    return NextResponse.json(await response.json(), { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('상품 등록 실패:', error);
    return NextResponse.json(
      { error: '상품 등록 실패' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      throw new Error('백엔드 API URL이 설정되지 않았습니다.');
    }

    const { id, myprice } = await request.json();
    const response = await fetch(`${BACKEND_API_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ myprice }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: '상품을 찾을 수 없습니다.' },
          { status: 404, headers: corsHeaders }
        );
      }
      throw new Error('가격 업데이트 실패');
    }

    return NextResponse.json(await response.json(), { headers: corsHeaders });
  } catch (error) {
    console.error('가격 업데이트 실패:', error);
    return NextResponse.json(
      { error: '가격 업데이트 실패' },
      { status: 500, headers: corsHeaders }
    );
  }
}
