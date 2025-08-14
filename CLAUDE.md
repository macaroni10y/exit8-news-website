# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Production build**: `npm run build`
- **Start production build**: `npm start`
- **Lint and format**: `npm run lint` (uses Biome in write mode)

## Environment Setup

Create `.env.local` for development:
```env
JWT_SECRET_DEV=your-development-secret-key-here
```

## Project Architecture

This is a web-based puzzle game inspired by "Exit 8", disguised as a news website. Players must detect anomalies in articles to progress through 8 levels.

### Core Game Mechanics

- **Progression**: Players navigate through articles at `/articles/[step]` (steps 1-8)
- **Win Condition**: Successfully identify 8 consecutive articles correctly
- **Fail Condition**: One wrong choice resets to step 1
- **Decision Logic**: If anomaly detected → go to previous article; if normal → go to next article

### State Management

**JWT-based Session**: All game state stored in secure HTTP-only cookies
- Session includes: current step, consecutive correct answers, article history
- Tokens expire after 2 hours
- Middleware validates all state transitions and prevents URL manipulation

Key files:
- `lib/jwt.ts` - JWT token creation, verification, and updates
- `lib/types.ts` - `PlayTokenPayload` interface defines session structure
- `middleware.ts` - Core game logic and security validation

### Anomaly Plugin System

**Plugin Architecture**: Extensible system for visual/behavioral anomalies
- Base class: `lib/anomaly-plugins/BaseAnomalyPlugin.ts`
- Engine: `lib/anomaly-plugins/AnomalyEngine.ts` manages plugin lifecycle
- Trigger types: `immediate`, `time` (delayed), `scroll` (position-based)

**Adding New Plugins**:
1. Extend `BaseAnomalyPlugin` in `lib/anomaly-plugins/`
2. Add to `registerAllPlugins()` function in `lib/anomaly-plugins/index.ts`
3. Export the plugin class from `lib/anomaly-plugins/index.ts`
4. Configure in `lib/constants.ts` article definitions

### Article Configuration

**Article Structure** (`lib/constants.ts`):
- Articles defined with `isAnomaly` flag
- Anomaly articles include `anomalyPlugins` configuration array
- Single article content reused with different anomaly configurations

**Content Management**:
- All articles share same base content (Japanese news about library opening)
- Anomalies applied dynamically via plugin system
- Random article selection prevents predictable patterns

### Security Features

**URL Manipulation Prevention**:
- Middleware validates all step transitions
- Invalid transitions redirect to step 1
- Server-side verification of game progression
- JWT tokens track legitimate step progression

**Session Security**:
- HTTP-only cookies prevent client-side token access
- Secure flag in production
- Session ID tracking prevents token reuse
- Expiration timestamps enforce time limits

### Key Components

- `middleware.ts` - Game progression logic and security
- `app/articles/[step]/page.tsx` - Article display with anomaly effects
- `components/AnomalyEffect.tsx` - Anomaly plugin orchestration
- `components/NavigationGuard.tsx` - Prevents navigation during anomalies
- `app/clear/page.tsx` - Victory screen
- `app/disclaimer/page.tsx` - Game instructions

### Code Style (Biome Configuration)

- Indentation: 2 spaces
- Quotes: Double quotes
- Import organization: Enabled
- Accessibility rules: Some disabled for game-specific needs
- Performance rules: img element rule disabled for game images

### Development Notes

- Game uses React 19 and Next.js 15 with latest features
- Tailwind CSS v4 for styling
- TypeScript with strict mode enabled
- No database required - all state in JWT tokens
- Designed for Vercel deployment