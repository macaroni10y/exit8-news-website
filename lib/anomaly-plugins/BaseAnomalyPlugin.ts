import { AnomalyPluginConfig } from '../types';

/**
 * 異変プラグインの基底抽象クラス
 */
export abstract class BaseAnomalyPlugin {
  protected config: AnomalyPluginConfig;
  protected element: HTMLElement | null = null;
  protected isActive: boolean = false;
  protected timeoutId: number | null = null;
  protected intervalId: number | null = null;

  constructor(config: AnomalyPluginConfig) {
    this.config = config;
  }

  /**
   * プラグインの一意ID
   */
  abstract get id(): string;

  /**
   * プラグインの説明
   */
  abstract get description(): string;

  /**
   * 異変を実行する
   * @param element 対象となるHTML要素
   */
  abstract execute(element: HTMLElement): Promise<void> | void;

  /**
   * 異変をクリーンアップする
   */
  abstract cleanup(): void;

  /**
   * プラグインを初期化する
   * @param element 対象となるHTML要素
   */
  async initialize(element: HTMLElement): Promise<void> {
    if (this.isActive) {
      this.cleanup();
    }

    this.element = element;
    this.isActive = true;

    // トリガーに応じて実行タイミングを制御
    switch (this.config.trigger) {
      case 'immediate':
        await this.execute(element);
        break;
      case 'time':
        const delay = this.config.delay || 3000;
        this.timeoutId = window.setTimeout(async () => {
          if (this.isActive) {
            await this.execute(element);
          }
        }, delay);
        break;
      case 'scroll':
        this.setupScrollTrigger(element);
        break;
    }
  }

  /**
   * スクロールトリガーを設定する
   * @param element 対象要素
   */
  protected setupScrollTrigger(element: HTMLElement): void {
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const breakPoint = this.config.config?.breakPoint || 0.5;
      
      // 要素が指定の位置に来たら実行
      if (rect.top <= viewportHeight * breakPoint && this.isActive) {
        this.execute(element);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
  }

  /**
   * プラグインを破棄する
   */
  destroy(): void {
    this.cleanup();
    
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isActive = false;
    this.element = null;
  }

  /**
   * CSS変更を適用するヘルパーメソッド
   * @param element 対象要素
   * @param styles CSSスタイル
   */
  protected applyStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
    Object.assign(element.style, styles);
  }

  /**
   * CSS クラスを追加するヘルパーメソッド
   * @param element 対象要素
   * @param className クラス名
   */
  protected addClass(element: HTMLElement, className: string): void {
    element.classList.add(className);
  }

  /**
   * CSS クラスを削除するヘルパーメソッド
   * @param element 対象要素
   * @param className クラス名
   */
  protected removeClass(element: HTMLElement, className: string): void {
    element.classList.remove(className);
  }
}