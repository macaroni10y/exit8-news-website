import { type NextRequest, NextResponse } from "next/server";
import { ARTICLES, getRandomArticle } from "@/lib/constants";
import {
  createGameCompletionToken,
  createInitialToken,
  isValidTransition,
  updateToken,
  updateTokenWithArticle,
  verifyToken,
} from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle /clear page access
  if (pathname === "/clear") {
    const currentToken = request.cookies.get("play")?.value;
    const payload = currentToken ? await verifyToken(currentToken) : null;

    // Check if user has legitimately completed the game
    if (!payload || !payload.gameCompleted) {
      // Redirect to home page if not authorized
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow access if game is completed
    return NextResponse.next();
  }

  // Skip processing for non-article paths
  if (!pathname.startsWith("/articles/")) {
    return NextResponse.next();
  }

  // Extract step number
  const stepMatch = pathname.match(/^\/articles\/(\d+)$/);
  if (!stepMatch) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const step = parseInt(stepMatch[1], 10);
  if (step < 1 || step > 8) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Get current token
  const currentToken = request.cookies.get("play")?.value;
  const clickedDirection = searchParams.get("clicked");

  // Verify token
  const payload = currentToken ? await verifyToken(currentToken) : null;

  // Check transition validity
  const validation = isValidTransition(payload, step, !!clickedDirection);

  // Reset to step 1 if invalid transition detected
  if (!validation.isValid && step !== 1) {
    console.log(`Invalid transition detected: ${validation.reason}`);
    const resetArticle = getRandomArticle();
    const newToken = await createInitialToken(resetArticle.id);
    const response = NextResponse.redirect(new URL("/articles/1", request.url));
    response.cookies.set("play", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2,
    });
    return response;
  }

  // Step 1: Generate initial token or reset
  if (step === 1) {
    if (!currentToken || !clickedDirection) {
      // First access or reset: Generate new token
      const initialArticle = getRandomArticle();
      const newToken = await createInitialToken(initialArticle.id);
      const response = NextResponse.next();
      response.cookies.set("play", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 2, // 2 hours
      });
      return response;
    }
  }

  // Step 2 and above: Valid token required
  if (step > 1 && !payload) {
    const resetArticle = getRandomArticle();
    const newToken = await createInitialToken(resetArticle.id);
    const response = NextResponse.redirect(new URL("/articles/1", request.url));
    response.cookies.set("play", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2,
    });
    return response;
  }

  // Normal page access (no button click) with no article ID set
  if (payload && !payload.currentArticleId && !searchParams.get("clicked")) {
    const newArticle = getRandomArticle();
    const newToken = await updateTokenWithArticle(payload, newArticle.id);
    const response = NextResponse.next();
    response.cookies.set("play", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2,
    });
    return response;
  }

  // Handle button click by user
  if (clickedDirection && payload) {
    // Get current article ID from JWT
    const currentArticle = ARTICLES.find(
      (article) => article.id === payload.currentArticleId,
    );
    if (!currentArticle) {
      // Reset if article not found
      const initialArticle = getRandomArticle();
      const newToken = await createInitialToken(initialArticle.id);
      const response = NextResponse.redirect(
        new URL("/articles/1", request.url),
      );
      response.cookies.set("play", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 2,
      });
      return response;
    }

    // Check if answer is correct
    const expectDirection = currentArticle.isAnomaly ? "prev" : "next";
    const isCorrect = clickedDirection === expectDirection;

    if (isCorrect) {
      // Correct: Go to next step or clear page
      const nextStep = step + 1;
      if (nextStep > 8) {
        // Game clear - create completion token
        const completionToken = await createGameCompletionToken(payload);
        const response = NextResponse.redirect(new URL("/clear", request.url));
        response.cookies.set("play", completionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 5 * 60, // 5 minutes for clear page
        });
        return response;
      } else {
        // Select new article for next step
        const nextArticle = getRandomArticle();
        const newToken = await updateToken(
          payload,
          nextStep as any,
          nextArticle.id,
          clickedDirection as any,
        );
        const response = NextResponse.redirect(
          new URL(`/articles/${nextStep}`, request.url),
        );
        response.cookies.set("play", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 2,
        });
        return response;
      }
    } else {
      // Incorrect: Reset
      const resetArticle = getRandomArticle();
      const newToken = await createInitialToken(resetArticle.id);
      const response = NextResponse.redirect(
        new URL("/articles/1", request.url),
      );
      response.cookies.set("play", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 2,
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*", "/clear"],
};
