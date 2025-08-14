import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Period Removal Anomaly Plugin
 * Instantly removes only periods (。) from article text
 */
export class PeriodRemovalPlugin extends BaseAnomalyPlugin {
  private originalTexts: Map<Text, string> = new Map();
  private textNodes: Text[] = [];

  get id(): string {
    return "period-removal";
  }

  get description(): string {
    return "Anomaly that removes periods (。) from article text";
  }

  async execute(element: HTMLElement): Promise<void> {
    // Collect all text nodes
    this.collectTextNodes(element);

    // Save original text
    this.textNodes.forEach((node) => {
      this.originalTexts.set(node, node.textContent || "");
    });

    // Remove periods immediately
    this.removePeriods();
  }

  /**
   * Collect text nodes
   */
  private collectTextNodes(element: HTMLElement): void {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Exclude text nodes with only whitespace
        if (node.textContent && node.textContent.trim().length > 0) {
          // Exclude text inside script and style tags
          const parent = node.parentElement;
          if (
            parent &&
            parent.tagName !== "SCRIPT" &&
            parent.tagName !== "STYLE"
          ) {
            return NodeFilter.FILTER_ACCEPT;
          }
        }
        return NodeFilter.FILTER_REJECT;
      },
    });

    this.textNodes = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      this.textNodes.push(node as Text);
    }
  }

  /**
   * Remove periods
   */
  private removePeriods(): void {
    this.textNodes.forEach((node) => {
      const currentText = node.textContent || "";
      // Remove only "。" (maintain other punctuation)
      const modifiedText = currentText.replace(/。/g, "　");
      node.textContent = modifiedText;
    });
  }

  cleanup(): void {
    // Restore original text
    this.originalTexts.forEach((originalText, node) => {
      if (node.parentNode) {
        // Only if node is still in DOM
        node.textContent = originalText;
      }
    });

    // Clear data
    this.originalTexts.clear();
    this.textNodes = [];
  }
}
