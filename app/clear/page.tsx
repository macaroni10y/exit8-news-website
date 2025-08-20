import Link from "next/link";
import { ArticleSideBar } from "@/components/ArticleSideBar";
import { NavigationMenu } from "@/components/NavigationMenu";
import { PageFooter } from "@/components/PageFooter";

export default function ClearPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-yellow-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top navigation */}
          <div className="flex justify-between items-center py-2 text-xs sm:text-sm text-gray-600">
            <div className="flex space-x-2 sm:space-x-4">
              <span className="hidden sm:inline">2025年1月16日（木）</span>
              <span className="sm:hidden">1/16</span>
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
              <p className="font-medium text-green-600">ゲームクリア！</p>
              <p className="hidden sm:block">信頼できる地域情報をお届け</p>
            </div>
          </div>
          <NavigationMenu />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="lg:flex lg:gap-8 space-y-6 lg:space-y-0">
          {/* Main content */}
          <div className="lg:flex-1 lg:max-w-4xl">
            <article className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
              <header className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  本サイトで一連の異変現象を確認 読者の協力により解決
                </h1>
                <div className="text-gray-600 border-b pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                      <time
                        dateTime="2025-01-09"
                        className="text-sm sm:text-base"
                      >
                        2025年1月16日（木）
                      </time>
                      <span className="text-sm text-gray-500">
                        記者：編集部
                      </span>
                    </div>
                    <div className="flex space-x-2 text-sm">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs sm:text-sm">
                        お知らせ
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs sm:text-sm">
                        システム
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              <div className="text-gray-800 leading-relaxed space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg">
                  本日、8番ニュースのウェブサイトにおいて、複数の記事で異変現象が発生していたことが判明した。異変は記事内容の微細な変化として現れ、通常では気づきにくいものであったが、当サイトの読者の方々の優れた観察力により迅速に発見・報告された。
                </p>

                <p>
                  システム担当者によると、「読者の皆様の鋭い観察眼のおかげで、すべての異変を特定し正常な状態に復旧することができました」とのこと。異変は画像の入れ替わりや文章の微細な変更など、様々な形で現れていたという。
                </p>

                <p>
                  編集長は「今回の件で、地域の情報を正確に伝えることの重要性と、読者の皆様との信頼関係の大切さを改めて実感しました。読者の方々の協力なくしては、このような迅速な対応は不可能でした」とコメントしている。
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 sm:p-6 my-6 sm:my-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    編集部より
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    この度は、サイトの異変を発見し報告いただいた読者の皆様に心より感謝申し上げます。皆様の日頃からの注意深い閲覧により、8番ニュースの信頼性を保つことができております。今後ともより正確で信頼できる地域情報の提供に努めてまいります。
                  </p>
                </div>

                <p>
                  現在、サイトは正常に動作しており、すべての記事が本来の状態に復旧している。編集部では再発防止に向けてシステムの点検・改善を進めており、読者の皆様には引き続き安心してサイトをご利用いただけるよう取り組んでいく方針だ。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <Link
                  href="/"
                  className="inline-block bg-yellow-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  最新記事を読む
                </Link>

                <Link
                  href="/"
                  className="inline-block border border-yellow-500 text-yellow-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-yellow-50 transition-colors"
                >
                  トップページへ
                </Link>
              </div>
            </article>

            {/* Bottom news-style content */}
            <div className="mt-8 sm:mt-12">
              <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 border-b pb-2">
                  関連ニュース
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <p className="text-sm sm:text-base font-medium text-gray-800">
                      システム改善により読みやすさが向上
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1時間前</p>
                  </a>
                  <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <p className="text-sm sm:text-base font-medium text-gray-800">
                      8番ニュースの信頼性向上への取り組み
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3時間前</p>
                  </a>
                  <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <p className="text-sm sm:text-base font-medium text-gray-800">
                      読者アンケート結果について
                    </p>
                    <p className="text-xs text-gray-500 mt-1">6時間前</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <ArticleSideBar />
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
