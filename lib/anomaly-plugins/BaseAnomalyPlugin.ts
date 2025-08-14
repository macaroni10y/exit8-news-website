import type { AnomalyPluginConfig } from "../types";

/**
 * Base abstract class for anomaly plugins
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
   * Unique plugin ID
   */
  abstract get id(): string;

  /**
   * Plugin description
   */
  abstract get description(): string;

  /**
   * Execute anomaly
   * @param element Target HTML element
   */
  abstract execute(element: HTMLElement): Promise<void> | void;

  /**
   * Clean up anomaly
   */
  abstract cleanup(): void;

  /**
   * Initialize plugin
   * @param element Target HTML element
   */
  async initialize(element: HTMLElement): Promise<void> {
    if (this.isActive) {
      this.cleanup();
    }

    this.element = element;
    this.isActive = true;

    // Control execution timing based on trigger
    switch (this.config.trigger) {
      case "immediate":
        await this.execute(element);
        break;
      case "time": {
        const delay = this.config.delay || 3000;
        this.timeoutId = window.setTimeout(async () => {
          if (this.isActive) {
            await this.execute(element);
          }
        }, delay);
        break;
      }
      case "scroll":
        this.setupScrollTrigger(element);
        break;
    }
  }

  /**
   * Set up scroll trigger
   * @param element Target element
   */
  protected setupScrollTrigger(element: HTMLElement): void {
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const breakPoint = this.config.config?.breakPoint || 0.5;

      // Execute when element reaches specified position
      if (rect.top <= viewportHeight * breakPoint && this.isActive) {
        this.execute(element);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }

  /**
   * Destroy plugin
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
   * Helper method to apply CSS changes
   * @param element Target element
   * @param styles CSS styles
   */
  protected applyStyles(
    element: HTMLElement,
    styles: Partial<CSSStyleDeclaration>,
  ): void {
    Object.assign(element.style, styles);
  }

  /**
   * Helper method to add CSS class
   * @param element Target element
   * @param className Class name
   */
  protected addClass(element: HTMLElement, className: string): void {
    element.classList.add(className);
  }

  /**
   * Helper method to remove CSS class
   * @param element Target element
   * @param className Class name
   */
  protected removeClass(element: HTMLElement, className: string): void {
    element.classList.remove(className);
  }
}
