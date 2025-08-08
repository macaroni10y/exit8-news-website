# 8番ニュース 技術仕様書

## システム概要

### プロダクト概要
人気ゲーム「8番出口」をオマージュしたブログ風ゲームサイト。ユーザーはニュース記事を閲覧し、記事に異変があるかを判定して進行する。8回連続正解でクリア。

### 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **UI**: React 19 + Tailwind CSS 4
- **認証**: なし（JWT はゲーム進行状態保持のみ）
- **デプロイ**: Vercel (GitHub 連携)
- **状態管理**: JWT Cookie + Server Components

### アーキテクチャ方針
- Server Components を活用した SSR 中心設計
- middleware による状態管理・画面遷移制御
- Stateless 設計（JWT のみ、DB 不要）

## ゲーム仕様

### 画面構成
1. **入口ページ** (`/`)
   - ゲーム説明
   - ゲーム開始ボタン → `/articles/1` へ遷移

2. **ニュースページ** (`/articles/[step]`)
   - step: 1-8 のゲーム進行度
   - 記事コンテンツ表示
   - ページ下部：「←前の記事へ」「次の記事へ→」ボタン

3. **クリアページ** (`/clear`)
   - おめでとうメッセージ
   - 再プレイボタン

### ゲーム進行ロジック
```
開始 → articles/1 → ... → articles/8 → clear
      ↑___________________|（不正解時）
```

- 正常ページ：「次の記事へ→」が正解
- 異変ページ：「←前の記事へ」が正解  
- 正解：次のステップへ進行
- 不正解：`/articles/1` にリセット

## 実装アーキテクチャ

### App Router 構成
```
app/
├── globals.css
├── layout.tsx            # ルートレイアウト
├── page.tsx             # 入口ページ
├── articles/
│   └── [step]/
│       └── page.tsx     # ニュースページ
├── clear/
│   └── page.tsx         # クリアページ
└── api/
    └── reset/
        └── route.ts     # ゲームリセット API
```

### middleware 実装
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // /articles/* アクセス時の状態管理
  // JWT Cookie の検証・更新
  // 正解/不正解判定
  // リダイレクト制御
}

export const config = {
  matcher: ['/articles/:path*']
}
```

### 必要パッケージ追加
```json
{
  "dependencies": {
    "jose": "^5.0.0"  // JWT 処理
  }
}
```

## データ構造

### JWT Payload 型定義
```typescript
export interface PlayTokenPayload {
  v: 1;                          // スキーマバージョン
  sid: string;                   // Session UUID
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;  // 現在のステップ
  consecutive: number;           // 連続正解数
  history: {
    articleId: string;          // 表示された記事ID
    answered: 'prev' | 'next'; // ユーザーの選択
  }[];
  exp: number;                  // 有効期限 (2時間)
}
```

### 記事データ構造
```typescript
export interface Article {
  id: string;           // 記事一意ID
  isAnomaly: boolean;   // 異変記事かどうか
  title: string;        // 記事タイトル
  content: string;      // 記事本文
  imageUrl?: string;    // 記事画像URL
  publishDate: string;  // 公開日
}

export const ARTICLES: Article[] = [
  // 20-30記事を定義
  { id: "1", isAnomaly: false, title: "...", content: "..." },
  { id: "2", isAnomaly: true, title: "...", content: "..." },
  // ...
];
```

### 異変パターン定義
```typescript
export interface AnomalyPattern {
  type: 'layout' | 'content' | 'image' | 'animation';
  trigger: 'scroll' | 'time' | 'immediate';
  config: Record<string, any>;
}

