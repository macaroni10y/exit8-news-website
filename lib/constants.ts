import type { AnomalyPattern, Article } from "./types";

const articleTitle =
  "地域通貨アプリ「まちめぐりPay」10月1日スタート 商店街の回遊促進へ";

const articleContent = `
市は、地域通貨アプリ「まちめぐりPay」を10月1日に正式スタートします。中小店舗のキャッシュレス対応を後押ししつつ、買い回りに応じたポイント還元で商店街の回遊を促す狙いです。開始時点で飲食・生鮮・書店・ドラッグストアなど312店舗が参加し、公共施設の売店や文化施設のカフェにも順次拡大します。

![地域通貨アプリ「まちめぐりPay」のホーム画面](/images/machimeguri_pay_app.png)
*地域通貨アプリ「まちめぐりPay」のホーム画面*

## サービス概要

チャージはクレジットカード、銀行口座、コンビニ現金に対応。決済は加盟店のレジ横QRを読み取る方式で、1円単位の支払いが可能です。通常還元は2%、商店街を3店舗以上はしごすると週末限定で最大15%まで上乗せされます（上限あり）。市内のイベントやバス一日券と連動した“まち歩き特典”も用意しました。  

## 使い方と体験

アプリを開いて金額を入力し、店頭QRを読み取るだけのシンプル設計です。支払い直後にレシートと還元予定ポイントが表示され、家計簿にも自動記録されます。初回はアプリ内のチュートリアルが案内し、対面サポートが必要な人には商店街の案内所カウンターでスタッフが手ほどきします。

![商店街でQRを読み取り決済する来店客のようす](/images/dummy.png)
*商店街でQRを読み取り決済する来店客のようす*

## 店舗側のメリット

加盟店は専用アプリかブラウザで、時間帯別売上や再来店率を確認できます。決済手数料は一律1.8%（小規模店は1.5%の期間優遇）。紙のクーポン管理を置き換え、スタンプカードはアプリ上で自動付与。仕入れの山谷に合わせた時間帯クーポンを即時発行でき、在庫のダブつきを抑制します。

## 還元と財源の考え方

ベース還元（2%）は市のデジタル地域振興費と加盟店負担の折半、期間限定の上乗せ（+3〜13%）は商店街連合会とイベント連携のプロモーション費から拠出します。過度な値引き競争を避けるため、同一店舗への高還元は月3回までに制限。“点”でなく“面”のにぎわいをつくる設計です。

## セキュリティとプライバシー

決済データはトークン化し、個人が特定されない形で統計化。異常取引は運用センターでリアルタイム監視し、二段階認証や上限アラートで不正利用を抑止します。高齢者向けには顔認証＋暗証の併用モードも選択可能です。

![運用センターのモニタリング画面と加盟店向けダッシュボード](/images/dummy.png)
*運用センターのモニタリング画面と加盟店向けダッシュボード*

## 開始イベントとスケジュール

10月1〜6日は商店街ごとの“はしごウィーク”を開催し、スタンプ3つで抽選に参加できます。11月からは市バス・シェアサイクルと連携したモビリティ特典を導入し、郊外店への回遊も促進します。来春までに加盟店を500店規模へ拡大する計画です。

## 市民と店舗の声（事前テスト）

「現金いらずで会計が早い。はしご条件が“3店舗”なのも散歩ついでに達成しやすい」（40代・利用者）

「客足の薄い時間にクーポンを出せるのが助かる。常連の再来店も可視化できた」（飲食店主）

## 利用案内・問い合わせ

アプリは主要ストアで無料配信。サポート窓口は商店街案内所（月・水・金 13:00–17:00）と市役所1階の相談ブース（平日 9:00–16:30）で受け付けます。紙のガイドブックと初期設定マップも配布し、スマホに不慣れな人の参加を後押しします。`;

// Article data (minimal sample)
export const ARTICLES: Article[] = [
  {
    id: "article-1",
    isAnomaly: false,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
  },
  {
    id: "article-2",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
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
    anomalyPlugins: [
      {
        id: "image-swap",
        trigger: "immediate",
        config: {
          targetImageUrl: "/images/machimeguri_pay_app.png",
          replaceImageUrl: "/images/machimeguri_pay_app_anomaly.png",
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
  {
    id: "article-8",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    anomalyPlugins: [
      {
        id: "title-change",
        trigger: "time",
        delay: 3000,
        config: {},
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
