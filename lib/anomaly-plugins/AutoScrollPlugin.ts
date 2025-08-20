import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Auto Scroll Anomaly Plugin
 * Makes the page slowly scroll down automatically
 */
export class AutoScrollPlugin extends BaseAnomalyPlugin {
  private scrollIntervalId: number | null = null;
  private isScrolling: boolean = false;
  private animationFrameId: number | null = null;

  get id(): string {
    return "auto-scroll";
  }

  get description(): string {
    return "Anomaly that makes the page slowly scroll down automatically";
  }

  async execute(): Promise<void> {
    const {
      speed = 0.5,
      duration,
      smoothness = true,
      stopAtBottom = true,
    } = this.config.config;

    if (this.isScrolling) {
      return;
    }

    this.isScrolling = true;

    if (smoothness) {
      const smoothScroll = () => {
        if (!this.isScrolling) {
          return;
        }

        const currentScroll = window.pageYOffset;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (stopAtBottom && currentScroll >= maxScroll) {
          this.cleanup();
          return;
        }

        window.scrollBy({
          top: speed,
          behavior: "auto",
        });

        this.animationFrameId = requestAnimationFrame(smoothScroll);
      };

      this.animationFrameId = requestAnimationFrame(smoothScroll);
    } else {
      this.scrollIntervalId = window.setInterval(() => {
        if (!this.isScrolling) {
          return;
        }

        const currentScroll = window.pageYOffset;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (stopAtBottom && currentScroll >= maxScroll) {
          this.cleanup();
          return;
        }

        window.scrollBy(0, speed * 10);
      }, 50);
    }

    if (duration) {
      this.timeoutId = window.setTimeout(() => {
        this.cleanup();
      }, duration);
    }

    console.log(`AutoScrollPlugin activated with speed: ${speed}`);
  }

  cleanup(): void {
    if (!this.isScrolling) {
      return;
    }

    this.isScrolling = false;

    if (this.scrollIntervalId !== null) {
      clearInterval(this.scrollIntervalId);
      this.scrollIntervalId = null;
    }

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    console.log("AutoScrollPlugin cleanup completed");
  }
}
