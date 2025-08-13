import Link from "next/link";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-yellow-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* トップナビゲーション */}
          <div className="flex justify-between items-center py-2 text-xs sm:text-sm text-gray-600">
            <div className="flex space-x-2 sm:space-x-4">
              <span className="hidden sm:inline">2025年1月9日（木）</span>
              <span className="sm:hidden">1/9</span>
              <span className="hidden sm:inline">天気：晴れ 15℃</span>
              <span className="sm:hidden">☀15℃</span>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="hover:text-yellow-600">ログイン</a>
              <a href="#" className="hover:text-yellow-600 hidden sm:inline">会員登録</a>
            </div>
          </div>
          
          {/* メインヘッダー */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-2 sm:space-y-0">
            <Link href="/" className="text-2xl sm:text-4xl font-bold">
              <span className="text-white bg-yellow-500 hover:bg-yellow-600 px-2 py-1">8番</span>
              <span className="text-black hover:text-gray-800 ml-2">ニュース</span>
            </Link>
            <div className="text-left sm:text-right text-sm text-gray-500">
              <p className="hidden sm:block">信頼できる地域情報をお届け</p>
            </div>
          </div>
          
          {/* ナビゲーションメニュー */}
          <nav className="border-t border-gray-200">
            <div className="flex space-x-4 sm:space-x-8 py-3 overflow-x-auto scrollbar-hide">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium whitespace-nowrap">トップ</Link>
              <a href="#" className="text-gray-700 hover:text-yellow-600 whitespace-nowrap">政治</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 whitespace-nowrap">経済</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 whitespace-nowrap">社会</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 whitespace-nowrap">スポーツ</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 whitespace-nowrap">文化</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 whitespace-nowrap">地域</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 whitespace-nowrap">天気</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            重要な注意事項
          </h1>

          <div className="space-y-8 text-gray-700">
            {/* ゲームについて */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">このサイトについて</h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  「8番ニュース」は、人気ゲーム「8番出口」をオマージュしたブラウザゲームです。
                  <strong>実在するニュースサイトではなく、ゲーム専用に制作された架空のウェブサイトです。</strong>
                </p>
                <p>
                  掲載されている記事、画像、人名、団体名などの情報は全て<strong>フィクション</strong>であり、
                  実在の人物・団体・事件とは一切関係ありません。
                </p>
              </div>
            </section>

            {/* 技術的制約について */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">技術的な制約と仕様について</h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  ゲーム性を実現するため、以下の点で一般的なウェブサイトとは異なる動作をします：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>記事ページへの直接アクセスが制限されています</li>
                  <li>ブラウザの戻るボタンやページ更新が適切に動作しない場合があります</li>
                  <li>一部のリンクはゲーム進行のために無効化されています</li>
                  <li>記事の表示中に意図的な「異変」が発生する場合があります</li>
                  <li>JavaScriptが無効な環境では正常に動作しません</li>
                </ul>
              </div>
            </section>

            {/* プライバシーについて */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">データの取り扱いについて</h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  このサイトでは、ゲーム進行状態の保存のためにCookieを使用しています。
                  個人を特定できる情報は一切収集していません。
                </p>
                <p>
                  ゲーム進行データは一定時間後に自動的に削除されます。
                </p>
              </div>
            </section>

            {/* 免責事項 */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">免責事項</h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  このサイトは娯楽目的で制作されています。
                  サイトの利用により生じたいかなる損害についても、制作者は一切の責任を負いません。
                </p>
                <p>
                  予告なくサービスの変更・停止を行う場合があります。
                </p>
              </div>
            </section>

            {/* 著作権について */}
            <section>
              <h2 className="text-xl font-semibold text-black underline decoration-yellow-500 decoration-2 mb-4">著作権について</h2>
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  このサイトのコンテンツは、オリジナルゲーム「8番出口」にインスパイアされて制作されています。
                  オリジナル作品の著作権は原作者に帰属します。
                </p>
              </div>
            </section>
          </div>

          {/* 戻るボタン */}
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

      <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">ニュース</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-gray-300">速報</a></li>
                <li><a href="#" className="hover:text-gray-300">政治</a></li>
                <li><a href="#" className="hover:text-gray-300">経済</a></li>
                <li><a href="#" className="hover:text-gray-300">社会</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">地域情報</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-gray-300">イベント</a></li>
                <li><a href="#" className="hover:text-gray-300">お知らせ</a></li>
                <li><a href="#" className="hover:text-gray-300">施設案内</a></li>
                <li><a href="#" className="hover:text-gray-300">交通情報</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">サービス</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-gray-300">会員登録</a></li>
                <li><a href="#" className="hover:text-gray-300">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-gray-300">広告掲載</a></li>
                <li><a href="#" className="hover:text-gray-300">RSS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">8番ニュースについて</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-gray-300">会社概要</a></li>
                <li><a href="#" className="hover:text-gray-300">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-gray-300">利用規約</a></li>
                <li><Link href="/disclaimer" className="hover:text-gray-300">注意事項</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-4 sm:pt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-400">&copy; 2025 8番ニュース. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-1 sm:mt-2">本サイトはゲーム用の架空のニュースサイトです</p>
          </div>
        </div>
      </footer>
    </div>
  );
}