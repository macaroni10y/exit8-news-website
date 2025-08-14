// 異変プラグインのエクスポート
export { BaseAnomalyPlugin } from './BaseAnomalyPlugin';
export { AnomalyEngine, anomalyEngine } from './AnomalyEngine';
export { LayoutCollapsePlugin } from './LayoutCollapsePlugin';
export { ImageSwapPlugin } from './ImageSwapPlugin';
export { TextCorruptionPlugin } from './TextCorruptionPlugin';
export { PeriodRemovalPlugin } from './PeriodRemovalPlugin';

// プラグイン自動登録
import { anomalyEngine } from './AnomalyEngine';
import { LayoutCollapsePlugin } from './LayoutCollapsePlugin';
import { ImageSwapPlugin } from './ImageSwapPlugin';
import { TextCorruptionPlugin } from './TextCorruptionPlugin';
import { PeriodRemovalPlugin } from './PeriodRemovalPlugin';

// 利用可能なプラグインを自動登録
export function registerAllPlugins(): void {
  anomalyEngine.registerPlugin(LayoutCollapsePlugin);
  anomalyEngine.registerPlugin(ImageSwapPlugin);
  anomalyEngine.registerPlugin(TextCorruptionPlugin);
  anomalyEngine.registerPlugin(PeriodRemovalPlugin);
}

// デフォルトで全プラグインを登録
registerAllPlugins();