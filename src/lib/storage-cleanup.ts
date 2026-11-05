// Storage cleanup utility
// Cleans up old/corrupted localStorage data on app initialization

const STORAGE_VERSION_KEY = 'bh_papirfinder_storage_version';
const CURRENT_VERSION = '2';

function cleanupStorage(): void {
  try {
    const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

    if (storedVersion !== CURRENT_VERSION) {
      // Remove legacy keys that are no longer used
      const legacyKeys = [
        'bh_papirfinder_google_sheets_config',
        'bh_papirfinder_regions',
        'bh_papirfinder_cached_sites',
        'bh_papirfinder_cache_timestamp',
      ];

      legacyKeys.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch {
          // Ignore errors for individual key removal
        }
      });

      // Update version
      localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
      console.log('[StorageCleanup] Cleaned up legacy storage keys');
    }
  } catch (error) {
    console.warn('[StorageCleanup] Failed to clean up storage:', error);
  }
}

// Run cleanup on import
cleanupStorage();