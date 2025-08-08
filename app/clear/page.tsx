import Link from 'next/link';

export default function ClearPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">8番ニュース</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              おめでとうございます！
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              8回連続で正解し、ゲームをクリアしました！
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              ゲームクリア！
            </h3>
            <p className="text-green-700 mb-4">
              異変を見抜く力が試されるニュースゲームを見事にクリアしました。
              細かな変化にも気づける集中力と観察力が素晴らしいですね！
            </p>
            <div className="text-lg font-semibold text-green-800">
              達成: 8/8 正解
            </div>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors mr-4"
            >
              もう一度プレイする
            </Link>
            
            <Link 
              href="/"
              className="inline-block border border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 8番ニュース. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}