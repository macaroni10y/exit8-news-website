// Export anomaly plugins

export { AnomalyEngine, anomalyEngine } from "./AnomalyEngine";
export { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";
export { ImageSwapPlugin } from "./ImageSwapPlugin";
export { LayoutCollapsePlugin } from "./LayoutCollapsePlugin";
export { PeriodRemovalPlugin } from "./PeriodRemovalPlugin";
export { ReverseScrollPlugin } from "./ReverseScrollPlugin";
export { ScrollVanishPlugin } from "./ScrollVanishPlugin";
export { TextCorruptionPlugin } from "./TextCorruptionPlugin";
export { TextReplacementPlugin } from "./TextReplacementPlugin";
export { TitleAnomalyPlugin } from "./TitleAnomalyPlugin";

// Automatic plugin registration
import { anomalyEngine } from "./AnomalyEngine";
import { ImageSwapPlugin } from "./ImageSwapPlugin";
import { LayoutCollapsePlugin } from "./LayoutCollapsePlugin";
import { PeriodRemovalPlugin } from "./PeriodRemovalPlugin";
import { ReverseScrollPlugin } from "./ReverseScrollPlugin";
import { ScrollVanishPlugin } from "./ScrollVanishPlugin";
import { TextCorruptionPlugin } from "./TextCorruptionPlugin";
import { TextReplacementPlugin } from "./TextReplacementPlugin";
import { TitleAnomalyPlugin } from "./TitleAnomalyPlugin";

// Automatically register available plugins
export function registerAllPlugins(): void {
  anomalyEngine.registerPlugin(LayoutCollapsePlugin);
  anomalyEngine.registerPlugin(ImageSwapPlugin);
  anomalyEngine.registerPlugin(TextCorruptionPlugin);
  anomalyEngine.registerPlugin(PeriodRemovalPlugin);
  anomalyEngine.registerPlugin(ReverseScrollPlugin);
  anomalyEngine.registerPlugin(ScrollVanishPlugin);
  anomalyEngine.registerPlugin(TitleAnomalyPlugin);
  anomalyEngine.registerPlugin(TextReplacementPlugin);
}

// Register all plugins by default
registerAllPlugins();
