// JWT Payload 型定義
export interface PlayTokenPayload {
  v: 1;                          // スキーマバージョン
  sid: string;                   // Session UUID
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;  // 現在のステップ
  consecutive: number;           // 連続正解数
  currentArticleId: string;      // 現在表示中の記事ID
  history: {
    articleId: string;          // 表示された記事ID
    answered: 'prev' | 'next'; // ユーザーの選択
  }[];
  exp: number;                  // 有効期限 (2時間)
}

// 記事データ構造
export interface Article {
  id: string;           // 記事一意ID
  isAnomaly: boolean;   // 異変記事かどうか
  title: string;        // 記事タイトル
  content: string;      // 記事本文
  imageUrl?: string;    // 記事画像URL
  publishDate: string;  // 公開日
  anomalyPlugins?: AnomalyPluginConfig[];  // 異変プラグイン設定
}

// 異変プラグイン設定
export interface AnomalyPluginConfig {
  id: string;           // プラグインID
  trigger: 'time' | 'scroll' | 'immediate';  // 実行タイミング
  config: Record<string, any>;  // プラグイン固有設定
  delay?: number;       // 遅延実行時間（ms）
}

// 異変パターン定義（従来互換）
export interface AnomalyPattern {
  type: 'layout' | 'content' | 'image' | 'animation';
  trigger: 'scroll' | 'time' | 'immediate';
  config: Record<string, any>;
}