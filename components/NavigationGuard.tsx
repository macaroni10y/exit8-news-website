'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function NavigationGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // ブラウザバック/フォワードの検出
    const handlePopState = (event: PopStateEvent) => {
      // ハッシュのみの変更は無視
      const currentUrl = window.location.href;
      const previousUrl = document.referrer;
      
      // URLのパス部分が変わっていない場合（ハッシュのみの変更）は無視
      if (window.location.pathname === pathname) {
        return;
      }
      
      // 記事ページでのブラウザバック/フォワードを検出
      if (pathname.startsWith('/articles/')) {
        console.log('Browser navigation detected - redirecting to step 1');
        // ブラウザの履歴操作を検出したらステップ1に戻す
        router.replace('/articles/1');
      }
    };

    // ページ離脱前の警告
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pathname.startsWith('/articles/') && pathname !== '/articles/1') {
        event.preventDefault();
        event.returnValue = 'ゲーム中です。ページを離れると最初からやり直しになります。';
      }
    };

    // イベントリスナーの登録
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 履歴スタックに現在のページを追加（ブラウザバック検出用）
    window.history.pushState({ page: pathname }, '', pathname);

    // クリーンアップ
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, router]);

  return null;
}