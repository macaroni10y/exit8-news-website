"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function NavigationGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Detect browser back/forward
    const handlePopState = (_event: PopStateEvent) => {
      // Ignore if URL path hasn't changed (hash-only change)
      if (window.location.pathname === pathname) {
        return;
      }

      // Detect browser back/forward on article pages
      if (pathname.startsWith("/articles/")) {
        console.log("Browser navigation detected - redirecting to step 1");
        // Reset to step 1 if browser history operation detected
        router.replace("/articles/1");
      }
    };

    // Warning before page exit
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pathname.startsWith("/articles/") && pathname !== "/articles/1") {
        event.preventDefault();
        event.returnValue =
          "ゲーム中です。ページを離れると最初からやり直しになります。";
      }
    };

    // Register event listeners
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Add current page to history stack (for browser back detection)
    window.history.pushState({ page: pathname }, "", pathname);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname, router]);

  return null;
}
