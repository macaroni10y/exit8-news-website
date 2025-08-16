export function ArticleSideBar() {
  return (
    <aside className="lg:w-80 space-y-4 lg:space-y-6">
      {/* 人気記事 */}
      <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
        <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">
          人気記事
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-0 lg:space-y-3">
          {[
            {
              title: "市内で新しい商業施設の建設計画が発表される",
              time: "1時間前",
            },
            {
              title: "地域住民参加の清掃活動が大盛況",
              time: "2時間前",
            },
            {
              title: "市役所が新サービスの導入を検討",
              time: "4時間前",
            },
            {
              title: "地域企業の技術革新が注目を集める",
              time: "6時間前",
            },
            { title: "季節のイベント準備が本格化", time: "8時間前" },
          ].map((article, i) => (
            <a key={i} href="#" className="block hover:bg-gray-50 p-2 rounded">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-600 font-bold text-sm">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-xs lg:text-sm font-medium line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{article.time}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* カテゴリー */}
      <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
        <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">
          カテゴリー
        </h3>
        <div className="space-y-2">
          {[
            "政治",
            "経済",
            "社会",
            "スポーツ",
            "文化",
            "地域",
            "国際",
            "科学",
          ].map((cat) => (
            <a
              key={cat}
              href="#"
              className="flex justify-between items-center py-2 hover:bg-gray-50 rounded px-2"
            >
              <span className="text-sm">{cat}</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {Math.floor(Math.random() * 20) + 5}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 広告風 */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 lg:p-4 text-center">
        <p className="text-sm text-blue-600 font-medium">
          地域企業からのお知らせ
        </p>
        <div className="mt-2 p-3 bg-white rounded border">
          <p className="text-xs text-gray-600">株式会社8番システムズ</p>
          <p className="text-sm font-medium mt-1">新サービス開始のお知らせ</p>
        </div>
      </div>

      {/* 天気 */}
      <div className="bg-white rounded-lg shadow-sm border p-3 lg:p-4">
        <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 border-b pb-2">
          今日の天気
        </h3>
        <div className="text-center">
          <p className="text-2xl mb-2">☀️</p>
          <p className="font-bold text-xl">15°C</p>
          <p className="text-sm text-gray-600">晴れ時々曇り</p>
          <p className="text-xs text-gray-500 mt-2">降水確率: 10%</p>
        </div>
      </div>
    </aside>
  );
}
