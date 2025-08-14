import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Text Corruption Anomaly Plugin
 * Article text becomes corrupted character by character randomly
 */
export class TextCorruptionPlugin extends BaseAnomalyPlugin {
  private originalTexts: Map<Text, string> = new Map();
  private corruptionLevel: number = 0;
  private textNodes: Text[] = [];

  // Corruption character patterns (simplified and subtle)
  private readonly corruptionPatterns = {
    level1: [
      "ぁ",
      "ぃ",
      "ぅ",
      "ぇ",
      "ぉ",
      "ゃ",
      "ゅ",
      "ょ",
      "ゎ",
      "ヮ",
      "ヵ",
      "ヶ",
      "っ",
      "ッ",
    ],
    level2: ["○", "●", "□", "■", "△", "▲"],
    level3: ["░", "▒", "・", "‥", "…", "※"],
  };

  get id(): string {
    return "text-corruption";
  }

  get description(): string {
    return "Anomaly where article text corrupts character by character";
  }

  async execute(element: HTMLElement): Promise<void> {
    // Collect all text nodes
    this.collectTextNodes(element);

    // Save original text
    this.textNodes.forEach((node) => {
      this.originalTexts.set(node, node.textContent || "");
    });

    // Progress corruption gradually
    this.startCorruption();
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
   * Start corruption
   */
  private startCorruption(): void {
    // Progress corruption every 500ms
    this.intervalId = window.setInterval(() => {
      this.corruptionLevel++;
      this.applyCorruption();

      // Complete corruption at level 12
      if (this.corruptionLevel >= 12) {
        if (this.intervalId !== null) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    }, 500);
  }

  /**
   * Apply corruption
   */
  private applyCorruption(): void {
    const corruptionRate = Math.min(this.corruptionLevel * 8, 100); // Maximum 100%

    this.textNodes.forEach((node) => {
      const originalText = this.originalTexts.get(node) || "";
      if (!originalText) return;

      const chars = originalText.split("");
      const corruptedChars = chars.map((char, _index) => {
        // Don't corrupt whitespace characters
        if (/\s/.test(char)) return char;

        // Transform character based on corruption probability
        if (Math.random() * 100 < corruptionRate) {
          return this.getCorruptedChar(char, this.corruptionLevel);
        }
        return char;
      });

      node.textContent = corruptedChars.join("");
    });
  }

  /**
   * Get corrupted character
   */
  private getCorruptedChar(_originalChar: string, level: number): string {
    // Select corruption pattern based on level (simplified to 3 stages)
    let pattern: string[];

    if (level <= 4) {
      pattern = this.corruptionPatterns.level1;
    } else if (level <= 8) {
      pattern = this.corruptionPatterns.level2;
    } else {
      pattern = this.corruptionPatterns.level3;
    }

    // Select corruption character randomly
    return pattern[Math.floor(Math.random() * pattern.length)];
  }

  cleanup(): void {
    // Clear interval
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

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
    this.corruptionLevel = 0;
  }
}
