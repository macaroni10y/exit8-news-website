import { jwtVerify, SignJWT } from 'jose';
import { PlayTokenPayload } from './types';

// JWT秘密鍵
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET_DEV || process.env.JWT_SECRET || 'fallback-dev-secret'
);

// Session UUIDを生成
function generateSessionId(): string {
  return crypto.randomUUID();
}

// 初期トークンを生成（ゲーム開始時）
export async function createInitialToken(initialArticleId: string): Promise<string> {
  const payload: PlayTokenPayload = {
    v: 1,
    sid: generateSessionId(),
    step: 1,
    consecutive: 0,
    currentArticleId: initialArticleId,
    history: [],
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60) // 2時間後
  };

  const jwt = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(payload.exp)
    .sign(secret);

  return jwt;
}

// トークンを検証・デコード
export async function verifyToken(token: string): Promise<PlayTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as PlayTokenPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// トークンを更新（ステップ進行時）
export async function updateToken(
  currentPayload: PlayTokenPayload,
  newStep: PlayTokenPayload['step'],
  newArticleId: string,
  userAnswer: 'prev' | 'next'
): Promise<string> {
  const newPayload: PlayTokenPayload = {
    ...currentPayload,
    step: newStep,
    consecutive: newStep > currentPayload.step ? currentPayload.consecutive + 1 : 0,
    currentArticleId: newArticleId,
    history: [
      ...currentPayload.history,
      {
        articleId: currentPayload.currentArticleId,
        answered: userAnswer
      }
    ],
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60) // 2時間後に更新
  };

  const jwt = await new SignJWT(newPayload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(newPayload.exp)
    .sign(secret);

  return jwt;
}

// 記事IDのみを更新（ページ表示時）
export async function updateTokenWithArticle(
  currentPayload: PlayTokenPayload,
  newArticleId: string
): Promise<string> {
  const newPayload: PlayTokenPayload = {
    ...currentPayload,
    currentArticleId: newArticleId,
    exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60) // 2時間後に更新
  };

  const jwt = await new SignJWT(newPayload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(newPayload.exp)
    .sign(secret);

  return jwt;
}