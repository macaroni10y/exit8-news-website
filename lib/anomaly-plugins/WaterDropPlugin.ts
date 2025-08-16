import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Water Drop Anomaly Plugin
 * Creates water drops falling from the top of the screen
 */
export class WaterDropPlugin extends BaseAnomalyPlugin {
  private dropContainer: HTMLDivElement | null = null;
  private drops: HTMLDivElement[] = [];
  private animationFrameId: number | null = null;

  get id(): string {
    return "water-drop";
  }

  get description(): string {
    return "Anomaly that creates water drops falling from the top of the screen";
  }

  async execute(_element: HTMLElement): Promise<void> {
    const {
      dropCount = 20,
      duration = 5000,
      minSize = 10,
      maxSize = 25,
      color = "rgba(59, 130, 246, 0.6)",
    } = this.config.config || {};

    // Create container for water drops
    this.dropContainer = document.createElement("div");
    this.dropContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;

    // Add container to body
    document.body.appendChild(this.dropContainer);

    // Create water drops
    for (let i = 0; i < dropCount; i++) {
      this.createWaterDrop(minSize, maxSize, color, duration, i * 200);
    }
  }

  /**
   * Create individual water drop
   */
  private createWaterDrop(
    minSize: number,
    maxSize: number,
    color: string,
    duration: number,
    delay: number,
  ): void {
    if (!this.dropContainer) return;

    const drop = document.createElement("div");
    const size = Math.random() * (maxSize - minSize) + minSize;
    const leftPosition = Math.random() * 100;
    const animationDuration = duration + Math.random() * 2000;

    // Create wrapper for water drop to allow pseudo-elements
    const dropWrapper = document.createElement("div");
    dropWrapper.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size * 1.5}px;
      left: ${leftPosition}%;
      top: -${size * 2}px;
    `;

    // Style water drop
    drop.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.3) 0%,
        ${color} 20%, 
        ${color.replace("0.7", "0.85")} 60%,
        ${color.replace("0.7", "0.9")} 100%);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      opacity: 0;
      animation: waterDropFall ${animationDuration}ms ease-in ${delay}ms forwards;
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.2),
        inset 0 -2px 4px rgba(0, 0, 0, 0.1),
        inset 0 2px 0 rgba(255, 255, 255, 0.5);
      overflow: visible;
    `;

    // Add glossy highlight using ::before pseudo-element
    const highlight = document.createElement("div");
    highlight.style.cssText = `
      position: absolute;
      top: 15%;
      left: 20%;
      width: 40%;
      height: 30%;
      background: radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 100%
      );
      border-radius: 50%;
      filter: blur(1px);
    `;

    drop.appendChild(highlight);
    dropWrapper.appendChild(drop);

    // Add CSS animation if not already added
    if (!document.querySelector("#water-drop-animation")) {
      const style = document.createElement("style");
      style.id = "water-drop-animation";
      style.textContent = `
        @keyframes waterDropFall {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
            transform: translateY(20px) scale(1);
          }
          90% {
            opacity: 0.85;
            transform: translateY(calc(100vh + 50px)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(calc(100vh + 100px)) scale(0.5);
          }
        }
      `;
      document.head.appendChild(style);
    }

    this.dropContainer.appendChild(dropWrapper);
    this.drops.push(drop);

    // Remove drop after animation completes
    setTimeout(
      () => {
        if (dropWrapper.parentNode) {
          dropWrapper.removeChild(drop);
          dropWrapper.parentNode.removeChild(dropWrapper);
        }
        const index = this.drops.indexOf(drop);
        if (index > -1) {
          this.drops.splice(index, 1);
        }
      },
      animationDuration + delay + 500,
    );
  }

  cleanup(): void {
    // Remove all drops
    this.drops.forEach((drop) => {
      if (drop.parentNode?.parentNode) {
        drop.parentNode.parentNode.removeChild(drop.parentNode);
      }
    });
    this.drops = [];

    // Remove container
    if (this.dropContainer?.parentNode) {
      this.dropContainer.parentNode.removeChild(this.dropContainer);
    }
    this.dropContainer = null;

    // Cancel animation frame if exists
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
