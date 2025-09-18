# Playful by Smarlify - Gaming Hub Project

## 🎮 Project Overview

A centralized gaming hub at `play.smarlify.co` featuring a dark, luxury-themed interface inspired by DavidNekovar.cz. The platform will host 4 games with iframe integration, user authentication via Firebase, and a global scoreboard system.

## 🎯 Core Features

### Phase 1: Basic Gaming Hub
- **Dark luxury theme** based on DavidNekovar.cz design system
- **Game showcase** with 3 published games + 1 "Coming Soon"
- **Iframe integration** for seamless game embedding
- **Responsive design** with modern UI/UX
- **Game routing**: `play.smarlify.co/{game}` structure

### Phase 2: User Authentication & Scoring
- **Firebase integration** with SSO (Google, Facebook, LinkedIn)
- **User profiles** with name, email, nickname
- **Score tracking** for each game
- **Global leaderboards** visible on main site and in games
- **Real-time score updates**

## 🎮 Games Integration

### Published Games (Phase 1)
1. **Traffic Run** - 2.5D Racing Game
   - URL: `play.smarlify.co/traffic-run`
   - Tech: Three.js, TypeScript, Vite
   - Heroku deployment ready

2. **Crossy Road** - 2.5D Runner Game  
   - URL: `play.smarlify.co/crossy-road`
   - Tech: React Three Fiber, Zustand, TypeScript
   - Heroku deployment ready

3. **Space Shooter** - 2D WebGL Game
   - URL: `play.smarlify.co/space-shooter`
   - Tech: Vanilla JS, WebGL, Three.js
   - Heroku deployment ready

### Coming Soon (Phase 1)
4. **Crazy Vacuum 3D** - 3D Game
   - URL: `play.smarlify.co/crazy-vacuum-3d`
   - Status: "Coming Soon" placeholder
   - Future integration ready

## 🎨 Design System

### Theme: Dark Luxury Gaming
- **Base**: Dark theme from DavidNekovar.cz
- **Colors**: 
  - Primary: Smarlify Pink (#EC4899)
  - Secondary: Ocean Blue (#1E40AF)
  - Accent: Luxury Gold (#F59E0B)
  - Background: Deep Dark (#0F172A)
- **Typography**: Modern, gaming-focused fonts
- **Animations**: Smooth transitions, hover effects
- **Components**: Cards, buttons, modals with glassmorphism

### Layout Structure
```
Header (Logo + Navigation)
├── Hero Section (Featured Game)
├── Games Grid (4 games)
├── Scoreboard Section (Phase 2)
├── User Profile (Phase 2)
└── Footer
```

## 🛠 Technical Stack

### Frontend
- **Framework**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: Next.js App Router (SSR/SSG)
- **State**: Zustand (lightweight)
- **SEO**: Next.js built-in SEO + custom meta tags
- **Analytics**: Umami Analytics
- **Deployment**: Heroku

### Backend (Phase 2)
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **API**: Firebase Functions (optional)
- **Real-time**: Firebase Realtime Database

### Game Integration
- **Method**: Iframe embedding
- **CORS**: Configured for cross-origin requests
- **Communication**: PostMessage API for score updates
- **Responsive**: Mobile-optimized iframe sizing

## 📁 Project Structure

```
_Play.Smarlify.co/
├── public/
│   ├── favicon.ico
│   ├── game-assets/
│   └── images/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── [game]/
│   │   │   └── page.tsx
│   │   └── scoreboard/
│   │       └── page.tsx (Phase 2)
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── GameCard.tsx
│   │   ├── GameIframe.tsx
│   │   ├── Scoreboard.tsx (Phase 2)
│   │   └── UserProfile.tsx (Phase 2)
│   ├── hooks/
│   │   ├── useAuth.ts (Phase 2)
│   │   └── useScores.ts (Phase 2)
│   ├── store/
│   │   ├── gameStore.ts
│   │   └── userStore.ts (Phase 2)
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── firebase.ts (Phase 2)
│   └── lib/
│       └── utils.ts
├── package.json
├── tailwind.config.ts
├── next.config.js
└── server.js
```

## 🚀 Implementation Phases

### Phase 1: Basic Gaming Hub (Week 1)
1. **Setup Next.js project** with TypeScript + Tailwind + shadcn/ui
2. **Implement dark theme** from DavidNekovar.cz with gaming enhancements
3. **Create creative game cards** with animations and effects
4. **Build iframe integration** for each game with proper SEO
5. **Setup Next.js routing** with dynamic game pages
6. **Integrate Umami Analytics** for tracking
7. **Deploy to Heroku** with custom domain

### Phase 2: Authentication & Scoring (Week 2)
1. **Integrate Firebase** authentication
2. **Setup Firestore** database for scores
3. **Implement user profiles** and login/logout
4. **Create scoreboard** components
5. **Add real-time score updates**
6. **Implement leaderboards** per game and global

## 🔧 Configuration Requirements

### DNS Setup
- `play.smarlify.co` → Main hub (Next.js app)
- `traffic-run.play.smarlify.co` → Traffic Run game
- `crossy-road.play.smarlify.co` → Crossy Road game  
- `space-shooter.play.smarlify.co` → Space Shooter game

### Repository & Deployment
- **GitHub**: `git@github.com:davidnekovarcz/play-smarlify-co.git`
- **Heroku App**: `playful-by-smarlify`
- **Node Version**: 22.17.0

### CORS Configuration
- Configure each game to allow iframe embedding
- Setup PostMessage communication for scores
- Handle cross-origin requests properly

### Firebase Setup (Phase 2)
- Create Firebase project
- Configure authentication providers
- Setup Firestore database rules
- Configure security rules for scores

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Game Integration
- **Mobile**: Full-screen iframe with back button
- **Tablet**: Centered iframe with game controls
- **Desktop**: Sidebar with game info + iframe

## 🎯 Success Metrics

### Phase 1
- ✅ All 3 games accessible via iframe
- ✅ Responsive design across devices
- ✅ Fast loading times (< 3s)
- ✅ Clean, professional UI

### Phase 2
- ✅ User registration/login working
- ✅ Score tracking functional
- ✅ Real-time leaderboards
- ✅ Cross-game score integration

## 🔮 Future Enhancements

- **Game achievements** and badges
- **Social features** (friends, challenges)
- **Tournament mode** with brackets
- **Mobile app** with React Native
- **Analytics dashboard** for game performance
- **Admin panel** for managing games and users

---

*This project will create a professional gaming hub that showcases your games while providing a foundation for future social and competitive features.*
