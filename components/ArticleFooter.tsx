export function ArticleFooter() {
  return (
    <div className="mt-8 pt-6 border-t border-gray-300">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 text-sm text-gray-600 mb-6">
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center space-x-1 hover:text-yellow-600">
            <span>📧</span>
            <span className="hidden sm:inline">記事をメールで送る</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-yellow-600">
            <span>📱</span>
            <span className="hidden sm:inline">SNSでシェア</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-yellow-600">
            <span>🔖</span>
            <span className="hidden sm:inline">ブックマーク</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <span>👍 12</span>
          <span>💬 3</span>
        </div>
      </div>
    </div>
  );
}
