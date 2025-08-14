"use client";

import { useEffect, useRef } from "react";
import { anomalyEngine } from "@/lib/anomaly-plugins";
import type { AnomalyPluginConfig } from "@/lib/types";

interface AnomalyEffectProps {
  plugins: AnomalyPluginConfig[];
  children: React.ReactNode;
}

/**
 * Generic anomaly effect component
 * Applies specified anomaly plugins to child elements
 */
export function AnomalyEffect({ plugins, children }: AnomalyEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && plugins.length > 0) {
      anomalyEngine.executeAnomalies(plugins, containerRef.current);
    }

    return () => {
      anomalyEngine.cleanup();
    };
  }, [plugins]);

  useEffect(() => {
    return () => {
      anomalyEngine.cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className="anomaly-container">
      {children}
    </div>
  );
}
