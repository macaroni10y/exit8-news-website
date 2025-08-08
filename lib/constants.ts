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

プロジェクトの詳細については、来月の市民説明会で発表される予定です。多くの市民の参加が期待されています。`,
    publishDate: "2025-01-15",
    anomalyPlugins: [
      {
        id: 'layout-collapse',
        trigger: 'time',
        delay: 3000,
        config: {
          intensity: 'medium',
          duration: 2000
        }
      }
    ]
  },
  {
    id: "article-3",
    isAnomaly: false, 
    title: "新しい図書館が来春オープン予定",
    content: `市内中心部に建設中の新図書館が、来年春のオープンに向けて着々と工事が進んでいます。

新図書館は地上4階建てで、蔵書数は約20万冊を予定しています。最新のデジタル設備も導入され、電子書籍の閲覧やオンライン学習にも対応します。

また、カフェやワーキングスペースも併設され、市民の新しい憩いの場となることが期待されています。

建設工事は順調に進んでおり、予定通り来春のオープンが見込まれています。`,
    publishDate: "2025-01-10",
    imageUrl: "/images/hellmo.png"
  },
  {
    id: "article-4",
    isAnomaly: true,
    title: "市内交通システムの改善計画が発表",
    content: `市は本日、交通渋滞の解消と公共交通機関の利便性向上を目的とした包括的な交通システム改善計画を発表しました。

この計画には、主要道路の拡張工事、バス路線の再編、新しい自転車専用レーンの整備が含まれます。特に市中心部では、歩行者優先のエリアを拡大し、より安全で快適な街づくりを進めます。

交通局長は「市民の皆様の日常的な移動をより便利で環境に優しいものにしたい」とコメントしています。

工事は来年度から段階的に開始され、完成は3年後を予定しています。工事期間中は一時的な通行制限もありますが、市民への影響を最小限に抑える努力をしています。`,
    publishDate: "2025-01-12",
    imageUrl: "/images/hellmo.png",
    anomalyPlugins: [
      {
        id: 'image-swap',
        trigger: 'time',
        delay: 2000,
        config: {
          gifUrl: '/images/hellmo.gif',
          transition: false
        }
      },
      {
        id: 'layout-collapse',
        trigger: 'time',
        delay: 5000,
        config: {
          intensity: 'high',
          duration: 3000
        }
      }
    ]
  },
  {
    id: "article-5",
    isAnomaly: true,
    title: "地域イベント「夏祭り2025」の準備が本格化",
    content: `毎年恒例の地域最大のイベント「夏祭り2025」の準備が本格的に始まりました。

今年は7月の第2土日に開催予定で、地域の商店街や住民団体が一丸となって準備を進めています。メインステージでは地元バンドの演奏や伝統芸能の披露が予定されており、多彩な出店も楽しみの一つです。

実行委員会の田中委員長は「今年はより多くの家族に楽しんでいただける内容を企画している」とコメントしています。

特に注目は、地域の子どもたちが制作した巨大な絵画の展示です。昨年を上回る来場者数を見込んでおり、周辺道路の交通整理も強化される予定です。`,
    publishDate: "2025-01-14",
    imageUrl: "/images/news-static.png",
    anomalyPlugins: [
      {
        id: 'image-swap',
        trigger: 'time',
        delay: 3000,
        config: {
          gifUrl: '/images/news-animated.gif',
          transition: true
        }
      }
    ]
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