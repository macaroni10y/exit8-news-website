import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Duplicate Navigation Links Anomaly Plugin
 * Duplicates the navigation links to show 5 of each
 */
export class DuplicateNavLinksPlugin extends BaseAnomalyPlugin {
  private originalNavContent: string | null = null;
  private navElement: HTMLElement | null = null;

  get id(): string {
    return "duplicate-nav-links";
  }

  get description(): string {
    return "Anomaly that duplicates navigation links to show 5 of each";
  }

  async execute(): Promise<void> {
    const { layout = "grid", spacing = "normal" } = this.config.config;

    const navElements = document.querySelectorAll("nav");
    
    navElements.forEach((nav) => {
      const links = nav.querySelectorAll("a");
      let hasPrevLink = false;
      let hasNextLink = false;
      
      links.forEach((link) => {
        const linkText = link.textContent || "";
        if (linkText.includes("前の記事へ")) {
          hasPrevLink = true;
        }
        if (linkText.includes("次の記事へ")) {
          hasNextLink = true;
        }
      });
      
      if (hasPrevLink || hasNextLink) {
        this.navElement = nav as HTMLElement;
        this.originalNavContent = nav.innerHTML;
        
        const prevLink = Array.from(links).find(link => 
          (link.textContent || "").includes("前の記事へ")
        );
        const nextLink = Array.from(links).find(link => 
          (link.textContent || "").includes("次の記事へ")
        );
        
        nav.innerHTML = "";
        
        if (layout === "grid") {
          nav.style.display = "grid";
          nav.style.gridTemplateColumns = "repeat(5, 1fr)";
          nav.style.gap = spacing === "tight" ? "8px" : "16px";
          
          for (let i = 0; i < 5; i++) {
            if (prevLink) {
              const clonedPrev = prevLink.cloneNode(true) as HTMLElement;
              nav.appendChild(clonedPrev);
            }
          }
          
          for (let i = 0; i < 5; i++) {
            if (nextLink) {
              const clonedNext = nextLink.cloneNode(true) as HTMLElement;
              nav.appendChild(clonedNext);
            }
          }
        } else if (layout === "mixed") {
          nav.style.display = "flex";
          nav.style.flexWrap = "wrap";
          nav.style.gap = spacing === "tight" ? "8px" : "16px";
          
          const allLinks: HTMLElement[] = [];
          for (let i = 0; i < 5; i++) {
            if (prevLink) {
              allLinks.push(prevLink.cloneNode(true) as HTMLElement);
            }
            if (nextLink) {
              allLinks.push(nextLink.cloneNode(true) as HTMLElement);
            }
          }
          
          for (let i = allLinks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allLinks[i], allLinks[j]] = [allLinks[j], allLinks[i]];
          }
          
          allLinks.forEach(link => nav.appendChild(link));
        } else {
          nav.style.display = "flex";
          nav.style.flexDirection = "column";
          nav.style.gap = spacing === "tight" ? "8px" : "16px";
          
          for (let i = 0; i < 5; i++) {
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.gap = spacing === "tight" ? "8px" : "16px";
            container.style.justifyContent = "space-between";
            
            if (prevLink) {
              const clonedPrev = prevLink.cloneNode(true) as HTMLElement;
              container.appendChild(clonedPrev);
            }
            if (nextLink) {
              const clonedNext = nextLink.cloneNode(true) as HTMLElement;
              container.appendChild(clonedNext);
            }
            
            nav.appendChild(container);
          }
        }
        
        return;
      }
    });

    console.log(`DuplicateNavLinksPlugin activated with layout: ${layout}`);
  }

  cleanup(): void {
    if (this.navElement && this.originalNavContent !== null) {
      this.navElement.innerHTML = this.originalNavContent;
      this.navElement.style.display = "";
      this.navElement.style.gridTemplateColumns = "";
      this.navElement.style.flexDirection = "";
      this.navElement.style.flexWrap = "";
      this.navElement.style.gap = "";
      
      this.navElement = null;
      this.originalNavContent = null;
    }

    console.log("DuplicateNavLinksPlugin cleanup completed");
  }
}