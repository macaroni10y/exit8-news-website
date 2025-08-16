import { cookies } from "next/headers";
import Link from "next/link";
import { AnomalyEffect } from "@/components/AnomalyEffect";
import { ArticleContent } from "@/components/ArticleContent";
import { ArticleFooter } from "@/components/ArticleFooter";
import { ArticleSideBar } from "@/components/ArticleSideBar";
import { DummyLinkPreventer } from "@/components/DummyLinkPreventer";
import { NavigationGuard } from "@/components/NavigationGuard";
import { NavigationMenu } from "@/components/NavigationMenu";
import { PageFooter } from "@/components/PageFooter";
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
          <NavigationMenu />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        {article.isAnomaly && article.anomalyPlugins ? (
          <AnomalyEffect plugins={article.anomalyPlugins}>
            <div className="lg:flex lg:gap-8 space-y-6 lg:space-y-0">
              {/* Main content */}
              <div className="lg:flex-1 lg:max-w-4xl">
                <ArticleContent article={article} />
                <ArticleFooter />
                {/* Navigation Buttons */}
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
              <ArticleSideBar />
            </div>
          </AnomalyEffect>
        ) : (
          <div className="lg:flex lg:gap-8 space-y-6 lg:space-y-0">
            {/* Main content */}
            <div className="lg:flex-1 lg:max-w-4xl">
              <ArticleContent article={article} />
              <ArticleFooter />
              {/* Navigation Buttons */}
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
            <ArticleSideBar />
          </div>
        )}
      </main>
      <PageFooter />
    </div>
  );
}
