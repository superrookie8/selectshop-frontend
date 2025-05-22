import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS 요청 처리
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET 요청 처리
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: '검색어가 필요합니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // 백엔드 API 호출
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('검색 실패');
    }

    const items = await response.json();
    return NextResponse.json(items, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: '검색 처리 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
} 