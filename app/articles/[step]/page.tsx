import Link from 'next/link';
import { cookies } from 'next/headers';
import { ARTICLES } from '@/lib/constants';
import { verifyToken } from '@/lib/jwt';
import { AnomalyEffect } from '@/components/AnomalyEffect';

interface PageProps {
  params: Promise<{ step: string }>;
  searchParams: Promise<{ clicked?: string }>;
}

export default async function ArticlePage({ params, searchParams }: PageProps) {
  const { step } = await params;
  const { clicked } = await searchParams;
  
  // 現在のステップを数値に変換
  const currentStep = parseInt(step, 10);
  
  // ステップが無効な場合はリダイレクト（実際の実装ではmiddlewareで処理）
  if (isNaN(currentStep) || currentStep < 1 || currentStep > 8) {
    return <div>Invalid step</div>;
  }
  
  // JWTから記事IDを取得
  const cookieStore = await cookies();
  const playToken = cookieStore.get('play')?.value;
  const payload = playToken ? await verifyToken(playToken) : null;
  
  if (!payload || !payload.currentArticleId) {
    return <div>Loading...</div>;
  }
  
  const article = ARTICLES.find(a => a.id === payload.currentArticleId);
  if (!article) {
    return <div>Article not found</div>;
  }
  
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
              <p>ステップ {currentStep}/8</p>
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
        <div className="flex gap-8">
          {/* メインコンテンツ */}
          <div className="flex-1 max-w-4xl">
        {article.isAnomaly && article.anomalyPlugins ? (
          <AnomalyEffect plugins={article.anomalyPlugins}>
            <article className="prose prose-lg max-w-none">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>
                <div className="text-gray-600 border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <time dateTime={article.publishDate}>
                        {new Date(article.publishDate).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="ml-4 text-sm">記者：田中 太郎</span>
                    </div>
                    <div className="flex space-x-2 text-sm">
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded">地域</span>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">行政</span>
                    </div>
                  </div>
                </div>
              </header>
              
              <div className="text-gray-800 leading-relaxed space-y-4">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {article.imageUrl && (
                <div className="my-8">
                  <img 
                    src={article.imageUrl} 
                    alt="記事の画像"
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </article>
          </AnomalyEffect>
        ) : (
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              <div className="text-gray-600 border-b pb-4">
                <time dateTime={article.publishDate}>
                  {new Date(article.publishDate).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>
            
            <div className="text-gray-800 leading-relaxed space-y-4">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {article.imageUrl && (
              <div className="my-8">
                <img 
                  src={article.imageUrl} 
                  alt="記事の画像"
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </article>
        )}
        
        {/* 記事フッター */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 hover:text-red-600">
                <span>📧</span><span>記事をメールで送る</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-red-600">
                <span>📱</span><span>SNSでシェア</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-red-600">
                <span>🔖</span><span>ブックマーク</span>
              </button>
            </div>
            <div className="flex space-x-2">
              <span>👍 12</span>
              <span>💬 3</span>
            </div>
          </div>
        </div>
        
        {/* ナビゲーションボタン */}
        <nav className="flex justify-between mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/articles/${step}?clicked=prev`}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            前の記事へ
          </Link>
          
          <Link
            href={`/articles/${step}?clicked=next`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            次の記事へ
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </nav>
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
            
            {/* カテゴリー */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">カテゴリー</h3>
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
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 font-medium">地域企業からのお知らせ</p>
              <div className="mt-2 p-3 bg-white rounded border">
                <p className="text-xs text-gray-600">株式会社地域サービス</p>
                <p className="text-sm font-medium mt-1">新サービス開始のお知らせ</p>
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