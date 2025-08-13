import { BaseAnomalyPlugin } from './BaseAnomalyPlugin';

/**
 * テキスト崩壊異変プラグイン
 * 記事内のテキストが1文字ずつランダムに文字化けしていく
 */
export class TextCorruptionPlugin extends BaseAnomalyPlugin {
  private originalTexts: Map<Text, string> = new Map();
  private corruptionLevel: number = 0;
  private textNodes: Text[] = [];

  // 崩壊文字のパターン
  private readonly corruptionPatterns = {
    level1: ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ', 'ゎ', 'ヮ', 'ヵ', 'ヶ', 'っ', 'ッ'],
    level2: ['◆', '◇', '○', '●', '□', '■', '△', '▲', '▽', '▼', '※', '〒', '〓', '〔', '〕'],
    level3: ['👻', '💀', '🔥', '⚡', '🌀', '💥', '👁', '🕳', '⭐', '🌙', '☠', '⚠', '☢', '☣', '⬛'],
    level4: ['█', '▓', '▒', '░', '▀', '▄', '▌', '▐', '╳', '╱', '╲', '╴', '╵', '╶', '╷'],
    zalgo: [
      '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
      '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
      '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317',
      '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F'
    ]
  };

  get id(): string {
    return 'text-corruption';
  }

  get description(): string {
    return '記事のテキストが1文字ずつ崩壊していく異変';
  }

  async execute(element: HTMLElement): Promise<void> {
    // すべてのテキストノードを収集
    this.collectTextNodes(element);
    
    // 元のテキストを保存
    this.textNodes.forEach(node => {
      this.originalTexts.set(node, node.textContent || '');
    });

    // 段階的に崩壊を進行させる
    this.startCorruption();
  }

  /**
   * テキストノードを収集する
   */
  private collectTextNodes(element: HTMLElement): void {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // 空白のみのテキストノードは除外
          if (node.textContent && node.textContent.trim().length > 0) {
            // scriptやstyleタグ内のテキストは除外
            const parent = node.parentElement;
            if (parent && parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
              return NodeFilter.FILTER_ACCEPT;
            }
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    this.textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      this.textNodes.push(node as Text);
    }
  }

  /**
   * 崩壊を開始する
   */
  private startCorruption(): void {
    // 500msごとに崩壊を進行
    this.intervalId = window.setInterval(() => {
      this.corruptionLevel++;
      this.applyCorruption();

      // レベル20で完全崩壊
      if (this.corruptionLevel >= 20) {
        if (this.intervalId !== null) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    }, 500);
  }

  /**
   * 崩壊を適用する
   */
  private applyCorruption(): void {
    const corruptionRate = Math.min(this.corruptionLevel * 5, 100); // 最大100%
    
    this.textNodes.forEach(node => {
      const originalText = this.originalTexts.get(node) || '';
      if (!originalText) return;

      const chars = originalText.split('');
      const corruptedChars = chars.map((char, index) => {
        // 空白文字は崩壊させない
        if (/\s/.test(char)) return char;

        // 崩壊確率に基づいて文字を変換
        if (Math.random() * 100 < corruptionRate) {
          return this.getCorruptedChar(char, this.corruptionLevel);
        }
        return char;
      });

      node.textContent = corruptedChars.join('');
    });
  }

  /**
   * 崩壊文字を取得する
   */
  private getCorruptedChar(originalChar: string, level: number): string {
    // レベルに応じて崩壊パターンを選択
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

    // Zalgoテキスト効果を追加（レベル15以上）
    if (level >= 15 && Math.random() > 0.7) {
      const zalgoCount = Math.floor(Math.random() * 3) + 1;
      let result = originalChar;
      for (let i = 0; i < zalgoCount; i++) {
        const zalgoChar = this.corruptionPatterns.zalgo[
          Math.floor(Math.random() * this.corruptionPatterns.zalgo.length)
        ];
        result += zalgoChar;
      }
      return result;
    }

    // ランダムに崩壊文字を選択
    return pattern[Math.floor(Math.random() * pattern.length)];
  }

  cleanup(): void {
    // インターバルをクリア
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // 元のテキストを復元
    this.originalTexts.forEach((originalText, node) => {
      if (node.parentNode) { // ノードがまだDOMにある場合のみ
        node.textContent = originalText;
      }
    });

    // データをクリア
    this.originalTexts.clear();
    this.textNodes = [];
    this.corruptionLevel = 0;
  }
}