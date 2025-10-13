/**
 * Game Analytics Utilities
 * 
 * Tracks game play events and maintains play counts in localStorage + Firebase
 */

import { 
  syncGameStatsWithFirebase, 
  trackFirebaseEvent,
  GameStats 
} from './firebase';

const STORAGE_KEY = 'playful_game_stats';

/**
 * Get all game statistics from localStorage
 */
export function getGameStats(): GameStats {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading game stats:', error);
    return {};
  }
}

/**
 * Save game statistics to localStorage
 */
function saveGameStats(stats: GameStats): void {
  if (typeof window !== 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving game stats:', error);
  }
}

/**
 * Track when a game is played
 * Increments play count and updates timestamps
 * Syncs with Firebase automatically
 */
export async function trackGamePlayed(gameName: string): Promise<void> {
  const stats = getGameStats();
  const now = new Date().toISOString();
  
  if (stats[gameName]) {
    // Update existing game stats
    stats[gameName].playCount += 1;
    stats[gameName].lastPlayed = now;
  } else {
    // Create new game stats
    stats[gameName] = {
      playCount: 1,
      lastPlayed: now,
      firstPlayed: now
    };
  }
  
  saveGameStats(stats);
  
  // Track with Google Analytics / GTM
  if (typeof window !== 'undefined' && window.trackEvent) {
    // Event 1: PLAY_GAME - tracks each play instance
    window.trackEvent('play_game', {
      game_name: gameName,
      timestamp: now
    });
    
    // Event 2: GAME_PLAYED_TOTAL - tracks cumulative play count per user
    window.trackEvent('game_played_total', {
      game_name: gameName,
      play_count: stats[gameName].playCount,
      first_played: stats[gameName].firstPlayed,
      last_played: stats[gameName].lastPlayed
    });
  }

  // Track with Firebase Analytics
  trackFirebaseEvent('play_game', {
    game_name: gameName,
    timestamp: now,
    play_count: stats[gameName].playCount
  });

  trackFirebaseEvent('game_played_total', {
    game_name: gameName,
    play_count: stats[gameName].playCount,
    first_played: stats[gameName].firstPlayed,
    last_played: stats[gameName].lastPlayed
  });

  // Sync with Firebase (async, don't wait)
  try {
    await syncGameStatsWithFirebase();
  } catch (error) {
    console.error('Error syncing with Firebase:', error);
  }
}

/**
 * Get play count for a specific game
 */
export function getGamePlayCount(gameName: string): number {
  const stats = getGameStats();
  return stats[gameName]?.playCount || 0;
}

/**
 * Get total play count across all games
 */
export function getTotalPlayCount(): number {
  const stats = getGameStats();
  return Object.values(stats).reduce((total, game) => total + game.playCount, 0);
}

/**
 * Get most played game
 */
export function getMostPlayedGame(): { name: string; count: number } | null {
  const stats = getGameStats();
  const entries = Object.entries(stats);
  
  if (entries.length === 0) return null;
  
  const [name, data] = entries.reduce((max, entry) => 
    entry[1].playCount > max[1].playCount ? entry : max
  );
  
  return { name, count: data.playCount };
}

/**
 * Reset all game statistics (for testing)
 */
export function resetGameStats(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting game stats:', error);
  }
}

/**
 * Export game statistics for analytics
 */
export function exportGameStats(): string {
  const stats = getGameStats();
  return JSON.stringify(stats, null, 2);
}

