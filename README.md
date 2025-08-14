# Exit 8 News Website

A web-based game inspired by the popular [8番出口 (The Exit 8)](https://playism.com/game/the-exit-8/) game, disguised as a news website. Players must carefully read news articles and detect subtle anomalies to progress through 8 consecutive levels.

## Game Overview

Players navigate through news articles, looking for anomalies. If an anomaly is detected, they should go to the previous article; if everything appears normal, they proceed to the next article. Successfully identifying 8 consecutive articles correctly leads to victory. A single mistake sends players back to the beginning.

### How to Play

1. **Read carefully** - Examine each news article for any unusual elements
2. **Make a decision** - Choose "← Previous Article" if you spot an anomaly, or "Next Article →" if everything seems normal
3. **Progress or restart** - Correct choices advance you to the next level (1-8), while incorrect choices reset you to level 1
4. **Win condition** - Successfully complete 8 consecutive correct choices to clear the game

## 🛠 Tech Stack

- **Framework**: Next.js 15.4.6 with Turbopack
- **Frontend**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Authentication**: Stateless JWT (HS256)
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exit8-news-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
JWT_SECRET_DEV=your-development-secret-key-here
```

### Running the Development Server

Start the development server with Turbopack:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Building for Production

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Run Production Build Locally

```bash
npm run start
```

### Linting

Check code quality:
```bash
npm run lint
```

## Key Features

### Stateless Architecture
- Uses JWT tokens for session management
- No database required - all state stored in encrypted cookies
- Secure token validation in middleware

### Responsive Design
- Mobile-first approach
- Fully responsive layout
- Optimized for both desktop and mobile gameplay

### Security
- URL manipulation prevention - players cannot skip levels by changing URLs
- Server-side validation of all game progress
- Encrypted session tokens

## Deployment

The application is designed for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Vercel
3. Set environment variables in Vercel:
   - `JWT_SECRET_DEV` for development/staging
   - Use Vercel Secrets for production JWT secret
4. Deploy

## Configuration

### Environment Variables

- `JWT_SECRET_DEV`: Secret key for JWT signing in development
- Production secrets should be configured through Vercel's environment variables

### Game Configuration

Articles and anomaly settings can be modified in `/lib/constants.ts`

## Development Notes

- The game uses Next.js middleware to handle game logic and progression
- Anomalies are applied client-side using plugin architecture
- Each article can be configured as normal or anomalous
- JWT tokens contain session ID, current step, consecutive correct answers, and history

## License

This is a game project inspired by [8番出口 (Exit 8)](https://playism.com/game/the-exit-8/). All news content is fictional and created for entertainment purposes only.

---

**Note**: This is a fictional news website created for gaming purposes. All articles, events, and information presented are entirely fictional.
