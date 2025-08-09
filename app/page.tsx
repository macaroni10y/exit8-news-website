import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* トップナビゲーション */}
          <div className="flex justify-between items-center py-2 text-sm text-gray-600">
            <div className="flex space-x-4">
              <span>2025年1月9日（木）</span>
              <span>天気：晴れ 15℃</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-600">ログイン</a>
              <a href="#" className="hover:text-red-600">会員登録</a>
            </div>
          </div>
          
          {/* メインヘッダー */}
          <div className="flex justify-between items-center py-4">
            <h1 className="text-4xl font-bold text-red-600">8番ニュース</h1>
            <div className="text-right text-sm text-gray-500">
              <p>信頼できる地域情報をお届け</p>
            </div>
          </div>
          
          {/* ナビゲーションメニュー */}
          <nav className="border-t border-gray-200">
            <div className="flex space-x-8 py-3">
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium">トップ</a>
              <a href="#" className="text-gray-700 hover:text-red-600">政治</a>
              <a href="#" className="text-gray-700 hover:text-red-600">経済</a>
              <a href="#" className="text-gray-700 hover:text-red-600">社会</a>
              <a href="#" className="text-gray-700 hover:text-red-600">スポーツ</a>
              <a href="#" className="text-gray-700 hover:text-red-600">文化</a>
              <a href="#" className="text-gray-700 hover:text-red-600">地域</a>
              <a href="#" className="text-gray-700 hover:text-red-600">天気</a>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 速報エリア */}
        <div className="mb-8">
          <div className="bg-red-600 text-white px-4 py-2 inline-block font-bold text-sm">速報</div>
          <div className="bg-white border border-t-0 p-4 shadow-sm">
            <p className="text-lg">市内で新しい地域活性化プロジェクトが発表されました</p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* メインコンテンツ */}
          <div className="flex-1">
            <div className="text-center bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                8番出口ニュースゲーム
              </h2>
          
              <div className="max-w-2xl mx-auto mb-12 text-left">
                <h3 className="text-xl font-semibold mb-4">ゲームの遊び方</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">1.</span>
                    <span>ニュース記事を読んで、異変があるかどうかを判定します</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">2.</span>
                    <span>異変があれば「←前の記事へ」、無ければ「次の記事へ→」を選択</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">3.</span>
                    <span>8回連続で正解するとクリア！不正解の場合は最初からやり直し</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">4.</span>
                    <span>記事の文章が変わったり、レイアウトが崩れたりする異変に注意</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href="/articles/1"
                className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
              >
                ゲームを開始する
              </Link>
            </div>
            
            {/* ニュース一覧 */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border">
              <div className="border-b p-4">
                <h3 className="text-xl font-bold">最新ニュース</h3>
              </div>
              <div className="divide-y">
                {[
                  { title: "地域活性化に向けた新たな取り組みが始動", time: "2時間前", category: "政策" },
                  { title: "新しい図書館が来春オープン予定", time: "4時間前", category: "文化" },
                  { title: "市内交通システムの改善計画が発表", time: "6時間前", category: "行政" },
                  { title: "地域イベント「夏祭り2025」の準備が本格化", time: "8時間前", category: "イベント" }
                ].map((news, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <a href="#" className="text-lg font-medium hover:text-red-600 line-clamp-2">{news.title}</a>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{news.time}</span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">{news.category}</span>
                        </div>
                      </div>
                      <div className="ml-4 w-20 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* サイドバー */}
          <aside className="w-80 space-y-6">
            {/* 人気記事 */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">人気記事</h3>
              <div className="space-y-3">
                {[1,2,3,4,5].map((i) => (
                  <a key={i} href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <div className="flex items-start space-x-3">
                      <span className="text-red-600 font-bold">{i}</span>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2">市内で新しい商業施設の建設計画が発表される</h4>
                        <p className="text-xs text-gray-500 mt-1">1時間前</p>
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
                <p className="text-xs text-gray-600">株式会社地域サービス</p>
                <p className="text-sm font-medium mt-1">新サービス開始のお知らせ</p>
              </div>
            </div>
          </aside>
        </div>
          
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">ニュース</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gray-300">速報</a></li>
                <li><a href="#" className="hover:text-gray-300">政治</a></li>
                <li><a href="#" className="hover:text-gray-300">経済</a></li>
                <li><a href="#" className="hover:text-gray-300">社会</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">地域情報</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gray-300">イベント</a></li>
                <li><a href="#" className="hover:text-gray-300">お知らせ</a></li>
                <li><a href="#" className="hover:text-gray-300">施設案内</a></li>
                <li><a href="#" className="hover:text-gray-300">交通情報</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">サービス</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gray-300">会員登録</a></li>
                <li><a href="#" className="hover:text-gray-300">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-gray-300">広告掲載</a></li>
                <li><a href="#" className="hover:text-gray-300">RSS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">8番ニュースについて</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gray-300">会社概要</a></li>
                <li><a href="#" className="hover:text-gray-300">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-gray-300">利用規約</a></li>
                <li><a href="#" className="hover:text-gray-300">採用情報</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-6 text-center">
            <p className="text-sm text-gray-400">&copy; 2025 8番ニュース. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-2">本サイトはゲーム用の架空のニュースサイトです</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
