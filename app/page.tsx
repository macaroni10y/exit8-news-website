import Link from "next/link";

export default function Home() {
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
              <a href="https://github.com/macaroni10y/exit8-news-website" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="ml-1 hidden sm:inline">GitHub</span>
              </a>
              <a href="#" className="hover:text-yellow-600">ログイン</a>
              <a href="#" className="hover:text-yellow-600 hidden sm:inline">会員登録</a>
            </div>
          </div>
          
          {/* メインヘッダー */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-2 sm:space-y-0">
            <h1 className="text-2xl sm:text-4xl font-bold">
              <span className="text-white bg-yellow-500 px-2 py-1">8番</span>
              <span className="text-black ml-2">ニュース</span>
            </h1>
            <div className="text-left sm:text-right text-sm text-gray-500">
              <p className="hidden sm:block">信頼できる地域情報をお届け</p>
            </div>
          </div>
          
          {/* ナビゲーションメニュー */}
          <nav className="border-t border-gray-200">
            <div className="flex space-x-4 sm:space-x-8 py-3 overflow-x-auto scrollbar-hide">
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium whitespace-nowrap">トップ</a>
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
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8">
        {/* 速報エリア */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-yellow-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 inline-block font-bold text-xs sm:text-sm">速報</div>
          <div className="bg-white border border-t-0 p-3 sm:p-4 shadow-sm">
            <p className="text-sm sm:text-base lg:text-lg">市内で新しい地域活性化プロジェクトが発表されました</p>
          </div>
        </div>

        <div className="lg:flex lg:gap-8 space-y-6 lg:space-y-0">
          {/* メインコンテンツ */}
          <div className="lg:flex-1">
            <div className="text-center bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
                8番ニュース
              </h2>
          
              <div className="max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-12 text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">ゲームの遊び方</h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">1.</span>
                    <span>ニュース記事を読んで、異変を見逃さないこと</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">2.</span>
                    <span>異変があれば「←前の記事へ」、無ければ「次の記事へ→」を選択すること</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">3.</span>
                    <span>8回連続で正解するとクリア。不正解の場合は最初からやり直し</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-4 sm:mb-6 text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  ※ ゲームをプレイする前に
                  <Link href="/disclaimer" className="text-yellow-600 hover:text-yellow-700 underline ml-1">
                    注意事項
                  </Link>
                  をご確認ください
                </p>
              </div>
              
              <Link 
                href="/articles/1"
                className="inline-block bg-yellow-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                ゲームを開始する
              </Link>
            </div>
            
            {/* ニュース一覧 */}
            <div className="mt-4 sm:mt-6 lg:mt-8 bg-white rounded-lg shadow-sm border">
              <div className="border-b p-3 sm:p-4">
                <h3 className="text-lg sm:text-xl font-bold">最新ニュース</h3>
              </div>
              <div className="divide-y">
                {[
                  { title: "地域活性化に向けた新たな取り組みが始動", time: "2時間前", category: "政策" },
                  { title: "新しい図書館が来春オープン予定", time: "4時間前", category: "文化" },
                  { title: "市内交通システムの改善計画が発表", time: "6時間前", category: "行政" },
                  { title: "地域イベント「夏祭り2025」の準備が本格化", time: "8時間前", category: "イベント" }
                ].map((news, i) => (
                  <div key={i} className="p-3 sm:p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <a href="#" className="text-sm sm:text-base lg:text-lg font-medium hover:text-yellow-600 line-clamp-2">{news.title}</a>
                        <div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                          <span>{news.time}</span>
                          <span className="bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">{news.category}</span>
                        </div>
                      </div>
                      <div className="ml-3 sm:ml-4 w-16 sm:w-20 h-12 sm:h-16 bg-gray-200 rounded flex-shrink-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* サイドバー */}
          <aside className="hidden lg:block lg:w-80 space-y-4 lg:space-y-6">
            {/* 人気記事 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">人気記事</h3>
              <div className="space-y-3">
                {[
                  { title: "市内で新しい商業施設の建設計画が発表される", time: "1時間前" },
                  { title: "地域住民参加の清掃活動が大盛況", time: "2時間前" },
                  { title: "市役所が新サービスの導入を検討", time: "4時間前" },
                  { title: "地域企業の技術革新が注目を集める", time: "6時間前" },
                  { title: "季節のイベント準備が本格化", time: "8時間前" }
                ].map((article, i) => (
                  <a key={i} href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-600 font-bold">{i + 1}</span>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2">{article.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{article.time}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* 天気 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">今日の天気</h3>
              <div className="text-center">
                <p className="text-2xl mb-2">☀️</p>
                <p className="font-bold text-xl">15°C</p>
                <p className="text-sm text-gray-600">晴れ時々曇り</p>
                <p className="text-xs text-gray-500 mt-2">降水確率: 10%</p>
              </div>
            </div>
            
            {/* 広告風 */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">地域企業からのお知らせ</p>
              <div className="mt-2 p-3 bg-white rounded border">
                <p className="text-xs text-gray-600">株式会社8番システムズ</p>
                <p className="text-sm font-medium mt-1">新サービス開始のお知らせ</p>
              </div>
            </div>
          </aside>
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
                <li><a href="#" className="hover:text-gray-300">採用情報</a></li>
                <li>
                  <a href="https://github.com/macaroni10y/exit8-news-website" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </li>
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
