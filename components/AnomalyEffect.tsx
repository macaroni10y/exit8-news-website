'use client';

import { useEffect, useRef } from 'react';
import { AnomalyPluginConfig } from '@/lib/types';
import { anomalyEngine } from '@/lib/anomaly-plugins/AnomalyEngine';
import { LayoutCollapsePlugin } from '@/lib/anomaly-plugins/LayoutCollapsePlugin';
import { ImageSwapPlugin } from '@/lib/anomaly-plugins/ImageSwapPlugin';
import { TextCorruptionPlugin } from '@/lib/anomaly-plugins/TextCorruptionPlugin';
import { ReverseScrollPlugin } from '@/lib/anomaly-plugins/ReverseScrollPlugin';

interface AnomalyEffectProps {
  plugins: AnomalyPluginConfig[];
  children: React.ReactNode;
}

/**
 * 汎用異変エフェクトコンポーネント
 * 子要素に対して指定された異変プラグインを適用する
 */
export function AnomalyEffect({ plugins, children }: AnomalyEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // プラグインを登録（初回のみ）
    if (!anomalyEngine.hasPlugin('layout-collapse')) {
      anomalyEngine.registerPlugin(LayoutCollapsePlugin);
    }
    if (!anomalyEngine.hasPlugin('image-swap')) {
      anomalyEngine.registerPlugin(ImageSwapPlugin);
    }
    if (!anomalyEngine.hasPlugin('text-corruption')) {
      anomalyEngine.registerPlugin(TextCorruptionPlugin);
    }
    if (!anomalyEngine.hasPlugin('reverse-scroll')) {
      anomalyEngine.registerPlugin(ReverseScrollPlugin);
    }

    // 異変を実行
    if (containerRef.current && plugins.length > 0) {
      anomalyEngine.executeAnomalies(plugins, containerRef.current);
    }

    // クリーンアップ
    return () => {
      anomalyEngine.cleanup();
    };
  }, [plugins]);

  // コンポーネントがアンマウントされる時のクリーンアップ
  useEffect(() => {
    return () => {
      anomalyEngine.cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className="anomaly-container">
      {children}
    </div>
  );
}