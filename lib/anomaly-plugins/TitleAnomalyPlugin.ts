import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Title Anomaly Plugin
 * Changes the browser tab title from "8番ニュース" to "引き返せ引き返せ"
 */
export class TitleAnomalyPlugin extends BaseAnomalyPlugin {
  private originalTitle: string = "";

  get id(): string {
    return "title-change";
  }

  get description(): string {
    return "Anomaly where the page title changes to '引き返せ引き返せ'";
  }

  execute(_element: HTMLElement): void {
    // Save the original title
    this.originalTitle = document.title;

    // Change the title to "引き返せ引き返せ" (Turn back, turn back)
    document.title =
      "引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ引き返せ";
  }

  cleanup(): void {
    // Restore the original title if it was saved
    if (this.originalTitle) {
      document.title = this.originalTitle;
      this.originalTitle = "";
    }
  }
}
