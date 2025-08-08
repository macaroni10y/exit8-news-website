import Link from 'next/link';
import { cookies } from 'next/headers';
import { ARTICLES } from '@/lib/constants';
import { verifyToken } from '@/lib/jwt';

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
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">8番ニュース</h1>
          <p className="text-blue-100 mt-1">ステップ {currentStep}/8</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
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
      </main>
      
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 8番ニュース. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}