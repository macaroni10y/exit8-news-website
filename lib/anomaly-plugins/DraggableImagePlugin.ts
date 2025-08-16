import { BaseAnomalyPlugin } from "./BaseAnomalyPlugin";

/**
 * Draggable Image Anomaly Plugin
 * Makes images in the article draggable by mouse or touch
 */
export class DraggableImagePlugin extends BaseAnomalyPlugin {
  private draggedElement: HTMLImageElement | null = null;
  private draggedClone: HTMLImageElement | null = null;
  private allClones: HTMLImageElement[] = [];
  private originalPositions: Map<
    HTMLImageElement,
    {
      position: string;
      left: string;
      top: string;
      transform: string;
      cursor: string;
      userSelect: string;
      zIndex: string;
      transition: string;
      visibility: string;
      outline: string;
    }
  > = new Map();
  private dragOffset = { x: 0, y: 0 };
  private boundHandlers: {
    mousedown: (e: MouseEvent) => void;
    mousemove: (e: MouseEvent) => void;
    mouseup: (e: MouseEvent) => void;
    touchstart: (e: TouchEvent) => void;
    touchmove: (e: TouchEvent) => void;
    touchend: (e: TouchEvent) => void;
  } | null = null;

  get id(): string {
    return "draggable-image";
  }

  get description(): string {
    return "Anomaly that makes images draggable within the article";
  }

  execute(element: HTMLElement): void {
    const images = element.querySelectorAll(
      "img",
    ) as NodeListOf<HTMLImageElement>;

    if (images.length === 0) {
      console.warn("DraggableImagePlugin: No images found");
      return;
    }

    // Save original styles and make images draggable
    images.forEach((img) => {
      this.saveOriginalPosition(img);
      this.makeImageDraggable(img);
    });

    // Set up event handlers
    this.setupEventHandlers();
  }

  private saveOriginalPosition(img: HTMLImageElement): void {
    this.originalPositions.set(img, {
      position: img.style.position || "",
      left: img.style.left || "",
      top: img.style.top || "",
      transform: img.style.transform || "",
      cursor: img.style.cursor || "",
      userSelect: img.style.userSelect || "",
      zIndex: img.style.zIndex || "",
      transition: img.style.transition || "",
      visibility: img.style.visibility || "",
      outline: img.style.outline || "",
    });
  }

  private makeImageDraggable(img: HTMLImageElement): void {
    // Make image draggable
    img.style.cursor = "grab";
    img.style.userSelect = "none";
    img.style.transition = "box-shadow 0.3s ease";

    // Add data attribute to identify draggable images
    img.dataset.draggable = "true";

    // Add hover effect
    img.addEventListener("mouseenter", () => {
      if (!this.draggedElement) {
        img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }
    });

    img.addEventListener("mouseleave", () => {
      if (!this.draggedElement) {
        img.style.boxShadow = "";
      }
    });
  }

