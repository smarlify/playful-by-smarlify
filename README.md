# Playful.Smarlify.co 🎮

A modern gaming hub featuring free online games built with Next.js 14, TypeScript, and Tailwind CSS. Play Traffic Run, Crossy Road, Space Shooter, and more!

## 🎮 Featured Games

- **Crossy Road** - Endless runner with obstacles and coin collection (React Three Fiber, Zustand)
- **Traffic Run** - High-speed 2.5D racing through busy traffic (Three.js, WebGL)
- **Space Shooter** - Classic 2D space shooter defending Earth from aliens (WebGL, Vanilla JS)
- **Crazy Vacuum 3D** - Coming soon! 3D vacuum cleaning adventure (Unity 3D)

## ✨ Features

- **Modern Design**: Glassmorphism UI with particle background effects
- **Game Embedding**: Full-screen iframe integration for seamless gameplay
- **Share Functionality**: Easy game sharing with copy-to-clipboard
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **SEO Optimized**: Complete meta tags, OpenGraph, structured data
- **Analytics Tracking**: Comprehensive game play tracking with localStorage persistence

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Heroku (heroku-24 stack)

## 🚀 Getting Started

### Prerequisites

- Node.js 22+ (LTS recommended)
- npm, yarn, or bun

### Installation

```bash
# Navigate to the project
cd _Playful

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the gaming hub.

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📈 Analytics & Event Tracking

Comprehensive game analytics with localStorage persistence to track user engagement:

### Tracked Events

1. **`play_game`** - Tracks each game play instance
   - Parameters: `game_name`, `timestamp`
   - Example: `play_game({ game_name: "Crossy Road", timestamp: "2025-01-15T10:30:00Z" })`

2. **`game_played_total`** - Tracks cumulative play count per user
   - Parameters: `game_name`, `play_count`, `first_played`, `last_played`
   - Example: `game_played_total({ game_name: "Traffic Run", play_count: 10, first_played: "2025-01-10T08:00:00Z", last_played: "2025-01-15T10:30:00Z" })`

3. **`game_card_click`** - Game card clicks on the home page
4. **`game_play_click`** - Play button clicks
5. **`share_button_click`** - Share button clicks
6. **`copy_link_click`** - Copy link actions
7. **`social_share_click`** - Social media shares
8. **`github_link_click`** - GitHub repository link clicks

### Analytics Implementation

The analytics system uses **localStorage** to persist play counts per user (not per session):

```typescript
// src/lib/analytics.ts
export interface GameStats {
  [gameName: string]: {
    playCount: number;      // Total plays by this user
    lastPlayed: string;     // ISO timestamp of last play
    firstPlayed: string;    // ISO timestamp of first play
  };
}

// Track when a game is played
trackGamePlayed('Crossy Road');

// Get play count for a specific game
const count = getGamePlayCount('Traffic Run'); // Returns: 10

// Get total play count across all games
const total = getTotalPlayCount(); // Returns: 47

// Get most played game
const mostPlayed = getMostPlayedGame(); // Returns: { name: "Crossy Road", count: 23 }
```

### Storage Format

Game statistics are stored in localStorage under the key `playful_game_stats`:

```json
{
  "Crossy Road": {
    "playCount": 23,
    "lastPlayed": "2025-01-15T10:30:00.000Z",
    "firstPlayed": "2025-01-10T08:00:00.000Z"
  },
  "Traffic Run": {
    "playCount": 10,
    "lastPlayed": "2025-01-15T09:15:00.000Z",
    "firstPlayed": "2025-01-12T14:20:00.000Z"
  }
}
```

### TypeScript Support

Global type declarations in `src/types/global.d.ts`:

```typescript
declare global {
  interface Window {
    trackEvent?: (eventName: string, parameters?: Record<string, unknown>) => void;
  }
}
```

### Analytics Setup

- **Google Analytics 4**: Event tracking with custom parameters
- **GTM (Google Tag Manager)**: Tag management for analytics
- **localStorage**: Persistent play count tracking per user
- **Event Parameters**: Rich metadata including timestamps, play counts, and game names

## 🎨 Project Structure

```
_Playful/
├── src/
│   ├── app/
│   │   ├── [game]/page.tsx      # Dynamic game pages
│   │   ├── layout.tsx            # Root layout with SEO
│   │   ├── page.tsx              # Home page with game grid
│   │   └── cookies/page.tsx      # Cookie policy
│   ├── components/
│   │   ├── GameCard.tsx          # Game card component
│   │   ├── GameIframe.tsx        # Game iframe with analytics
│   │   ├── ShareButton.tsx       # Share functionality
│   │   └── ParticleBackground.tsx
│   ├── data/
│   │   └── games.ts              # Game definitions
│   ├── lib/
│   │   ├── analytics.ts          # Game analytics utilities ⭐ NEW
│   │   └── seo.ts                # SEO configuration
│   └── types/
│       ├── index.ts              # TypeScript types
│       └── global.d.ts           # Global type declarations
├── public/
│   └── game-assets/              # Game thumbnails
├── server.js                     # Express server for Heroku
└── package.json
```

## 🌐 Deployment

### Heroku Deployment

The app is deployed on Heroku with Next.js static export:

```bash
# Deploy to Heroku
git push heroku main
```

**Heroku Configuration:**
- **Runtime**: Node.js 22.x
- **Stack**: heroku-24
- **Build**: Next.js static export
- **Server**: Express.js serving from `out/` folder

### Environment Variables

No environment variables required for basic functionality. Add GA4/GTM tracking IDs for analytics.

## 🔗 Related Projects

- **Crossy Road**: [https://crossy-road-adeb791dac1a.herokuapp.com/](https://crossy-road-adeb791dac1a.herokuapp.com/)
- **Traffic Run**: [https://traffic-run-50a7914ff3f5.herokuapp.com/](https://traffic-run-50a7914ff3f5.herokuapp.com/)
- **Space Shooter**: [https://space-shooter-2d-ab0c1ab2cfd8.herokuapp.com/](https://space-shooter-2d-ab0c1ab2cfd8.herokuapp.com/)

## 📞 Contact & Support

- **Website**: [https://playful.smarlify.co](https://playful.smarlify.co)
- **Email**: [nekovar.david@gmail.com](mailto:nekovar.david@gmail.com)
- **Buy Me a Coffee**: Support game development

## 🎯 Roadmap

- [ ] Leaderboard system with global high scores
- [ ] User accounts and achievements
- [ ] More games (Crazy Vacuum 3D, Puzzle games)
- [ ] Mobile app versions (React Native)
- [ ] Multiplayer support

## 📋 Development Status

**Production-ready** with active development 🎉

### ✅ Completed (2025)
- ✅ Next.js 14 migration from Vite
- ✅ SEO optimization with structured data
- ✅ Game analytics with localStorage persistence ⭐ NEW
- ✅ Share functionality with social media integration
- ✅ Responsive design for all devices
- ✅ Heroku deployment with Express server

### 🚧 In Progress
- 🚧 Crazy Vacuum 3D game development
- 🚧 Enhanced analytics dashboard
- 🚧 User profiles and saved progress

---

Built with ❤️ by Smarlify | © 2025 All rights reserved

*Free online games - play, have fun!*
