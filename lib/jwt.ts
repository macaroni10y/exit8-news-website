import { jwtVerify, SignJWT } from "jose";
import type { PlayTokenPayload } from "./types";

// JWT secret key
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET_DEV || process.env.JWT_SECRET || "fallback-dev-secret",
);

// Generate Session UUID
function generateSessionId(): string {
  return crypto.randomUUID();
}

// Generate initial token (at game start)
export async function createInitialToken(
  initialArticleId: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: PlayTokenPayload = {
    v: 1,
    sid: generateSessionId(),
    step: 1,
    consecutive: 0,
    currentArticleId: initialArticleId,
    history: [],
    exp: now + 2 * 60 * 60, // 2 hours later
    lastValidStep: 1,
    lastAction: "init",
    lastActionTime: now,
  };

  const jwt = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(payload.exp)
    .sign(secret);

  return jwt;
}

// Verify and decode token
export async function verifyToken(
  token: string,
): Promise<PlayTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as PlayTokenPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

// Update token (when progressing steps)
export async function updateToken(
  currentPayload: PlayTokenPayload,
  newStep: PlayTokenPayload["step"],
  newArticleId: string,
  userAnswer: "prev" | "next",
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const newPayload: PlayTokenPayload = {
    ...currentPayload,
    step: newStep,
    consecutive:
      newStep > currentPayload.step ? currentPayload.consecutive + 1 : 0,
    currentArticleId: newArticleId,
    history: [
      ...currentPayload.history,
      {
        articleId: currentPayload.currentArticleId,
        answered: userAnswer,
      },
    ],
    exp: now + 2 * 60 * 60, // Update to 2 hours later
    lastValidStep: newStep,
    lastAction: userAnswer,
    lastActionTime: now,
  };

  const jwt = await new SignJWT(newPayload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(newPayload.exp)
    .sign(secret);

  return jwt;
}

// Update article ID only (when displaying page)
export async function updateTokenWithArticle(
  currentPayload: PlayTokenPayload,
  newArticleId: string,
): Promise<string> {
  const newPayload: PlayTokenPayload = {
    ...currentPayload,
    currentArticleId: newArticleId,
    exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60, // Update to 2 hours later
    lastActionTime: Math.floor(Date.now() / 1000), // Update action time
  };

  const jwt = await new SignJWT(newPayload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(newPayload.exp)
    .sign(secret);

  return jwt;
}

// Check transition validity
export function isValidTransition(
  payload: PlayTokenPayload | null,
  requestedStep: number,
  hasClickedParam: boolean,
): { isValid: boolean; reason?: string } {
  // No token case
  if (!payload) {
    return requestedStep === 1
      ? { isValid: true }
      : { isValid: false, reason: "no_token" };
  }

  const now = Math.floor(Date.now() / 1000);
  const timeSinceLastAction = now - payload.lastActionTime;

  // Timeout check (5 minutes)
  if (timeSinceLastAction > 300 && requestedStep > 1) {
    return { isValid: false, reason: "timeout" };
  }

  // Step 1 is always valid
  if (requestedStep === 1) {
    return { isValid: true };
  }

  // Browser back detection (trying to go back to previous step)
  if (requestedStep < payload.lastValidStep) {
    return { isValid: false, reason: "browser_back" };
  }

  // Skip detection (trying to skip to next step)
  if (requestedStep > payload.lastValidStep + 1) {
    return { isValid: false, reason: "skip_detected" };
  }

  // When current step equals last valid step
  // (Valid access right after redirect)
  if (requestedStep === payload.lastValidStep) {
    return { isValid: true };
  }

  // When trying to proceed to next step, clicked parameter is required
  if (requestedStep === payload.lastValidStep + 1 && !hasClickedParam) {
    return { isValid: false, reason: "direct_access" };
  }

  return { isValid: true };
}
