/**
 * Recent Searches Management Service
 * Manages the user's last 5 search queries in localStorage for quick access.
 */

const STORAGE_KEY = 'bh_papirfinder_recent_searches';
export const MAX_RECENT_SEARCHES = 5;
export const RECENT_SEARCHES_EVENT = 'bh_recent_searches_changed';

/**
 * Retrieves the last five search queries from localStorage.
 */
export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
        .slice(0, MAX_RECENT_SEARCHES);
    }
    return [];
  } catch (error) {
    console.error('Failed to parse recent searches from localStorage:', error);
    return [];
  }
}

/**
 * Saves a new search query to localStorage.
 * Trims whitespace, eliminates duplicates (case-insensitive),
 * places the newest item at index 0, and bounds the list to 5 items.
 */
export function saveRecentSearch(query: string): string[] {
  if (typeof window === 'undefined') return [];
  const trimmed = query.trim();
  if (trimmed.length < 2) return getRecentSearches();

  try {
    const current = getRecentSearches();
    // Filter out existing occurrence to avoid duplicate entries
    const filtered = current.filter(
      (item) => item.toLowerCase() !== trimmed.toLowerCase()
    );
    const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch event so all components on the page and across tabs update in real time
    window.dispatchEvent(
      new CustomEvent(RECENT_SEARCHES_EVENT, { detail: updated })
    );

    return updated;
  } catch (error) {
    console.error('Failed to save recent search to localStorage:', error);
    return getRecentSearches();
  }
}

/**
 * Removes a specific search query from localStorage.
 */
export function removeRecentSearch(query: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getRecentSearches();
    const updated = current.filter(
      (item) => item.toLowerCase() !== query.trim().toLowerCase()
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent(RECENT_SEARCHES_EVENT, { detail: updated })
    );

    return updated;
  } catch (error) {
    console.error('Failed to remove recent search from localStorage:', error);
    return getRecentSearches();
  }
}

/**
 * Clears all recent searches from localStorage.
 */
export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent(RECENT_SEARCHES_EVENT, { detail: [] })
    );
  } catch (error) {
    console.error('Failed to clear recent searches from localStorage:', error);
  }
}
