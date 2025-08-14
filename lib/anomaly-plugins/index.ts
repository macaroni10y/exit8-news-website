// Export anomaly plugins

export { AnomalyEngine, anomalyEngine } from "./AnomalyEngine";
export { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";
export { ImageSwapPlugin } from "./ImageSwapPlugin";
export { LayoutCollapsePlugin } from "./LayoutCollapsePlugin";
export { PeriodRemovalPlugin } from "./PeriodRemovalPlugin";
export { ReverseScrollPlugin } from "./ReverseScrollPlugin";
export { TextCorruptionPlugin } from "./TextCorruptionPlugin";

// Automatic plugin registration
import { anomalyEngine } from "./AnomalyEngine";
import { ImageSwapPlugin } from "./ImageSwapPlugin";
import { LayoutCollapsePlugin } from "./LayoutCollapsePlugin";
import { PeriodRemovalPlugin } from "./PeriodRemovalPlugin";
import { ReverseScrollPlugin } from "./ReverseScrollPlugin";
import { TextCorruptionPlugin } from "./TextCorruptionPlugin";

// Automatically register available plugins
export function registerAllPlugins(): void {
  anomalyEngine.registerPlugin(LayoutCollapsePlugin);
  anomalyEngine.registerPlugin(ImageSwapPlugin);
  anomalyEngine.registerPlugin(TextCorruptionPlugin);
  anomalyEngine.registerPlugin(PeriodRemovalPlugin);
  anomalyEngine.registerPlugin(ReverseScrollPlugin);
}

// Register all plugins by default
registerAllPlugins();
