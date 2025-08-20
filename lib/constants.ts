import type { Article } from "./types";

const articleTitle =
  "地域通貨アプリ「まちめぐりPay」10月1日スタート 商店街の回遊促進へ";

const articleContent = `
市は、地域通貨アプリ「まちめぐりPay」を10月1日に正式スタートします。中小店舗のキャッシュレス対応を後押ししつつ、買い回りに応じたポイント還元で商店街の回遊を促す狙いです。開始時点で飲食・生鮮・書店・ドラッグストアなど312店舗が参加し、公共施設の売店や文化施設のカフェにも順次拡大します。

![地域通貨アプリ「まちめぐりPay」のホーム画面](/images/machimeguri_pay_app.png)
*地域通貨アプリ「まちめぐりPay」のホーム画面*

## サービス概要

チャージはクレジットカード、銀行口座、コンビニ現金に対応。決済は加盟店のレジ横QRを読み取る方式で、1円単位の支払いが可能です。通常還元は2%、商店街を3店舗以上はしごすると週末限定で最大15%まで上乗せされます（上限あり）。市内のイベントやバス一日券と連動した“まち歩き特典”も用意しました。  

## 使い方と体験

アプリを開いてQRコードを表示し、店頭で読み取ってもらうだけのシンプル設計です。支払い直後にレシートと還元予定ポイントが表示され、家計簿にも自動記録されます。初回はアプリ内のチュートリアルが案内し、対面サポートが必要な人には商店街の案内所カウンターでスタッフが手ほどきします。

![対象店舗でQR決済する来店客のようす](/images/machimeguri_pay_usage.jpg)
*対象店舗でQR決済する来店客のようす*

## 店舗側のメリット

加盟店は専用アプリかブラウザで、時間帯別売上や再来店率を確認できます。決済手数料は一律1.8%（小規模店は1.5%の期間優遇）。紙のクーポン管理を置き換え、スタンプカードはアプリ上で自動付与。仕入れの山谷に合わせた時間帯クーポンを即時発行でき、在庫のダブつきを抑制します。

## 還元と財源の考え方

ベース還元（2%）は市のデジタル地域振興費と加盟店負担の折半、期間限定の上乗せ（+3〜13%）は商店街連合会とイベント連携のプロモーション費から拠出します。過度な値引き競争を避けるため、同一店舗への高還元は月3回までに制限。“点”でなく“面”のにぎわいをつくる設計です。

## セキュリティとプライバシー

決済データはトークン化し、個人が特定されない形で統計化。異常取引は運用センターでリアルタイム監視し、二段階認証や上限アラートで不正利用を抑止します。高齢者向けには顔認証＋暗証の併用モードも選択可能です。

![運用センターのモニタリング画面と加盟店向けダッシュボード](/images/dashboard.png)
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
  // Normal articles (10 total for 50% probability)
  // {
  //   id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "d7e8f9a0-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "9f8e7d6c-5b4a-3928-1706-f5e4d3c2b1a0",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "e5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8a9b0",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "3b4c5d6e-7f8a-9b0c-1d2e-3f4a5b6c7d8e",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "c1d2e3f4-a5b6-c7d8-e9f0-a1b2c3d4e5f6",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // {
  //   id: "8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d",
  //   isAnomaly: false,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  // },
  // // Anomaly articles (10 total for 50% probability)
  // {
  //   id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "layout-collapse",
  //       trigger: "time",
  //       delay: 3000,
  //       config: {
  //         intensity: "medium",
  //         duration: 2000,
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "550e8400-e29b-41d4-a716-446655440000",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "reverse-scroll",
  //       trigger: "time",
  //       delay: 2500,
  //       config: {
  //         intensity: "full",
  //         visualFeedback: false,
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "image-swap",
  //       trigger: "immediate",
  //       config: {
  //         targetImageUrl: "/images/machimeguri_pay_app.png",
  //         replaceImageUrl: "/images/machimeguri_pay_app_anomaly.png",
  //         transition: false,
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "text-corruption",
  //       trigger: "time",
  //       delay: 4000,
  //       config: {
  //         intensity: "progressive",
  //         preserveSpaces: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "b105f00d-bad0-c0de-1bad-f00ddeadbabe",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "period-removal",
  //       trigger: "immediate",
  //       config: {},
  //     },
  //   ],
  // },
  // {
  //   id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "scroll-vanish",
  //       trigger: "immediate",
  //       config: {
  //         vanishType: "hide",
  //         targetElements: "p, h2, h3, img, ul, ol, blockquote",
  //         transition: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "title-change",
  //       trigger: "time",
  //       delay: 3000,
  //       config: {},
  //     },
  //   ],
  // },
  // {
  //   id: "6dcd4ce2-3d55-4b02-87e5-c103c5d75829",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "text-replacement",
  //       trigger: "immediate",
  //       config: {
  //         replaceAll: true,
  //         caseSensitive: true,
  //         replacements: [
  //           {
  //             from: "常連の再来店も可視化できた",
  //             to: "これを読んだら引き返して",
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "water-drop",
  //       trigger: "time",
  //       delay: 3000,
  //       config: {
  //         dropCount: 25,
  //         duration: 5000,
  //         minSize: 8,
  //         maxSize: 20,
  //         color: "rgba(59, 130, 246, 0.7)",
  //       },
  //     },
  //   ],
  // },
  // {
  //   id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "draggable-image",
  //       trigger: "time",
  //       delay: 2000,
  //       config: {},
  //     },
  //   ],
  // },
  //   {
  //   id: "c1eb8ff8-45ea-4bf2-bcea-58b64d1b96ca",
  //   isAnomaly: true,
  //   title: articleTitle,
  //   content: articleContent,
  //   publishDate: "2025-01-15",
  //   anomalyPlugins: [
  //     {
  //       id: "auto-scroll",
  //       trigger: "time",
  //       delay: 2000,
  //       config: {
  //         speed: 0.25,
  //         smoothness: true,
  //         stopAtBottom: true,
  //       },
  //     },
  //   ],
  // },
  {
    id: "nav-links-duplicate-001",
    isAnomaly: true,
    title: articleTitle,
    content: articleContent,
    publishDate: "2025-01-15",
    anomalyPlugins: [
      {
        id: "duplicate-nav-links",
        trigger: "time",
        delay: 2500,
        config: {
          layout: "mixed",
          spacing: "normal",
        },
      },
    ],
  },
];

// Function to select a random article
export function getRandomArticle(): Article {
  const randomIndex = Math.floor(Math.random() * ARTICLES.length);
  return ARTICLES[randomIndex];
}
