import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Scroll Vanish Anomaly Plugin
 * Elements disappear when they scroll past the top of the viewport
 */
export class ScrollVanishPlugin extends BaseAnomalyPlugin {
  private observer: IntersectionObserver | null = null;
  private vanishedElements: Map<Element, string> = new Map();

  get id(): string {
    return "scroll-vanish";
  }

  get description(): string {
    return "Elements vanish when scrolled past the top of viewport";
  }

  async execute(element: HTMLElement): Promise<void> {
    const {
      vanishType = "hide",
      targetElements = "p, h2, h3, img, ul, ol, blockquote, .content-section",
      threshold = 0,
      transition = true,
    } = this.config.config || {};

    const targets = element.querySelectorAll(targetElements);

    if (transition) {
      targets.forEach((target) => {
        (target as HTMLElement).style.transition = "opacity 0.3s ease-out";
      });
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;

          if (rect.bottom < 0 && rect.top < 0) {
            const targetElement = entry.target as HTMLElement;

            if (!this.vanishedElements.has(targetElement)) {
              this.vanishedElements.set(
                targetElement,
                targetElement.style.cssText,
              );

              if (vanishType === "remove") {
                targetElement.style.display = "none";
                targetElement.style.visibility = "hidden";
                targetElement.style.opacity = "0";
                targetElement.style.height = "0";
                targetElement.style.margin = "0";
                targetElement.style.padding = "0";
                targetElement.style.overflow = "hidden";
              } else {
                if (transition) {
                  targetElement.style.opacity = "0";
                  setTimeout(() => {
                    targetElement.style.visibility = "hidden";
                    targetElement.style.pointerEvents = "none";
                  }, 300);
                } else {
                  targetElement.style.visibility = "hidden";
                  targetElement.style.opacity = "0";
                  targetElement.style.pointerEvents = "none";
                }
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [threshold],
      },
    );

    targets.forEach((target) => {
      this.observer?.observe(target);
    });

    console.log(
      `ScrollVanishPlugin activated: ${targets.length} elements being monitored`,
    );
  }

  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.vanishedElements.forEach((originalStyle, element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.cssText = originalStyle;
    });

    this.vanishedElements.clear();

    console.log("ScrollVanishPlugin cleanup completed");
  }
}
