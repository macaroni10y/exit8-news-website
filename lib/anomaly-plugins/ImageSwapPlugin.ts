import { BaseAnomalyPlugin } from './BaseAnomalyPlugin';

/**
 * 画像GIF切り替え異変プラグイン
 * 静止画をGIFアニメーションに切り替える
 */
export class ImageSwapPlugin extends BaseAnomalyPlugin {
  private originalImages: Map<HTMLImageElement, string> = new Map();
  private swappedImages: HTMLImageElement[] = [];

  get id(): string {
    return 'image-swap';
  }

  get description(): string {
    return '画像を静止画からGIFアニメーションに切り替える異変';
  }

  async execute(element: HTMLElement): Promise<void> {
    const { gifUrl, selector = 'img', transition = false } = this.config.config;

    if (!gifUrl) {
      console.warn('ImageSwapPlugin: gifUrl not specified in config');
      return;
    }

    // 対象画像を取得
    const images = element.querySelectorAll(selector) as NodeListOf<HTMLImageElement>;
    
    if (images.length === 0) {
      console.warn('ImageSwapPlugin: No images found with selector:', selector);
      return;
    }

    // 各画像を処理
    for (const img of images) {
      await this.swapImage(img, gifUrl, transition);
    }
  }

  /**
   * 個別画像を切り替える
   * @param img 対象画像要素
   * @param gifUrl 切り替え先のGIF URL
   * @param transition フェード効果の有無
   */
  private async swapImage(img: HTMLImageElement, gifUrl: string, transition: boolean): Promise<void> {
    // 元の画像URLを保存
    this.originalImages.set(img, img.src);
    this.swappedImages.push(img);

    if (transition) {
      // フェード効果付きで切り替え
      await this.fadeSwap(img, gifUrl);
    } else {
      // 即座に切り替え
      img.src = gifUrl;
    }

    // 画像読み込み完了を待つ
    await this.waitForImageLoad(img);
  }

  /**
   * フェード効果付きで画像を切り替える
   * @param img 対象画像
   * @param newSrc 新しい画像URL
   */
  private async fadeSwap(img: HTMLImageElement, newSrc: string): Promise<void> {
    // CSS トランジションを設定
    img.style.transition = 'opacity 0.5s ease-in-out';
    
    // フェードアウト
    img.style.opacity = '0';
    
    // フェードアウト完了を待つ
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 画像を切り替え
    img.src = newSrc;
    
    // 新しい画像の読み込み完了を待つ
    await this.waitForImageLoad(img);
    
    // フェードイン
    img.style.opacity = '1';
  }

  /**
   * 画像の読み込み完了を待つ
   * @param img 対象画像
   */
  private waitForImageLoad(img: HTMLImageElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (img.complete) {
        resolve();
        return;
      }

      const timeoutId = setTimeout(() => {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
        resolve(); // タイムアウトしても続行
      }, 5000);

      const onLoad = () => {
        clearTimeout(timeoutId);
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
        resolve();
      };

      const onError = () => {
        clearTimeout(timeoutId);
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
        console.error('Failed to load image:', img.src);
        resolve(); // エラーでも続行
      };

      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
    });
  }

  cleanup(): void {
    // 元の画像に戻す
    this.originalImages.forEach((originalSrc, img) => {
      img.src = originalSrc;
      
      // トランジション効果をリセット
      img.style.transition = '';
      img.style.opacity = '';
    });

    // 保存した情報をクリア
    this.originalImages.clear();
    this.swappedImages = [];
  }

  /**
   * 特定の画像のみを対象とする設定例
   * config: { 
   *   gifUrl: '/path/to/animation.gif',
   *   selector: '.article-main-image',
   *   transition: true 
   * }
   */

  /**
   * 複数の画像を個別に設定する場合の設定例
   * config: {
   *   swapRules: [
   *     { selector: '.header-image', gifUrl: '/header.gif' },
   *     { selector: '.content-image', gifUrl: '/content.gif' }
   *   ],
   *   transition: true
   * }
   */

  /**
   * 複数ルールに対応した実行（拡張版）
   */
  private async executeMultipleRules(element: HTMLElement): Promise<void> {
    const { swapRules, transition = false } = this.config.config;

    if (swapRules && Array.isArray(swapRules)) {
      for (const rule of swapRules) {
        const images = element.querySelectorAll(rule.selector) as NodeListOf<HTMLImageElement>;
        for (const img of images) {
          await this.swapImage(img, rule.gifUrl, transition);
        }
      }
    }
  }
}