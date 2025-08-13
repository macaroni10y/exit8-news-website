import Link from 'next/link';

export default function ClearPage() {
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
            <h1 className="text-2xl sm:text-4xl font-bold">
              <span className="text-white bg-yellow-500 px-2 py-1">8番</span>
              <span className="text-black ml-2">ニュース</span>
            </h1>
            <div className="text-left sm:text-right text-sm text-gray-500">
              <p className="font-medium text-green-600">ゲームクリア！</p>
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
        <div className="lg:flex lg:gap-8 space-y-6 lg:space-y-0">
          {/* メインコンテンツ */}
          <div className="lg:flex-1 lg:max-w-4xl">
            <article className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
              <header className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  本サイトで一連の異変現象を確認 読者の協力により解決
                </h1>
                <div className="text-gray-600 border-b pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                      <time dateTime="2025-01-09" className="text-sm sm:text-base">
                        2025年1月9日（木）
                      </time>
                      <span className="text-sm text-gray-500">記者：編集部</span>
                    </div>
                    <div className="flex space-x-2 text-sm">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs sm:text-sm">お知らせ</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs sm:text-sm">システム</span>
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">編集部より</h3>
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
            
            {/* 下部のニュース風コンテンツ */}
            <div className="mt-8 sm:mt-12">
              <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 border-b pb-2">関連ニュース</h3>
                <div className="space-y-2 sm:space-y-3">
                  <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <p className="text-sm sm:text-base font-medium text-gray-800">システム改善により読みやすさが向上</p>
                    <p className="text-xs text-gray-500 mt-1">1時間前</p>
                  </a>
                  <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <p className="text-sm sm:text-base font-medium text-gray-800">8番ニュースの信頼性向上への取り組み</p>
                    <p className="text-xs text-gray-500 mt-1">3時間前</p>
                  </a>
                  <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <p className="text-sm sm:text-base font-medium text-gray-800">読者アンケート結果について</p>
                    <p className="text-xs text-gray-500 mt-1">6時間前</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* サイドバー */}
          <aside className="lg:w-80 space-y-4 lg:space-y-6">
            {/* 人気記事 */}
            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
              <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">人気記事</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-0 lg:space-y-3">
                {[
                  { title: "市内で新しい商業施設の建設計画が発表される", time: "1時間前" },
                  { title: "地域住民参加の清掃活動が大盛況", time: "2時間前" },
                  { title: "市役所が新サービスの導入を検討", time: "4時間前" },
                  { title: "地域企業の技術革新が注目を集める", time: "6時間前" },
                  { title: "季節のイベント準備が本格化", time: "8時間前" }
                ].map((article, i) => (
                  <a key={i} href="#" className="block hover:bg-gray-50 p-2 rounded">
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-600 font-bold text-sm">{i + 1}</span>
                      <div>
                        <h4 className="text-xs lg:text-sm font-medium line-clamp-2">{article.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{article.time}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {/* カテゴリー */}
            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
              <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">カテゴリー</h3>
              <div className="space-y-2">
                {['政治', '経済', '社会', 'スポーツ', '文化', '地域', '国際', '科学'].map((cat) => (
                  <a key={cat} href="#" className="flex justify-between items-center py-2 hover:bg-gray-50 rounded px-2">
                    <span className="text-sm">{cat}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{Math.floor(Math.random() * 20) + 5}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* 広告風 */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 lg:p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">地域企業からのお知らせ</p>
              <div className="mt-2 p-3 bg-white rounded border">
                <p className="text-xs text-gray-600">株式会社8番システムズ</p>
                <p className="text-sm font-medium mt-1">新サービス開始のお知らせ</p>
              </div>
            </div>
            
            {/* 天気 */}
            <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
              <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">今日の天気</h3>
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