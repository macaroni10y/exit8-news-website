import { BaseAnomalyPlugin } from './BaseAnomalyPlugin';
import { AnomalyPluginConfig } from '../types';

/**
 * 異変プラグインの管理・実行エンジン
 */
export class AnomalyEngine {
  private plugins: Map<string, typeof BaseAnomalyPlugin> = new Map();
  private activeInstances: BaseAnomalyPlugin[] = [];

  /**
   * プラグインを登録する
   * @param PluginClass プラグインクラス
   */
  registerPlugin(PluginClass: typeof BaseAnomalyPlugin): void {
    // プラグインインスタンスを作成して ID を取得
    const tempInstance = new (PluginClass as any)({
      id: '',
      trigger: 'immediate' as const,
      config: {}
    });
    
    this.plugins.set(tempInstance.id, PluginClass);
  }

  /**
   * 登録されているプラグイン一覧を取得
   */
  getAvailablePlugins(): string[] {
    return Array.from(this.plugins.keys());
  }

  /**
   * プラグインが登録されているかチェック
   * @param pluginId プラグインID
   */
  hasPlugin(pluginId: string): boolean {
    return this.plugins.has(pluginId);
  }

  /**
   * 異変を実行する
   * @param configs プラグイン設定配列
   * @param targetElement 対象要素
   */
  async executeAnomalies(
    configs: AnomalyPluginConfig[],
    targetElement: HTMLElement
  ): Promise<void> {
    // 既存のアクティブなインスタンスをクリーンアップ
    this.cleanup();

    // 各プラグインを実行
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
   * 特定のプラグインインスタンスを取得
   * @param pluginId プラグインID
   */
  getInstance(pluginId: string): BaseAnomalyPlugin | null {
    return this.activeInstances.find(instance => instance.id === pluginId) || null;
  }

  /**
   * すべてのアクティブなプラグインをクリーンアップ
   */
  cleanup(): void {
    this.activeInstances.forEach(instance => {
      try {
        instance.destroy();
      } catch (error) {
        console.error('Error during plugin cleanup:', error);
      }
    });
    this.activeInstances = [];
  }

  /**
   * エンジンを破棄
   */
  destroy(): void {
    this.cleanup();
    this.plugins.clear();
  }
}

// グローバルエンジンインスタンス
export const anomalyEngine = new AnomalyEngine();