import { BaseAnomalyPlugin } from './BaseAnomalyPlugin';

/**
 * 逆スクロール異変プラグイン
 * 見た目は通常通りだが、スクロール操作が逆向きになる
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
        const scrollAmount = 40; // 通常のスクロール量
        const pageScrollAmount = window.innerHeight * 0.8; // ページスクロール量
        
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            window.scrollBy(0, -scrollAmount);
            break;
          case 'ArrowUp':
            e.preventDefault();
            window.scrollBy(0, scrollAmount);
            break;
          case 'PageDown':
            e.preventDefault();
            window.scrollBy(0, -pageScrollAmount);
            break;
          case 'PageUp':
            e.preventDefault();
            window.scrollBy(0, pageScrollAmount);
            break;
          case 'End':
            e.preventDefault();
            window.scrollTo(0, 0);
            break;
          case 'Home':
            e.preventDefault();
            window.scrollTo(0, document.body.scrollHeight);
            break;
        }
      }
    };
  }

  get id(): string {
    return 'reverse-scroll';
  }

  get description(): string {
    return 'スクロール操作を逆向きにする異変（見た目は通常通り）';
  }

  async execute(element: HTMLElement): Promise<void> {
    const { 
      intensity = 'full',
      duration,
      visualFeedback = false 
    } = this.config.config;

    if (this.isScrollReversed) {
      return;
    }

    this.isScrollReversed = true;

    // ホイールイベントリスナーを追加
    window.addEventListener('wheel', this.wheelHandler, { passive: false });
    
    // タッチイベントリスナーを追加（モバイル対応）
    window.addEventListener('touchstart', this.touchHandler, { passive: false });
    window.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
    
    // キーボードイベントリスナーを追加（矢印キー対応）
    window.addEventListener('keydown', this.keyHandler, { passive: false });

    // 視覚的フィードバックが有効な場合、微かな効果を追加
    if (visualFeedback) {
      this.applyStyles(element, {
        filter: 'hue-rotate(180deg)',
        transition: 'filter 0.3s ease'
      });
    }

    // 期間指定がある場合、一定時間後に元に戻す
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

    // イベントリスナーを削除
    window.removeEventListener('wheel', this.wheelHandler);
    window.removeEventListener('touchstart', this.touchHandler);
    window.removeEventListener('touchmove', this.touchMoveHandler);
    window.removeEventListener('keydown', this.keyHandler);

    // 視覚効果をリセット
    if (this.element) {
      this.applyStyles(this.element, {
        filter: '',
        transition: ''
      });
    }

    console.log('ReverseScrollPlugin cleanup completed');
  }
}