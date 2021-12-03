import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // 로그인 했는지 체크
  if (!req.cookies.hasOwnProperty('logged')) {
    return NextResponse.redirect('/')
  }
}
