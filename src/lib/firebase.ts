/**
 * Firebase Configuration and Analytics
 * 
 * Shared Firebase setup for all Playful games
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs4ePPl25niBHozW6kv2AGou5iw0aG5hQ",
  authDomain: "smarlify-api.firebaseapp.com",
  projectId: "smarlify-api",
  storageBucket: "smarlify-api.firebasestorage.app",
  messagingSenderId: "117162085061",
  appId: "1:117162085061:web:cd64d13eff75941de17eac",
  measurementId: "G-1JZRLPFQVT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Game statistics interface
export interface GameStats {
  [gameName: string]: {
    playCount: number;
    lastPlayed: string;
    firstPlayed: string;
  };
}

export interface UserGameData {
  gameStats: GameStats;
  totalPlays: number;
  mostPlayedGame: string;
  lastUpdated: unknown; // Firebase serverTimestamp
  createdAt: unknown; // Firebase serverTimestamp
}

/**
 * Initialize Firebase authentication
 * Creates anonymous user if not already authenticated
 */
export async function initializeFirebaseAuth(): Promise<void> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Firebase User:', user.uid, user.isAnonymous ? '(Anonymous)' : '(Authenticated)');
        resolve();
      } else {
        // No user signed in, sign in anonymously
        try {
          const userCredential = await signInAnonymously(auth);
          console.log('Signed in anonymously:', userCredential.user.uid);
          resolve();
        } catch (error: any) {
          console.error('Error signing in anonymously:', error.message);
          resolve(); // Resolve even on error to not block the app
        }
      }
    });
  });
}

/**
 * Save game statistics to Firebase
 */
export async function saveGameStatsToFirebase(gameStats: GameStats): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('Firebase: No authenticated user, skipping save');
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    const totalPlays = Object.values(gameStats).reduce((sum, game) => sum + game.playCount, 0);
    const mostPlayedGame = Object.entries(gameStats).reduce((max, [name, stats]) => 
      stats.playCount > (gameStats[max]?.playCount || 0) ? name : max, 
      Object.keys(gameStats)[0] || ''
    );

    const userData: UserGameData = {
      gameStats,
      totalPlays,
      mostPlayedGame,
      lastUpdated: serverTimestamp(),
      createdAt: userDoc.exists() ? userDoc.data().createdAt : serverTimestamp()
    };

    await setDoc(userRef, userData, { merge: true });
    console.log('Firebase: Game stats saved successfully');
  } catch (error) {
    console.error('Firebase: Error saving game stats', error);
  }
}

/**
 * Load game statistics from Firebase
 */
export async function loadGameStatsFromFirebase(): Promise<GameStats> {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('Firebase: No authenticated user, returning empty stats');
      return {};
    }

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data() as UserGameData;
      console.log('Firebase: Game stats loaded successfully');
      return data.gameStats || {};
    } else {
      console.log('Firebase: No user data found, returning empty stats');
      return {};
    }
  } catch (error) {
    console.error('Firebase: Error loading game stats', error);
    return {};
  }
}

/**
 * Track Firebase Analytics event
 */
export function trackFirebaseEvent(eventName: string, parameters: Record<string, unknown> = {}): void {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
    console.log('Firebase Analytics:', eventName, parameters);
  }
}

/**
 * Sync localStorage with Firebase
 * Merges data from both sources, prioritizing Firebase for conflicts
 */
export async function syncGameStatsWithFirebase(): Promise<GameStats> {
  const STORAGE_KEY = 'playful_game_stats';
  
  // Get localStorage data
  let localStats: GameStats = {};
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      localStats = stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
  }

  // Get Firebase data
  const firebaseStats = await loadGameStatsFromFirebase();

  // Merge data (Firebase takes precedence for conflicts)
  const mergedStats: GameStats = { ...localStats };
  
  Object.entries(firebaseStats).forEach(([gameName, firebaseData]) => {
    const localData = localStats[gameName];
    
    if (!localData) {
      // Game exists only in Firebase
      mergedStats[gameName] = firebaseData;
    } else {
      // Game exists in both - merge intelligently
      mergedStats[gameName] = {
        playCount: Math.max(localData.playCount, firebaseData.playCount),
        lastPlayed: new Date(localData.lastPlayed) > new Date(firebaseData.lastPlayed) 
          ? localData.lastPlayed 
          : firebaseData.lastPlayed,
        firstPlayed: new Date(localData.firstPlayed) < new Date(firebaseData.firstPlayed)
          ? localData.firstPlayed
          : firebaseData.firstPlayed
      };
    }
  });

  // Save merged data back to both localStorage and Firebase
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedStats));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
  
  await saveGameStatsToFirebase(mergedStats);
  
  return mergedStats;
}

export default app;
