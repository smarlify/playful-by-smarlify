/**
 * Firebase Configuration and Analytics
 * 
 * Shared Firebase setup for all Playful games
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
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
 * Get or create a cross-domain analytics ID
 * This allows us to track the same user across different game domains
 */
export function getCrossDomainAnalyticsId(): string {
  const STORAGE_KEY = 'playful_analytics_id';
  
  if (typeof window === 'undefined') return '';
  
  try {
    let analyticsId = localStorage.getItem(STORAGE_KEY);
    
    if (!analyticsId) {
      // Generate a new analytics ID
      analyticsId = 'analytics_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(STORAGE_KEY, analyticsId);
      console.log('Created new cross-domain analytics ID:', analyticsId);
    } else {
      console.log('Using existing cross-domain analytics ID:', analyticsId);
    }
    
    return analyticsId;
  } catch (error) {
    console.error('Error managing analytics ID:', error);
    return 'analytics_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
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
        
        // Set cross-domain analytics ID as user property
        const analyticsId = getCrossDomainAnalyticsId();
        if (analytics) {
          // Set user properties for cross-domain tracking
          logEvent(analytics, 'user_property_set', {
            cross_domain_analytics_id: analyticsId,
            domain: window.location.hostname
          });
        }
        
        resolve();
      } else {
        // No user signed in, sign in anonymously
        try {
          const userCredential = await signInAnonymously(auth);
          console.log('Signed in anonymously:', userCredential.user.uid);
          
          // Set cross-domain analytics ID as user property
          const analyticsId = getCrossDomainAnalyticsId();
          if (analytics) {
            // Set user properties for cross-domain tracking
            logEvent(analytics, 'user_property_set', {
              cross_domain_analytics_id: analyticsId,
              domain: window.location.hostname
            });
          }
          
          resolve();
        } catch (error: unknown) {
          console.error('Error signing in anonymously:', error instanceof Error ? error.message : String(error));
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
    // Add cross-domain analytics ID to all events
    const analyticsId = getCrossDomainAnalyticsId();
    const enhancedParameters = {
      ...parameters,
      cross_domain_analytics_id: analyticsId,
      domain: window.location.hostname
    };
    
    logEvent(analytics, eventName, enhancedParameters);
    console.log('Firebase Analytics:', eventName, enhancedParameters);
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