  private setupEventHandlers(): void {
    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "IMG" &&
        (target.dataset.draggable === "true" ||
          target.dataset.clonedImage === "true")
      ) {
        e.preventDefault();
        this.startDrag(target as HTMLImageElement, e.clientX, e.clientY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (this.draggedElement) {
        e.preventDefault();
        this.moveDrag(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (this.draggedElement) {
        e.preventDefault();
        this.endDrag();
      }
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "IMG" &&
        (target.dataset.draggable === "true" ||
          target.dataset.clonedImage === "true")
      ) {
        e.preventDefault();
        const touch = e.touches[0];
        this.startDrag(
          target as HTMLImageElement,
          touch.clientX,
          touch.clientY,
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (this.draggedElement) {
        e.preventDefault();
        const touch = e.touches[0];
        this.moveDrag(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (this.draggedElement) {
        e.preventDefault();
        this.endDrag();
      }
    };

    // Store handlers for cleanup
    this.boundHandlers = {
      mousedown: handleMouseDown,
      mousemove: handleMouseMove,
      mouseup: handleMouseUp,
      touchstart: handleTouchStart,
      touchmove: handleTouchMove,
      touchend: handleTouchEnd,
    };

    // Add event listeners
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });
  }

  private startDrag(
    img: HTMLImageElement,
    clientX: number,
    clientY: number,
  ): void {
    // Check if this is a clone being dragged again
    if (img.dataset.clonedImage === "true") {
      this.draggedElement = img;
      this.draggedClone = img;

      // Get current position
      const rect = img.getBoundingClientRect();

      // Calculate offset from cursor to image corner
      this.dragOffset.x = clientX - rect.left;
      this.dragOffset.y = clientY - rect.top;

      // Apply dragging styles
      img.style.cursor = "grabbing";
      img.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
      img.style.transform = "scale(1.05)";
      img.style.zIndex = "10000"; // Higher z-index for active drag
    } else {
      // Original image being dragged for the first time
      this.draggedElement = img;

      // Get current position
      const rect = img.getBoundingClientRect();

      // Calculate offset from cursor to image corner
      this.dragOffset.x = clientX - rect.left;
      this.dragOffset.y = clientY - rect.top;

      // Create clone for dragging
      const clone = img.cloneNode(true) as HTMLImageElement;
      clone.style.position = "fixed";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.zIndex = "9999";
      clone.style.cursor = "grabbing";
      clone.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
      clone.style.transform = "scale(1.05)";
      clone.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
      clone.dataset.clonedImage = "true"; // Mark as clone

      // Add clone to document
      document.body.appendChild(clone);
      this.draggedClone = clone;
      this.allClones.push(clone);

      // Hide original image but keep space
      img.style.visibility = "hidden";
      img.style.outline = "2px dashed rgba(0, 0, 0, 0.3)";
    }
  }

  private moveDrag(clientX: number, clientY: number): void {
    if (!this.draggedClone) return;

    // Update clone position
    const newX = clientX - this.dragOffset.x;
    const newY = clientY - this.dragOffset.y;

    this.draggedClone.style.left = `${newX}px`;
    this.draggedClone.style.top = `${newY}px`;
  }

  private endDrag(): void {
    if (!this.draggedElement || !this.draggedClone) return;

    // Keep the clone at the dropped position
    this.draggedClone.style.cursor = "grab";
    this.draggedClone.style.transform = "scale(1)";
    this.draggedClone.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    this.draggedClone.style.zIndex = "9999";

    // Clear drag state
    this.draggedElement = null;
    this.draggedClone = null;
  }

  cleanup(): void {
    // Remove event handlers
    if (this.boundHandlers) {
      document.removeEventListener("mousedown", this.boundHandlers.mousedown);
      document.removeEventListener("mousemove", this.boundHandlers.mousemove);
      document.removeEventListener("mouseup", this.boundHandlers.mouseup);
      document.removeEventListener("touchstart", this.boundHandlers.touchstart);
      document.removeEventListener("touchmove", this.boundHandlers.touchmove);
      document.removeEventListener("touchend", this.boundHandlers.touchend);
      this.boundHandlers = null;
    }

    // Remove all clones
    this.allClones.forEach((clone) => {
      if (clone?.parentNode) {
        clone.parentNode.removeChild(clone);
      }
    });
    this.allClones = [];
    this.draggedClone = null;

    // Restore original styles
    this.originalPositions.forEach((originalStyles, img) => {
      img.style.position = originalStyles.position;
      img.style.left = originalStyles.left;
      img.style.top = originalStyles.top;
      img.style.transform = originalStyles.transform;
      img.style.cursor = originalStyles.cursor;
      img.style.userSelect = originalStyles.userSelect;
      img.style.zIndex = originalStyles.zIndex;
      img.style.transition = originalStyles.transition;
      img.style.visibility = originalStyles.visibility;
      img.style.outline = originalStyles.outline;
      img.style.boxShadow = "";
      delete img.dataset.draggable;
    });

    // Clear saved data
    this.originalPositions.clear();
    this.draggedElement = null;
  }
}
