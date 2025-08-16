import Link from "next/link";
import { NavigationMenu } from "@/components/NavigationMenu";
import { PageFooter } from "@/components/PageFooter";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50">
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
            <Link href="/" className="text-2xl sm:text-4xl font-bold">
              <span className="text-white bg-yellow-500 hover:bg-yellow-600 px-2 py-1">
                8番
              </span>
              <span className="text-black hover:text-gray-800 ml-2">
                ニュース
              </span>
            </Link>
            <div className="text-left sm:text-right text-sm text-gray-500">
              <p className="hidden sm:block">信頼できる地域情報をお届け</p>
            </div>
          </div>
          <NavigationMenu />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            重要な注意事項
          </h1>

          <div className="space-y-8 text-gray-700">
            {/* About the game */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">
                このサイトについて
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  「8番ニュース」は、人気ゲーム「8番出口」をオマージュしたブラウザゲームです。
                  実在するニュースサイトではなく、ゲーム専用に制作された架空のウェブサイトです。
                </p>
                <p>
                  掲載されている記事、画像、人名、団体名などの情報は全てフィクションであり、
                  実在の人物・団体・事件とは一切関係ありません。
                </p>
              </div>
            </section>

            {/* Technical constraints */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">
                技術的な制約と仕様について
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  ゲームの都合上、一般的なウェブサイトとは異なりアクセシビリティ等の各種標準やプラクティスから逸脱した動作をします。
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>記事ページへの直接アクセスが制限されています</li>
                  <li>
                    ブラウザの戻るボタンやページ更新が適切に動作しない場合があります
                  </li>
                  <li>一部のゲーム進行に無関係なリンクは無効化されています</li>
                  <li>
                    記事の表示中に意図的な「異変」が発生する場合があります
                  </li>
                  <li>JavaScriptが無効な環境では正常に動作しません</li>
                </ul>
              </div>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">
                データの取り扱いについて
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  このサイトでは、ゲーム進行状態の保存のために必要な最低限のCookieを使用しています。
                  個人を特定できる情報は一切収集していません。
                </p>
                <p>ゲーム進行データは一定時間後に自動的に削除されます。</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">
                免責事項
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  このサイトは娯楽目的で制作されています。
                  サイトの利用により生じたいかなる損害についても、制作者は一切の責任を負いません。
                </p>
                <p>予告なくサービスの変更・停止を行う場合があります。</p>
                <p>
                  本サイトの一部画像・文章は生成AI（OpenAI等）により生成されています。
                  これらは演出目的であり、現実の写真・事実を示すものではありません。
                </p>
              </div>
            </section>

            {/* Copyright */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">
                著作権について
              </h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  このサイトのコンテンツは、オリジナルゲーム「8番出口」にインスパイアされて制作されています。「8番出口」の権利者とは一切関係ありません。記載の名称・ロゴは各権利者に帰属します。
                  本サイトでの言及は説明目的であり、権利帰属や提携を示すものではありません。
                </p>
              </div>
            </section>
          </div>

          {/* Back button */}
          <div className="mt-10 text-center border-t pt-6">
            <Link
              href="/"
              className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
