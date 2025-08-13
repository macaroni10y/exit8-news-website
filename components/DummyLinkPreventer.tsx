'use client';

import { useEffect } from 'react';

export function DummyLinkPreventer() {
  useEffect(() => {
    // ダミーリンクのクリックを無効化
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // クリックされた要素またはその親要素がアンカータグか確認
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href') === '#') {
        // href="#"のリンクのクリックを無効化
        event.preventDefault();
        event.stopPropagation();
        console.log('Dummy link click prevented');
        return false;
      }
    };

    // キャプチャフェーズでイベントを捕捉（早期に処理）
    document.addEventListener('click', handleClick, true);

    // クリーンアップ
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return null;
}