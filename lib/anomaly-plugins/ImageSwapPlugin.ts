import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Image GIF Swap Anomaly Plugin
 * Swaps static images to GIF animations
 */
export class ImageSwapPlugin extends BaseAnomalyPlugin {
  private originalImages: Map<HTMLImageElement, string> = new Map();
  private swappedImages: HTMLImageElement[] = [];

  get id(): string {
    return "image-swap";
  }

  get description(): string {
    return "Anomaly that swaps static images to GIF animations";
  }

  async execute(element: HTMLElement): Promise<void> {
    const { gifUrl, selector = "img", transition = false } = this.config.config;

    if (!gifUrl) {
      console.warn("ImageSwapPlugin: gifUrl not specified in config");
      return;
    }

    // Get target images
    const images = element.querySelectorAll(
      selector,
    ) as NodeListOf<HTMLImageElement>;

    if (images.length === 0) {
      console.warn("ImageSwapPlugin: No images found with selector:", selector);
      return;
    }

    // Process each image
    for (const img of images) {
      await this.swapImage(img, gifUrl, transition);
    }
  }

  /**
   * Swap individual image
   * @param img Target image element
   * @param gifUrl Target GIF URL
   * @param transition Whether to use fade effect
   */
  private async swapImage(
    img: HTMLImageElement,
    gifUrl: string,
    transition: boolean,
  ): Promise<void> {
    // Save original image URL
    this.originalImages.set(img, img.src);
    this.swappedImages.push(img);

    if (transition) {
      // Swap with fade effect
      await this.fadeSwap(img, gifUrl);
    } else {
      // Swap immediately
      img.src = gifUrl;
    }

    // Wait for image to load
    await this.waitForImageLoad(img);
  }

  /**
   * Swap image with fade effect
   * @param img Target image
   * @param newSrc New image URL
   */
  private async fadeSwap(img: HTMLImageElement, newSrc: string): Promise<void> {
    // Set CSS transition
    img.style.transition = "opacity 0.5s ease-in-out";

    // Fade out
    img.style.opacity = "0";

    // Wait for fade out to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Swap image
    img.src = newSrc;

    // Wait for new image to load
    await this.waitForImageLoad(img);

    // Fade in
    img.style.opacity = "1";
  }

  /**
   * Wait for image to load
   * @param img Target image
   */
  private waitForImageLoad(img: HTMLImageElement): Promise<void> {
    return new Promise((resolve, _reject) => {
      if (img.complete) {
        resolve();
        return;
      }

      const timeoutId = setTimeout(() => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
        resolve(); // Continue even on timeout
      }, 5000);

      const onLoad = () => {
        clearTimeout(timeoutId);
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
        resolve();
      };

      const onError = () => {
        clearTimeout(timeoutId);
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
        console.error("Failed to load image:", img.src);
        resolve(); // Continue even on error
      };

      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
    });
  }

  cleanup(): void {
    // Restore original images
    this.originalImages.forEach((originalSrc, img) => {
      img.src = originalSrc;

      // Reset transition effect
      img.style.transition = "";
      img.style.opacity = "";
    });

    // Clear saved information
    this.originalImages.clear();
    this.swappedImages = [];
  }
}
