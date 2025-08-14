import { cookies } from "next/headers";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { AnomalyEffect } from "@/components/AnomalyEffect";
import { DummyLinkPreventer } from "@/components/DummyLinkPreventer";
import { NavigationGuard } from "@/components/NavigationGuard";
import { ARTICLES } from "@/lib/constants";
import { verifyToken } from "@/lib/jwt";

interface PageProps {
  params: Promise<{ step: string }>;
  searchParams: Promise<{ clicked?: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { step } = await params;

  // Convert current step to number
  const currentStep = parseInt(step, 10);

  // Redirect if step is invalid (handled by middleware in actual implementation)
  if (Number.isNaN(currentStep) || currentStep < 1 || currentStep > 8) {
    return <div>Invalid step</div>;
  }

  // Get article ID from JWT
  const cookieStore = await cookies();
  const playToken = cookieStore.get("play")?.value;
  const payload = playToken ? await verifyToken(playToken) : null;

  if (!payload || !payload.currentArticleId) {
    return <div>Loading...</div>;
  }

  const article = ARTICLES.find((a) => a.id === payload.currentArticleId);
  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationGuard />
      <DummyLinkPreventer />
      <header className="bg-white border-b-2 border-yellow-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top navigation */}
          <div className="flex justify-between items-center py-2 text-xs sm:text-sm text-gray-600">
            <div className="flex space-x-2 sm:space-x-4">
              <span className="hidden sm:inline">2025年1月9日（木）</span>
              <span className="sm:hidden">1/9</span>
              <span className="hidden sm:inline">天気：晴れ 15℃</span>
              <span className="sm:hidden">☀15℃</span>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="hover:text-yellow-600">
                ログイン
              </a>
              <a href="#" className="hover:text-yellow-600 hidden sm:inline">
                会員登録
              </a>
            </div>
          </div>

          {/* Main header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-2 sm:space-y-0">
            <h1 className="text-2xl sm:text-4xl font-bold">
              <span className="text-white bg-yellow-500 px-2 py-1">8番</span>
              <span className="text-black ml-2">ニュース</span>
            </h1>
            <div className="text-left sm:text-right text-sm text-gray-500">
              <p className="font-medium">ステップ {currentStep}/8</p>
              <p className="hidden sm:block">信頼できる地域情報をお届け</p>
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="border-t border-gray-200">
            <div className="flex space-x-4 sm:space-x-8 py-3 overflow-x-auto scrollbar-hide">
              <Link
                href="/"
                className="text-gray-700 hover:text-yellow-600 font-medium whitespace-nowrap"
              >
                トップ
              </Link>
              <a
                href="#"
                className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                政治
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                経済
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                社会
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                スポーツ
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                文化
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                地域
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                天気
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="lg:flex lg:gap-8 space-y-6 lg:space-y-0">
          {/* Main content */}
          <div className="lg:flex-1 lg:max-w-4xl">
            {article.isAnomaly && article.anomalyPlugins ? (
              <AnomalyEffect plugins={article.anomalyPlugins}>
                <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                  <header className="mb-4 sm:mb-6 lg:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {article.title}
                    </h1>
                    <div className="text-gray-600 border-b pb-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                          <time
                            dateTime={article.publishDate}
                            className="text-sm sm:text-base"
                          >
                            {new Date(article.publishDate).toLocaleDateString(
                              "ja-JP",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </time>
                          <span className="text-sm text-gray-500">
                            記者：田中 太郎
                          </span>
                        </div>
                        <div className="flex space-x-2 text-sm">
                          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs sm:text-sm">
                            地域
                          </span>
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs sm:text-sm">
                            行政
                          </span>
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="text-gray-800 leading-relaxed">
                    <ReactMarkdown
                      components={{
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-2xl font-bold text-black underline decoration-yellow-500 decoration-2 mb-4 mt-6"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-3 mt-5"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            className="text-gray-800 leading-relaxed mb-4"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc list-inside mb-4 space-y-1 ml-4"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="text-gray-800" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-semibold" {...props} />
                        ),
                        img: ({ node, ...props }) => (
                          <img
                            className="w-full max-w-3xl mx-auto rounded-lg shadow-md my-6 sm:my-8 block"
                            {...props}
                          />
                        ),
                        em: ({ node, ...props }) => (
                          <span
                            className="block text-sm text-gray-600 text-center mt-2 mb-6 italic"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {article.content}
                    </ReactMarkdown>
                  </div>

                  {article.imageUrl && (
                    <div className="my-8">
                      <img
                        src={article.imageUrl}
                        alt="記事の画像"
                        className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </article>
              </AnomalyEffect>
            ) : (
              <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <header className="mb-4 sm:mb-6 lg:mb-8">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {article.title}
                  </h1>
                  <div className="text-gray-600 border-b pb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <time
                          dateTime={article.publishDate}
                          className="text-sm sm:text-base"
                        >
                          {new Date(article.publishDate).toLocaleDateString(
                            "ja-JP",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </time>
                        <span className="text-sm text-gray-500">
                          記者：田中 太郎
                        </span>
                      </div>
                      <div className="flex space-x-2 text-sm">
                        <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs sm:text-sm">
                          地域
                        </span>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs sm:text-sm">
                          行政
                        </span>
                      </div>
                    </div>
                  </div>
                </header>

                <div className="text-gray-800 leading-relaxed">
                  <ReactMarkdown
                    components={{
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-2xl font-bold text-black underline decoration-yellow-500 decoration-2 mb-4 mt-6"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-3 mt-5"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-gray-800 leading-relaxed mb-4"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-inside mb-4 space-y-1 ml-4"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-gray-800" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold" {...props} />
                      ),
                      img: ({ node, ...props }) => (
                        <img
                          className="w-full max-w-3xl mx-auto rounded-lg shadow-md my-6 sm:my-8 block"
                          {...props}
                        />
                      ),
                      em: ({ node, ...props }) => (
                        <span
                          className="block text-sm text-gray-600 text-center mt-2 mb-6 italic"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>

                {article.imageUrl && (
                  <div className="my-8">
                    <img
                      src={article.imageUrl}
                      alt="記事の画像"
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </article>
            )}

            {/* 記事フッター */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 text-sm text-gray-600 mb-6">
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center space-x-1 hover:text-yellow-600">
                    <span>📧</span>
                    <span className="hidden sm:inline">記事をメールで送る</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-yellow-600">
                    <span>📱</span>
                    <span className="hidden sm:inline">SNSでシェア</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-yellow-600">
                    <span>🔖</span>
                    <span className="hidden sm:inline">ブックマーク</span>
                  </button>
                </div>
                <div className="flex space-x-4">
                  <span>👍 12</span>
                  <span>💬 3</span>
                </div>
              </div>
            </div>

            {/* ナビゲーションボタン */}
            <nav className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
              <Link
                href={`/articles/${step}?clicked=prev`}
                className="inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                前の記事へ
              </Link>

              <Link
                href={`/articles/${step}?clicked=next`}
                className="inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm sm:text-base"
              >
                次の記事へ
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </nav>
          </div>

          {/* サイドバー */}
          <aside className="lg:w-80 space-y-4 lg:space-y-6">
            {/* 人気記事 */}
            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
              <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">
                人気記事
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-0 lg:space-y-3">
                {[
                  {
                    title: "市内で新しい商業施設の建設計画が発表される",
                    time: "1時間前",
                  },
                  { title: "地域住民参加の清掃活動が大盛況", time: "2時間前" },
                  { title: "市役所が新サービスの導入を検討", time: "4時間前" },
                  {
                    title: "地域企業の技術革新が注目を集める",
                    time: "6時間前",
                  },
                  { title: "季節のイベント準備が本格化", time: "8時間前" },
                ].map((article, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block hover:bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-600 font-bold text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="text-xs lg:text-sm font-medium line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.time}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* カテゴリー */}
            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
              <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">
                カテゴリー
              </h3>
              <div className="space-y-2">
                {[
                  "政治",
                  "経済",
                  "社会",
                  "スポーツ",
                  "文化",
                  "地域",
                  "国際",
                  "科学",
                ].map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="flex justify-between items-center py-2 hover:bg-gray-50 rounded px-2"
                  >
                    <span className="text-sm">{cat}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {Math.floor(Math.random() * 20) + 5}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* 広告風 */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 lg:p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">
                地域企業からのお知らせ
              </p>
              <div className="mt-2 p-3 bg-white rounded border">
                <p className="text-xs text-gray-600">株式会社8番システムズ</p>
                <p className="text-sm font-medium mt-1">
                  新サービス開始のお知らせ
                </p>
              </div>
            </div>

            {/* 天気 */}
            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
              <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">
                今日の天気
              </h3>
              <div className="text-center">
                <p className="text-2xl mb-2">☀️</p>
                <p className="font-bold text-xl">15°C</p>
                <p className="text-sm text-gray-600">晴れ時々曇り</p>
                <p className="text-xs text-gray-500 mt-2">降水確率: 10%</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                ニュース
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    速報
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    政治
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    経済
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    社会
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                地域情報
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    イベント
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    お知らせ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    施設案内
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    交通情報
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                サービス
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    会員登録
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    広告掲載
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    RSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                8番ニュースについて
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    会社概要
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    プライバシーポリシー
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    採用情報
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-4 sm:pt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              &copy; 2025 8番ニュース. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1 sm:mt-2">
              本サイトはゲーム用の架空のニュースサイトです
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
