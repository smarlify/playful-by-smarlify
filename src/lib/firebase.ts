/**
 * Firebase Configuration and Analytics
 * 
 * Shared Firebase setup for all Playful games
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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
    maxLevel?: number;
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
 * Get or create a cross-domain user ID
 * This allows us to use the same Firebase user across all domains
 */
export function getCrossDomainUserId(): string {
  const STORAGE_KEY = 'playful_user_id';
  
  if (typeof window === 'undefined') return '';
  
  try {
    let userId = localStorage.getItem(STORAGE_KEY);
    
    if (!userId) {
      // Generate a new user ID that will be used across all domains
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(STORAGE_KEY, userId);
      console.log('Created new cross-domain user ID:', userId);
    } else {
      console.log('Using existing cross-domain user ID:', userId);
    }
    
    return userId;
  } catch (error) {
    console.error('Error managing user ID:', error);
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

/**
 * Initialize Firebase authentication
 * Creates a consistent user across all domains using localStorage
 */
export async function initializeFirebaseAuth(): Promise<void> {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Firebase User:', user.uid, user.isAnonymous ? '(Anonymous)' : '(Authenticated)');
        
        // Set cross-domain user ID as user property
        const crossDomainUserId = getCrossDomainUserId();
        if (analytics) {
          // Set user properties for cross-domain tracking
          logEvent(analytics, 'user_property_set', {
            cross_domain_user_id: crossDomainUserId,
            domain: window.location.hostname
          });
        }
        
        // Create/update shared user document in Firestore
        await createSharedUserDocument(crossDomainUserId, user.uid);
        
        resolve();
      } else {
        // No user signed in, sign in anonymously
        try {
          const userCredential = await signInAnonymously(auth);
          console.log('Signed in anonymously:', userCredential.user.uid);
          
          // Set cross-domain user ID as user property
          const crossDomainUserId = getCrossDomainUserId();
          if (analytics) {
            // Set user properties for cross-domain tracking
            logEvent(analytics, 'user_property_set', {
              cross_domain_user_id: crossDomainUserId,
              domain: window.location.hostname
            });
          }
          
          // Create/update shared user document in Firestore
          await createSharedUserDocument(crossDomainUserId, userCredential.user.uid);
          
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
 * Create or update a shared user document in Firestore
 * This allows us to track the same logical user across different Firebase users
 */
async function createSharedUserDocument(crossDomainUserId: string, firebaseUserId: string): Promise<void> {
  try {
    const sharedUserRef = doc(db, 'sharedUsers', crossDomainUserId);
    const sharedUserDoc = await getDoc(sharedUserRef);
    
    const userData = {
      crossDomainUserId,
      firebaseUsers: {
        [window.location.hostname]: firebaseUserId
      },
      domains: [window.location.hostname],
      lastSeen: serverTimestamp(),
      createdAt: sharedUserDoc.exists() ? sharedUserDoc.data().createdAt : serverTimestamp()
    };
    
    // If document exists, merge the data
    if (sharedUserDoc.exists()) {
      const existingData = sharedUserDoc.data();
      userData.firebaseUsers = {
        ...existingData.firebaseUsers,
        [window.location.hostname]: firebaseUserId
      };
      userData.domains = [...new Set([...existingData.domains, window.location.hostname])];
    }
    
    await setDoc(sharedUserRef, userData, { merge: true });
    console.log('Shared user document updated:', crossDomainUserId);
  } catch (error) {
    console.error('Error creating shared user document:', error);
  }
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
    // Add cross-domain user ID to all events
    const crossDomainUserId = getCrossDomainUserId();
    const enhancedParameters = {
      ...parameters,
      cross_domain_user_id: crossDomainUserId,
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
