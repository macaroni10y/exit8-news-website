import { NextRequest, NextResponse } from 'next/server';
import { createInitialToken, verifyToken, updateToken, updateTokenWithArticle } from '@/lib/jwt';
import { getRandomArticle, ARTICLES } from '@/lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  // /articles/* 以外は処理しない
  if (!pathname.startsWith('/articles/')) {
    return NextResponse.next();
  }
  
  // ステップを抽出
  const stepMatch = pathname.match(/^\/articles\/(\d+)$/);
  if (!stepMatch) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  const step = parseInt(stepMatch[1], 10);
  if (step < 1 || step > 8) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // 現在のトークンを取得
  const currentToken = request.cookies.get('play')?.value;
  
  // Step 1 の場合：初期トークン生成またはリセット
  if (step === 1) {
    if (!currentToken || !searchParams.get('clicked')) {
      // 初回アクセスまたはリセット時：新しいトークンを生成
      const initialArticle = getRandomArticle();
      const newToken = await createInitialToken(initialArticle.id);
      const response = NextResponse.next();
      response.cookies.set('play', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 2 // 2時間
      });
      return response;
    }
  }
  
  // トークンの検証
  const payload = currentToken ? await verifyToken(currentToken) : null;
  
  // Step 2以上の場合：有効なトークンが必要
  if (step > 1 && !payload) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // 通常のページアクセス（ボタンクリックなし）で、記事IDが設定されていない場合
  if (payload && !payload.currentArticleId && !searchParams.get('clicked')) {
    const newArticle = getRandomArticle();
    const newToken = await updateTokenWithArticle(payload, newArticle.id);
    const response = NextResponse.next();
    response.cookies.set('play', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2
    });
    return response;
  }
  
  // ユーザーがボタンをクリックした場合の処理
  const clickedDirection = searchParams.get('clicked');
  if (clickedDirection && payload) {
    // JWTから現在の記事IDを取得
    const currentArticle = ARTICLES.find(article => article.id === payload.currentArticleId);
    if (!currentArticle) {
      // 記事が見つからない場合はリセット
      const initialArticle = getRandomArticle();
      const newToken = await createInitialToken(initialArticle.id);
      const response = NextResponse.redirect(new URL('/articles/1', request.url));
      response.cookies.set('play', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 2
      });
      return response;
    }
    
    // 正解判定
    const expectDirection = currentArticle.isAnomaly ? 'prev' : 'next';
    const isCorrect = clickedDirection === expectDirection;
    
    if (isCorrect) {
      // 正解：次のステップまたはクリアページへ
      const nextStep = step + 1;
      if (nextStep > 8) {
        // ゲームクリア
        const response = NextResponse.redirect(new URL('/clear', request.url));
        return response;
      } else {
        // 次のステップ用の新しい記事を選択
        const nextArticle = getRandomArticle();
        const newToken = await updateToken(payload, nextStep as any, nextArticle.id, clickedDirection as any);
        const response = NextResponse.redirect(new URL(`/articles/${nextStep}`, request.url));
        response.cookies.set('play', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 2
        });
        return response;
      }
    } else {
      // 不正解：リセット
      const resetArticle = getRandomArticle();
      const newToken = await createInitialToken(resetArticle.id);
      const response = NextResponse.redirect(new URL('/articles/1', request.url));
      response.cookies.set('play', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 2
      });
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/articles/:path*']
};