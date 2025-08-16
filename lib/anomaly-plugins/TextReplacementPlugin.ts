import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Text Replacement Anomaly Plugin
 * Replaces specific text patterns in the article with alternative text
 */
export class TextReplacementPlugin extends BaseAnomalyPlugin {
  private originalTexts: Map<Text, string> = new Map();
  private textNodes: Text[] = [];

  get id(): string {
    return "text-replacement";
  }

  get description(): string {
    return "Anomaly that replaces specific text patterns with alternative text";
  }

  async execute(element: HTMLElement): Promise<void> {
    // Collect all text nodes
    this.collectTextNodes(element);

    // Save original text
    this.textNodes.forEach((node) => {
      this.originalTexts.set(node, node.textContent || "");
    });

    // Apply text replacements
    this.applyReplacements();
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
   * Apply text replacements based on configuration
   */
  private applyReplacements(): void {
    // Get replacement configuration from config
    const replacements = this.config.config?.replacements || [];
    const replaceAll = this.config.config?.replaceAll !== false; // Default to true
    const caseSensitive = this.config.config?.caseSensitive !== false; // Default to true

    this.textNodes.forEach((node) => {
      let currentText = node.textContent || "";

      // Apply each replacement rule
      for (const replacement of replacements) {
        const { from, to } = replacement;
        if (!from || !to) continue;

        if (replaceAll) {
          // Replace all occurrences
          if (caseSensitive) {
            currentText = currentText.split(from).join(to);
          } else {
            // Case-insensitive replacement
            const regex = new RegExp(
              from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              "gi",
            );
            currentText = currentText.replace(regex, to);
          }
        } else {
          // Replace only first occurrence
          if (caseSensitive) {
            const index = currentText.indexOf(from);
            if (index !== -1) {
              currentText =
                currentText.slice(0, index) +
                to +
                currentText.slice(index + from.length);
            }
          } else {
            // Case-insensitive first replacement
            const regex = new RegExp(
              from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              "i",
            );
            currentText = currentText.replace(regex, to);
          }
        }
      }

      node.textContent = currentText;
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
