import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Layout Collapse Anomaly Plugin
 * Collapses layout by rotating, moving, and resizing elements
 */
export class LayoutCollapsePlugin extends BaseAnomalyPlugin {
  private originalStyles: Map<HTMLElement, { [key: string]: string }> =
    new Map();

  get id(): string {
    return "layout-collapse";
  }

  get description(): string {
    return "Anomaly that gradually collapses article layout";
  }

  async execute(element: HTMLElement): Promise<void> {
    // Add styles to enable CSS transitions
    const style = document.createElement("style");
    style.textContent = `
      .anomaly-layout-collapse * {
        transition: transform 2s ease-in-out, 
                   font-size 1s ease-in-out, 
                   color 1.5s ease-in-out,
                   letter-spacing 1s ease-in-out !important;
      }
      
      .anomaly-title-glitch {
        transform: rotate(-5deg) translateX(20px) !important;
        color: #ff6b6b !important;
        font-size: 1.2em !important;
      }
      
      .anomaly-content-shift {
        transform: translateX(-15px) rotate(1deg) !important;
        letter-spacing: 0.1em !important;
      }
      
      .anomaly-paragraph-distort {
        transform: skew(-2deg) !important;
        color: #4ecdc4 !important;
      }
      
      .anomaly-date-scramble {
        transform: rotate(3deg) scale(0.8) !important;
        color: #95e1d3 !important;
      }
    `;
    document.head.appendChild(style);

    // Add class to main container
    element.classList.add("anomaly-layout-collapse");

    // Collapse layout gradually
    await this.collapseTitle(element);
    await this.wait(500);
    await this.shiftContent(element);
    await this.wait(500);
    await this.distortParagraphs(element);
    await this.wait(500);
    await this.scrambleMetadata(element);
  }

  /**
   * Distort titles
   */
  private async collapseTitle(element: HTMLElement): Promise<void> {
    const titles = element.querySelectorAll("h1, h2, h3");
    titles.forEach((title) => {
      if (title instanceof HTMLElement) {
        this.saveOriginalStyle(title);
        title.classList.add("anomaly-title-glitch");
      }
    });
  }

  /**
   * Shift content
   */
  private async shiftContent(element: HTMLElement): Promise<void> {
    const contentDivs = element.querySelectorAll("div");
    contentDivs.forEach((div, index) => {
      if (div instanceof HTMLElement && index % 2 === 0) {
        this.saveOriginalStyle(div);
        div.classList.add("anomaly-content-shift");
      }
    });
  }

  /**
   * Distort paragraphs
   */
  private async distortParagraphs(element: HTMLElement): Promise<void> {
    const paragraphs = element.querySelectorAll("p");
    paragraphs.forEach((p, index) => {
      if (p instanceof HTMLElement && index % 2 === 1) {
        this.saveOriginalStyle(p);
        p.classList.add("anomaly-paragraph-distort");
      }
    });
  }

  /**
   * Scramble metadata (dates etc.)
   */
  private async scrambleMetadata(element: HTMLElement): Promise<void> {
    const timeElements = element.querySelectorAll("time");
    const metaElements = element.querySelectorAll(".text-gray-600");

    [...timeElements, ...metaElements].forEach((el) => {
      if (el instanceof HTMLElement) {
        this.saveOriginalStyle(el);
        el.classList.add("anomaly-date-scramble");
      }
    });
  }

  /**
   * Save original style
   */
  private saveOriginalStyle(element: HTMLElement): void {
    if (!this.originalStyles.has(element)) {
      const computedStyle = window.getComputedStyle(element);
      this.originalStyles.set(element, {
        transform: element.style.transform || computedStyle.transform,
        fontSize: element.style.fontSize || computedStyle.fontSize,
        color: element.style.color || computedStyle.color,
        letterSpacing:
          element.style.letterSpacing || computedStyle.letterSpacing,
      });
    }
  }

  /**
   * Wait for specified time
   */
  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  cleanup(): void {
    if (!this.element) return;

    // Remove added classes
    this.element.classList.remove("anomaly-layout-collapse");

    // Remove anomaly classes from child elements
    const anomalyElements = this.element.querySelectorAll(
      ".anomaly-title-glitch, .anomaly-content-shift, .anomaly-paragraph-distort, .anomaly-date-scramble",
    );

    anomalyElements.forEach((el) => {
      el.classList.remove(
        "anomaly-title-glitch",
        "anomaly-content-shift",
        "anomaly-paragraph-distort",
        "anomaly-date-scramble",
      );
    });

    // Restore original styles
    this.originalStyles.forEach((originalStyle, element) => {
      Object.assign(element.style, originalStyle);
    });
    this.originalStyles.clear();

    // Remove added style tags
    const styleElements = document.querySelectorAll("style");
    styleElements.forEach((style) => {
      if (style.textContent?.includes("anomaly-layout-collapse")) {
        style.remove();
      }
    });
  }
}
