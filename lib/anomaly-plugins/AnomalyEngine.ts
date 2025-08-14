import type { AnomalyPluginConfig } from "../types";
import type { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Anomaly plugin management and execution engine
 */
export class AnomalyEngine {
  private plugins: Map<string, typeof BaseAnomalyPlugin> = new Map();
  private activeInstances: BaseAnomalyPlugin[] = [];

  /**
   * Register a plugin
   * @param PluginClass Plugin class
   */
  registerPlugin(PluginClass: typeof BaseAnomalyPlugin): void {
    // Create plugin instance to get ID
    const tempInstance = new (PluginClass as any)({
      id: "",
      trigger: "immediate" as const,
      config: {},
    });

    this.plugins.set(tempInstance.id, PluginClass);
  }

  /**
   * Get list of registered plugins
   */
  getAvailablePlugins(): string[] {
    return Array.from(this.plugins.keys());
  }

  /**
   * Check if plugin is registered
   * @param pluginId Plugin ID
   */
  hasPlugin(pluginId: string): boolean {
    return this.plugins.has(pluginId);
  }

  /**
   * Execute anomalies
   * @param configs Plugin configuration array
   * @param targetElement Target element
   */
  async executeAnomalies(
    configs: AnomalyPluginConfig[],
    targetElement: HTMLElement,
  ): Promise<void> {
    // Clean up existing active instances
    this.cleanup();

    // Execute each plugin
    for (const config of configs) {
      const PluginClass = this.plugins.get(config.id);

      if (!PluginClass) {
        console.warn(`Unknown anomaly plugin: ${config.id}`);
        continue;
      }

      try {
        const instance = new (PluginClass as any)(config);
        this.activeInstances.push(instance);
        await instance.initialize(targetElement);
      } catch (error) {
        console.error(`Failed to execute anomaly plugin ${config.id}:`, error);
      }
    }
  }

  /**
   * Get specific plugin instance
   * @param pluginId Plugin ID
   */
  getInstance(pluginId: string): BaseAnomalyPlugin | null {
    return (
      this.activeInstances.find((instance) => instance.id === pluginId) || null
    );
  }

  /**
   * Clean up all active plugins
   */
  cleanup(): void {
    this.activeInstances.forEach((instance) => {
      try {
        instance.destroy();
      } catch (error) {
        console.error("Error during plugin cleanup:", error);
      }
    });
    this.activeInstances = [];
  }

  /**
   * Destroy engine
   */
  destroy(): void {
    this.cleanup();
    this.plugins.clear();
  }
}

export const anomalyEngine = new AnomalyEngine();
