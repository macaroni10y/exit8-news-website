// JWT Payload type definition
export interface PlayTokenPayload {
  v: 1; // Schema version
  sid: string; // Session UUID
  step: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Current step
  consecutive: number; // Consecutive correct answers
  currentArticleId: string; // Currently displayed article ID
  history: {
    articleId: string; // Displayed article ID
    answered: "prev" | "next"; // User's choice
  }[];
  exp: number; // Expiration (2 hours)
  lastValidStep: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Last legitimately reached step
  lastAction: "next" | "prev" | "init" | null; // Last action
  lastActionTime: number; // Last action timestamp (Unix time)
}

// Article data structure
export interface Article {
  id: string; // Unique article ID
  isAnomaly: boolean; // Whether it's an anomaly article
  title: string; // Article title
  content: string; // Article content
  imageUrl?: string; // Article image URL
  publishDate: string; // Publish date
  anomalyPlugins?: AnomalyPluginConfig[]; // Anomaly plugin configuration
}

// Anomaly plugin configuration
export interface AnomalyPluginConfig {
  id: string; // Plugin ID
  trigger: "time" | "scroll" | "immediate"; // Execution timing
  config: Record<string, any>; // Plugin-specific configuration
  delay?: number; // Delay execution time (ms)
}

// Anomaly pattern definition (legacy compatibility)
export interface AnomalyPattern {
  type: "layout" | "content" | "image" | "animation";
  trigger: "scroll" | "time" | "immediate";
  config: Record<string, any>;
}