export const ANOMALY_PATTERNS: Record<string, AnomalyPattern> = {
  'layout-collapse': {
    type: 'layout',
    trigger: 'scroll',
    config: { breakPoint: 0.5 }
  },
  'content-change': {
    type: 'content', 
    trigger: 'time',
    config: { delay: 3000 }
  },
  'gif-image': {
    type: 'image',
    trigger: 'immediate',
    config: {}
  }
};
```

## UI実装仕様

### レスポンシブ対応
```typescript
// Tailwind CSS クラス例
const newsLayout = {
  container: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
  article: "prose prose-lg sm:prose-xl max-w-none",
  navigation: "flex justify-between mt-8 gap-4"
}
```

### ニュースサイト風デザイン
- **ヘッダー**: ロゴ、ナビゲーション
- **記事**: タイトル、公開日、本文、画像
- **フッター**: ナビゲーションボタン
- **カラー**: ニュースサイト風（白背景、黒文字、青リンク）

### 異変エフェクト実装
```typescript
// 異変コンポーネント例
export function AnomalyEffect({ 
  pattern, 
  children 
}: { 
  pattern: AnomalyPattern, 
  children: React.ReactNode 
}) {
  // パターンに応じたエフェクト適用
}
```

## セキュリティ・制御機能

### 直アクセス制御
```typescript
// middleware.ts で実装
if (step > 1 && !validToken) {
  return NextResponse.redirect(new URL('/', request.url));
}
```

### JWT署名検証
```typescript
import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret'
);

export async function verifyToken(token: string): Promise<PlayTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as PlayTokenPayload;
  } catch {
    return null;
  }
}
```

### ソース解析対策
- Server Side Rendering で異変をサーバー側で生成
- クライアント側に異変パターンを露出しない
- 記事選択ロジックをサーバー側で実行

## ディレクトリ構成

```
exit8-news-website/
├── app/                    # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx           # 入口ページ
│   ├── articles/
│   │   └── [step]/
│   │       └── page.tsx   # ニュースページ
│   ├── clear/
│   │   └── page.tsx       # クリアページ
│   └── api/
│       └── reset/
│           └── route.ts
├── components/             # React コンポーネント
│   ├── ui/                # 基本UI部品
│   ├── NewsArticle.tsx    # 記事表示
│   ├── AnomalyEffect.tsx  # 異変エフェクト
│   └── Navigation.tsx     # ナビゲーション
├── lib/                   # ユーティリティ
│   ├── jwt.ts            # JWT処理
│   ├── constants.ts      # 記事データ・異変パターン
│   ├── game.ts           # ゲームロジック
│   └── types.ts          # 型定義
├── middleware.ts         # Next.js middleware
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 開発環境設定

### 環境変数
```bash
# .env.local
JWT_SECRET_DEV=your-development-secret-here

# .env (Vercel)
JWT_SECRET=your-production-secret-here
```

### package.json 更新
```json
{
  "dependencies": {
    "next": "15.4.6",
    "react": "19.1.0", 
    "react-dom": "19.1.0",
    "jose": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19", 
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4"
  }
}
```

### 開発コマンド
```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run lint     # ESLint実行
```

## 実装手順

### Phase 1: 基盤構築
1. 必要パッケージのインストール
2. 基本型定義・constants作成
3. JWT処理関数実装
4. middleware 基本実装

### Phase 2: 画面実装  
1. 入口ページ作成
2. ニュースページ基本レイアウト
3. クリアページ作成
4. ナビゲーション実装

### Phase 3: ゲームロジック
1. 記事データ作成（20-30記事）
2. 異変パターン実装
3. ゲーム進行ロジック完成
4. エラーハンドリング

### Phase 4: 最適化・テスト
1. レスポンシブ調整
2. パフォーマンス最適化
3. ブラウザテスト
4. Vercelデプロイテスト

## 技術的考慮事項

### パフォーマンス
- Server Components で初期表示の高速化
- 画像最適化（next/image使用）
- バンドルサイズの最適化

### SEO対策
- 各ページに適切なmeta tags
- 構造化データの実装
- sitemap.xml生成

### ユーザビリティ  
- ローディング状態の表示
- エラー画面の実装
- アクセシビリティ対応

## 運用・保守

### 記事追加方法
1. `lib/constants.ts` に新しい記事データを追加
2. 異変記事の場合、対応する異変パターンを指定
3. ビルド・デプロイで反映

### 異変パターン追加
1. `AnomalyPattern` 型に新しいタイプを追加
2. `AnomalyEffect` コンポーネントに対応実装
3. `ANOMALY_PATTERNS` に設定追加

### モニタリング
- Vercel Analytics で PV・UU 計測
- エラー監視（Vercel 標準機能）
- JWT トークンの有効期限監視