export function PageFooter() {
  return (
    <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              ニュース
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-gray-300">
                  速報
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  政治
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  経済
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  社会
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              地域情報
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-gray-300">
                  イベント
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  お知らせ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  施設案内
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  交通情報
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              サービス
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-gray-300">
                  会員登録
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  広告掲載
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  RSS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">
              8番ニュースについて
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-gray-300">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  利用規約
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  採用情報
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-400">2025 8番ニュース</p>
          <p className="text-xs text-gray-500 mt-1 sm:mt-2">
            本サイトはゲーム用の架空のニュースサイトです
          </p>
        </div>
      </div>
    </footer>
  );
}
