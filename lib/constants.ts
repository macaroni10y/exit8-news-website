import type { AnomalyPattern, Article } from "./types";

const articleTitle = "新しい図書館が来春オープン予定";

const articleContent = `市内中心部に建設中の新図書館が、来年4月のオープンに向けて着々と工事が進んでいます。この新施設は、地域の文化・教育・交流の拠点として大きな期待を集めています。

## 施設概要

新図書館は地上4階、地下1階の構造で、延床面積は約8,500平方メートル。「知の森」をコンセプトに、自然光を活用した明るく開放的な空間設計となっています。外観は大きなガラス窓と木材を組み合わせた温かみのあるデザインで、太陽光発電システムも導入されます。

![建設中の新図書館外観](/images/dummy.png)
*建設が進む新図書館の外観*

## 各フロアの機能

### 1階：エントランス・交流スペース
エントランスホールには市内の歴史や文化を紹介する展示スペースを設置。120席のカフェ「ブックカフェ」が併設され、図書館の本を読みながら軽食やコーヒーを楽しめます。

### 2階：一般図書・児童図書エリア
蔵書数は約12万冊を予定。児童図書エリアには読み聞かせスペースや「おはなしの部屋」も設置され、親子で楽しめる空間となっています。

### 3階：学習・研究スペース
個人学習席150席、グループ学習室6室を設置。Wi-Fi完備でノートパソコンの持ち込みも可能。専門図書や学術雑誌も充実しています。

![館内レイアウト設計図](/images/dummy.png)
*新図書館の館内レイアウト設計図*

### 4階：多目的ホール・会議室
300人収容可能な多目的ホールと、大小5室の会議室を設置。最新の音響・映像設備を完備し、講演会や音楽会など様々なイベントに利用できます。

### 地下1階：書庫
約8万冊の収蔵能力があり、貴重な郷土資料や古文書も適切な環境で保管。デジタルアーカイブ化も進められます。

## デジタルサービス

- **電子図書館**：約1万タイトルの電子書籍が24時間利用可能
- **AIレファレンス**：簡単な調べものなら24時間対応
- **デジタルサイネージ**：館内各所でイベント情報や新着図書を案内

![デジタルサービスイメージ](/images/dummy.png)
*最新のデジタルサービスを提供*

## バリアフリー対応

すべての人が利用しやすいユニバーサルデザインを採用。エレベーター3基、点字ブロック、音声案内、多目的トイレ各階設置など、充実したバリアフリー設備を整備します。

## 開館時間とアクセス

### 開館時間
- 平日：午前9時～午後9時
- 土日祝：午前9時～午後6時
- 休館日：毎月第3月曜日、年末年始

### アクセス
- JR中央駅から徒歩10分
- 市営バス「図書館前」停留所下車すぐ
- 駐車場：200台（最初の2時間無料）
- 駐輪場：300台

## 建設の経緯

現在の市立図書館は築50年を超え、老朽化が進んでいました。市では2018年から新図書館建設の検討を開始し、延べ3,000人以上の市民が参加したワークショップを重ねて基本計画を策定しました。

![完成予想図の外観パース](/images/dummy.png)
*完成予想図：夜間ライトアップされた新図書館*

### 市民の声

「子どもと一緒に過ごせる場所ができるのが嬉しい。読み聞かせスペースが充実していて、週末の楽しみが増えそう」（30代女性）

「学習スペースが広くなるのは本当にありがたい。受験勉強に集中できる環境が整うのを楽しみにしています」（高校生）

## 今後のスケジュール

- 2025年2月：建物竣工
- 2025年3月：蔵書移転・システム導入
- 2025年4月15日：グランドオープン

グランドオープンの際は、記念式典や作家による講演会、子ども向けイベントなど、さまざまな記念行事を予定しています。

市教育長は「新図書館は、市民の知的好奇心を育み、生涯学習を支援する重要な施設となる。多くの方に愛される図書館を目指したい」と意気込みを語っています。`;
// Article data (minimal sample)
export const ARTICLES: Article[] = [
  {
    id: "article-1",
    isAnomaly: false,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    imageUrl: "/images/dummy.png",
  },
  {
    id: "article-2",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    imageUrl: "/images/dummy.png",
    anomalyPlugins: [
      {
        id: "layout-collapse",
        trigger: "time",
        delay: 3000,
        config: {
          intensity: "medium",
          duration: 2000,
        },
      },
    ],
  },
  {
    id: "article-3",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    imageUrl: "/images/dummy.png",
    anomalyPlugins: [
      {
        id: "reverse-scroll",
        trigger: "time",
        delay: 2500,
        config: {
          intensity: "full",
          visualFeedback: false,
        },
      },
    ],
  },
  {
    id: "article-4",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    imageUrl: "/images/dummy.png",
    anomalyPlugins: [
      {
        id: "image-swap",
        trigger: "time",
        delay: 2000,
        config: {
          gifUrl: "/images/dummy_dots.gif",
          transition: false,
        },
      },
    ],
  },
  {
    id: "article-5",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    imageUrl: "/images/dummy.png",
    anomalyPlugins: [
      {
        id: "text-corruption",
        trigger: "time",
        delay: 4000,
        config: {
          intensity: "progressive",
          preserveSpaces: true,
        },
      },
    ],
  },
  {
    id: "article-6",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    imageUrl: "/images/dummy.png",
    anomalyPlugins: [
      {
        id: "period-removal",
        trigger: "immediate",
        config: {},
      },
    ],
  },
  {
    id: "article-7",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    imageUrl: "/images/dummy.png",
    anomalyPlugins: [
      {
        id: "scroll-vanish",
        trigger: "immediate",
        config: {
          vanishType: "hide",
          targetElements: "p, h2, h3, img, ul, ol, blockquote",
          transition: true,
        },
      },
    ],
  },
];

// Anomaly pattern definitions
export const ANOMALY_PATTERNS: Record<string, AnomalyPattern> = {
  "content-change": {
    type: "content",
    trigger: "time",
    config: { delay: 3000 },
  },
  "layout-collapse": {
    type: "layout",
    trigger: "scroll",
    config: { breakPoint: 0.5 },
  },
  "gif-image": {
    type: "image",
    trigger: "immediate",
    config: {},
  },
};

// Function to select a random article
export function getRandomArticle(): Article {
  const randomIndex = Math.floor(Math.random() * ARTICLES.length);
  return ARTICLES[randomIndex];
}
