import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Text Corruption Anomaly Plugin
 * Article text becomes corrupted character by character randomly
 */
export class TextCorruptionPlugin extends BaseAnomalyPlugin {
  private originalTexts: Map<Text, string> = new Map();
  private corruptionLevel: number = 0;
  private textNodes: Text[] = [];

  // Corruption character patterns
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
    level2: [
      "◆",
      "◇",
      "○",
      "●",
      "□",
      "■",
      "△",
      "▲",
      "▽",
      "▼",
      "※",
      "〒",
      "〓",
      "〔",
      "〕",
    ],
    level3: [
      "👻",
      "💀",
      "🔥",
      "⚡",
      "🌀",
      "💥",
      "👁",
      "🕳",
      "⭐",
      "🌙",
      "☠",
      "⚠",
      "☢",
      "☣",
      "⬛",
    ],
    level4: [
      "█",
      "▓",
      "▒",
      "░",
      "▀",
      "▄",
      "▌",
      "▐",
      "╳",
      "╱",
      "╲",
      "╴",
      "╵",
      "╶",
      "╷",
    ],
    zalgo: [
      "\u0300",
      "\u0301",
      "\u0302",
      "\u0303",
      "\u0304",
      "\u0305",
      "\u0306",
      "\u0307",
      "\u0308",
      "\u0309",
      "\u030A",
      "\u030B",
      "\u030C",
      "\u030D",
      "\u030E",
      "\u030F",
      "\u0310",
      "\u0311",
      "\u0312",
      "\u0313",
      "\u0314",
      "\u0315",
      "\u0316",
      "\u0317",
      "\u0318",
      "\u0319",
      "\u031A",
      "\u031B",
      "\u031C",
      "\u031D",
      "\u031E",
      "\u031F",
    ],
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

      // Complete corruption at level 20
      if (this.corruptionLevel >= 20) {
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
    const corruptionRate = Math.min(this.corruptionLevel * 5, 100); // Maximum 100%

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
  private getCorruptedChar(originalChar: string, level: number): string {
    // Select corruption pattern based on level
    let pattern: string[];

    if (level <= 5) {
      pattern = this.corruptionPatterns.level1;
    } else if (level <= 10) {
      pattern = this.corruptionPatterns.level2;
    } else if (level <= 15) {
      pattern = this.corruptionPatterns.level3;
    } else {
      pattern = this.corruptionPatterns.level4;
    }

    // Add Zalgo text effect (level 15 and above)
    if (level >= 15 && Math.random() > 0.7) {
      const zalgoCount = Math.floor(Math.random() * 3) + 1;
      let result = originalChar;
      for (let i = 0; i < zalgoCount; i++) {
        const zalgoChar =
          this.corruptionPatterns.zalgo[
            Math.floor(Math.random() * this.corruptionPatterns.zalgo.length)
          ];
        result += zalgoChar;
      }
      return result;
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
