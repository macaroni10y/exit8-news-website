import Link from 'next/link';

export default function ClearPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-red-600 shadow-sm">
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
              <a href="#" className="hover:text-red-600">ログイン</a>
              <a href="#" className="hover:text-red-600 hidden sm:inline">会員登録</a>
            </div>
          </div>
          
          {/* メインヘッダー */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 space-y-2 sm:space-y-0">
            <h1 className="text-2xl sm:text-4xl font-bold text-red-600">8番ニュース</h1>
            <div className="text-left sm:text-right text-sm text-gray-500">
              <p className="font-medium text-green-600">ゲームクリア！</p>
              <p className="hidden sm:block">信頼できる地域情報をお届け</p>
            </div>
          </div>
          
          {/* ナビゲーションメニュー */}
          <nav className="border-t border-gray-200">
            <div className="flex space-x-4 sm:space-x-8 py-3 overflow-x-auto scrollbar-hide">
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium whitespace-nowrap">トップ</a>
              <a href="#" className="text-gray-700 hover:text-red-600 whitespace-nowrap">政治</a>
              <a href="#" className="text-gray-700 hover:text-red-600 whitespace-nowrap">経済</a>
              <a href="#" className="text-gray-700 hover:text-red-600 whitespace-nowrap">社会</a>
              <a href="#" className="text-gray-700 hover:text-red-600 whitespace-nowrap">スポーツ</a>
              <a href="#" className="text-gray-700 hover:text-red-600 whitespace-nowrap">文化</a>
              <a href="#" className="text-gray-700 hover:text-red-600 whitespace-nowrap">地域</a>
              <a href="#" className="text-gray-700 hover:text-red-600 whitespace-nowrap">天気</a>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-16">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">🎉</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                おめでとうございます！
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
                8回連続で正解し、ゲームをクリアしました！
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-3 sm:mb-4">
                ゲームクリア！
              </h3>
              <p className="text-sm sm:text-base text-green-700 mb-3 sm:mb-4">
                異変を見抜く力が試されるニュースゲームを見事にクリアしました。
                細かな変化にも気づける集中力と観察力が素晴らしいですね！
              </p>
              <div className="text-base sm:text-lg font-semibold text-green-800">
                達成: 8/8 正解
              </div>
            </div>
            
            {/* 特別記事風のセクション */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-left max-w-3xl mx-auto">
              <div className="border-l-4 border-green-600 pl-4 mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">特別報道</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  あなたは見事に全ての異変を見抜き、正しい判断を下しました。
                  この観察力は本物のニュース編集者にも匹敵するものです。
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="bg-white rounded p-3 sm:p-4 border">
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">100%</p>
                  <p className="text-xs sm:text-sm text-gray-500">正解率</p>
                </div>
                <div className="bg-white rounded p-3 sm:p-4 border">
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">8回</p>
                  <p className="text-xs sm:text-sm text-gray-500">連続正解</p>
                </div>
                <div className="bg-white rounded p-3 sm:p-4 border">
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">完璧</p>
                  <p className="text-xs sm:text-sm text-gray-500">観察力</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link 
                href="/"
                className="inline-block bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                もう一度プレイする
              </Link>
              
              <Link 
                href="/"
                className="inline-block border border-green-600 text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-50 transition-colors"
              >
                トップページに戻る
              </Link>
            </div>
          </div>
        </div>
        
        {/* 下部のニュース風コンテンツ */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 border-b pb-2">関連ニュース</h3>
            <div className="space-y-2 sm:space-y-3">
              <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                <p className="text-sm sm:text-base font-medium text-gray-800">新しいゲームモードが近日公開予定</p>
                <p className="text-xs text-gray-500 mt-1">2時間前</p>
              </a>
              <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                <p className="text-sm sm:text-base font-medium text-gray-800">異変パターンに新種類が追加</p>
                <p className="text-xs text-gray-500 mt-1">5時間前</p>
              </a>
              <a href="#" className="block hover:bg-gray-50 p-2 rounded">
                <p className="text-sm sm:text-base font-medium text-gray-800">プレイヤー数が過去最高を記録</p>
                <p className="text-xs text-gray-500 mt-1">1日前</p>
              </a>
            </div>
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