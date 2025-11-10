import { getApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';

// Use the primary Firebase app (initialized in firebase.ts)
const app = getApp();
const db = getFirestore(app);

export type GameId = 'crossy-road' | 'traffic-run';

export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  createdAt?: Timestamp | Date;
}

export async function getTopScores(gameId: GameId, topN = 10): Promise<LeaderboardEntry[]> {
  const col = collection(db, 'leaderboards', gameId, 'scores');
  const q = query(col, orderBy('score', 'desc'), limit(topN));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data() as LeaderboardEntry;
    return { ...data };
  });
}

