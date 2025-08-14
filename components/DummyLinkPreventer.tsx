"use client";

import { useEffect } from "react";

/**
 * Dummy link preventer component
 * Prevents clicks on dummy links (href="#") to avoid unwanted navigation
 * Useful for components that use dummy links for styling or layout purposes
 * without actual navigation functionality.
 */
export function DummyLinkPreventer() {
  useEffect(() => {
    // Disable dummy link clicks
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if clicked element or its parent is an anchor tag
      const anchor = target.closest("a");

      if (anchor && anchor.getAttribute("href") === "#") {
        event.preventDefault();
        event.stopPropagation();
        console.log("Dummy link click prevented");
        return false;
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
