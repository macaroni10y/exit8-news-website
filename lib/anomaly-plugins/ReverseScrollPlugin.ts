import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Reverse Scroll Anomaly Plugin
 * Looks normal but scroll operations are reversed
 */
export class ReverseScrollPlugin extends BaseAnomalyPlugin {
  private isScrollReversed: boolean = false;
  private wheelHandler: (e: WheelEvent) => void;
  private touchStartY: number = 0;
  private touchHandler: (e: TouchEvent) => void;
  private touchMoveHandler: (e: TouchEvent) => void;
  private keyHandler: (e: KeyboardEvent) => void;

  constructor(config: any) {
    super(config);

    this.wheelHandler = (e: WheelEvent) => {
      if (this.isScrollReversed) {
        e.preventDefault();
        window.scrollBy(0, -e.deltaY);
      }
    };

    this.touchHandler = (e: TouchEvent) => {
      if (this.isScrollReversed && e.touches.length === 1) {
        this.touchStartY = e.touches[0].clientY;
      }
    };

    this.touchMoveHandler = (e: TouchEvent) => {
      if (this.isScrollReversed && e.touches.length === 1) {
        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const deltaY = this.touchStartY - touchY;
        window.scrollBy(0, -deltaY);
        this.touchStartY = touchY;
      }
    };

    this.keyHandler = (e: KeyboardEvent) => {
      if (this.isScrollReversed) {
        const scrollAmount = 40; // Normal scroll amount
        const pageScrollAmount = window.innerHeight * 0.8; // Page scroll amount

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            window.scrollBy(0, -scrollAmount);
            break;
          case "ArrowUp":
            e.preventDefault();
            window.scrollBy(0, scrollAmount);
            break;
          case "PageDown":
            e.preventDefault();
            window.scrollBy(0, -pageScrollAmount);
            break;
          case "PageUp":
            e.preventDefault();
            window.scrollBy(0, pageScrollAmount);
            break;
          case "End":
            e.preventDefault();
            window.scrollTo(0, 0);
            break;
          case "Home":
            e.preventDefault();
            window.scrollTo(0, document.body.scrollHeight);
            break;
        }
      }
    };
  }

  get id(): string {
    return "reverse-scroll";
  }

  get description(): string {
    return "Anomaly that reverses scroll operations (looks normal visually)";
  }

  async execute(element: HTMLElement): Promise<void> {
    const {
      intensity = "full",
      duration,
      visualFeedback = false,
    } = this.config.config;

    if (this.isScrollReversed) {
      return;
    }

    this.isScrollReversed = true;

    // Add wheel event listener
    window.addEventListener("wheel", this.wheelHandler, { passive: false });

    // Add touch event listeners (mobile support)
    window.addEventListener("touchstart", this.touchHandler, {
      passive: false,
    });
    window.addEventListener("touchmove", this.touchMoveHandler, {
      passive: false,
    });

    // Add keyboard event listener (arrow key support)
    window.addEventListener("keydown", this.keyHandler, { passive: false });

    // Add subtle effect if visual feedback is enabled
    if (visualFeedback) {
      this.applyStyles(element, {
        filter: "hue-rotate(180deg)",
        transition: "filter 0.3s ease",
      });
    }

    // If duration is specified, revert after certain time
    if (duration) {
      this.timeoutId = window.setTimeout(() => {
        this.cleanup();
      }, duration);
    }

    console.log(`ReverseScrollPlugin activated with intensity: ${intensity}`);
  }

  cleanup(): void {
    if (!this.isScrollReversed) {
      return;
    }

    this.isScrollReversed = false;

    // Remove event listeners
    window.removeEventListener("wheel", this.wheelHandler);
    window.removeEventListener("touchstart", this.touchHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);
    window.removeEventListener("keydown", this.keyHandler);

    // Reset visual effects
    if (this.element) {
      this.applyStyles(this.element, {
        filter: "",
        transition: "",
      });
    }

    console.log("ReverseScrollPlugin cleanup completed");
  }
}
