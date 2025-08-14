import { BaseAnomalyPlugin } from './BaseAnomalyPlugin';

/**
 * 句点削除異変プラグイン
 * 記事内のテキストから「。」（句点）だけが即座に削除される
 */
export class PeriodRemovalPlugin extends BaseAnomalyPlugin {
  private originalTexts: Map<Text, string> = new Map();
  private textNodes: Text[] = [];

  get id(): string {
    return 'period-removal';
  }

  get description(): string {
    return '記事のテキストから句点（。）が削除される異変';
  }

  async execute(element: HTMLElement): Promise<void> {
    // すべてのテキストノードを収集
    this.collectTextNodes(element);
    
    // 元のテキストを保存
    this.textNodes.forEach(node => {
      this.originalTexts.set(node, node.textContent || '');
    });

    // 即座に句点を削除
    this.removePeriods();
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
   * 句点を削除する
   */
  private removePeriods(): void {
    this.textNodes.forEach(node => {
      const currentText = node.textContent || '';
      // 「。」のみを削除（その他の句読点は維持）
      const modifiedText = currentText.replace(/。/g, '　');
      node.textContent = modifiedText;
    });
  }

  cleanup(): void {
    // 元のテキストを復元
    this.originalTexts.forEach((originalText, node) => {
      if (node.parentNode) { // ノードがまだDOMにある場合のみ
        node.textContent = originalText;
      }
    });

    // データをクリア
    this.originalTexts.clear();
    this.textNodes = [];
  }
}
