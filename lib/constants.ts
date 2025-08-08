import { Article, AnomalyPattern } from './types';

// 記事データ（最小限のサンプル）
export const ARTICLES: Article[] = [
  {
    id: "article-1",
    isAnomaly: false,
    title: "地域活性化に向けた新たな取り組みが始動",
    content: `本日、市では地域活性化に向けた新たなプロジェクトが正式に発表されました。

このプロジェクトは、地域住民と企業が連携して、持続可能な街づくりを目指すものです。具体的には、商店街の活性化、観光資源の開発、若者の定住促進などが主な取り組み内容となります。

市長は記者会見で「地域の皆様と一体となって、より良い街づくりに取り組んでまいります」と述べました。

プロジェクトの詳細については、来月の市民説明会で発表される予定です。多くの市民の参加が期待されています。`,
    publishDate: "2025-01-15"
  },
  {
    id: "article-2", 
    isAnomaly: true,
    title: "地域活性化に向けた新たな取り組みが始動",
    content: `本日、市では地域活性化に向けた新たなプロジェクトが正式に発表されました。

このプロジェクトは、地域住民と企業が連携して、持続可能な街づくりを目指すものです。具体的には、商店街の活性化、観光資源の開発、若者の定住促進などが主な取り組み内容となります。

市長は記者会見で「地域の皆様と一体となって、より良い街づくりに取り組んでまいります」と述べました。

プロジェクトの詳細については、来月の市民説明会で発表される予定です。多くの市民の参加が期待されています。

※この記事は3秒後に内容が変わります。`,
    publishDate: "2025-01-15"
  },
  {
    id: "article-3",
    isAnomaly: false, 
    title: "新しい図書館が来春オープン予定",
    content: `市内中心部に建設中の新図書館が、来年春のオープンに向けて着々と工事が進んでいます。

新図書館は地上4階建てで、蔵書数は約20万冊を予定しています。最新のデジタル設備も導入され、電子書籍の閲覧やオンライン学習にも対応します。

また、カフェやワーキングスペースも併設され、市民の新しい憩いの場となることが期待されています。

建設工事は順調に進んでおり、予定通り来春のオープンが見込まれています。`,
    publishDate: "2025-01-10"
  }
];

// 異変パターン定義
export const ANOMALY_PATTERNS: Record<string, AnomalyPattern> = {
  'content-change': {
    type: 'content',
    trigger: 'time', 
    config: { delay: 3000 }
  },
  'layout-collapse': {
    type: 'layout',
    trigger: 'scroll',
    config: { breakPoint: 0.5 }
  },
  'gif-image': {
    type: 'image',
    trigger: 'immediate',
    config: {}
  }
};

// ランダムに記事を選択する関数
export function getRandomArticle(): Article {
  const randomIndex = Math.floor(Math.random() * ARTICLES.length);
  return ARTICLES[randomIndex];
}