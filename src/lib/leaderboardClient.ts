import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';

// Firebase config for leaderboard project from environment variables
const leaderboardConfig = {
  apiKey: process.env.NEXT_PUBLIC_LEADERBOARD_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_LEADERBOARD_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_LEADERBOARD_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_LEADERBOARD_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_LEADERBOARD_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_LEADERBOARD_APP_ID!
};

// Create a dedicated named app to avoid conflicts
const app = getApps().find(a => a.name === 'leaderboard') || initializeApp(leaderboardConfig, 'leaderboard');
const db = getFirestore(app);
const auth = getAuth(app);
let currentUser: User | null = null;

export type GameId = 'crossy-road' | 'traffic-run';

export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  createdAt?: any;
}

export async function getTopScores(gameId: GameId, topN = 10): Promise<LeaderboardEntry[]> {
  const col = collection(db, 'leaderboards', gameId, 'scores');
  const q = query(col, orderBy('score', 'desc'), limit(topN));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ ...(d.data() as LeaderboardEntry) }));
}

