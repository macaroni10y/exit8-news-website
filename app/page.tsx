import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">8番ニュース</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
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
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ゲームを開始する
          </Link>
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
