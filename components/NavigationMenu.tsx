import Link from "next/link";

export function NavigationMenu() {
  return (
    <nav className="border-t border-gray-200">
      <div className="flex space-x-4 sm:space-x-8 py-3 overflow-x-auto scrollbar-hide">
        <Link
          href="/"
          className="text-gray-700 hover:text-yellow-600 font-medium whitespace-nowrap"
        >
          トップ
        </Link>
        <a
          href="#"
          className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
        >
          政治
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
        >
          経済
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
        >
          社会
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
        >
          スポーツ
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
        >
          文化
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
        >
          地域
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-yellow-600 whitespace-nowrap"
        >
          天気
        </a>
      </div>
    </nav>
  );
}
