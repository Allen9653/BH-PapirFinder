import { useState, useEffect, useCallback } from 'react';
import {
  getRecentSearches,
  saveRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  RECENT_SEARCHES_EVENT,
} from '@/lib/recent-searches';

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(() => getRecentSearches());

  useEffect(() => {
    const handleUpdate = () => {
      setSearches(getRecentSearches());
    };

    window.addEventListener(RECENT_SEARCHES_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(RECENT_SEARCHES_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const addSearch = useCallback((query: string) => {
    const updated = saveRecentSearch(query);
    setSearches(updated);
  }, []);

  const removeSearch = useCallback((query: string) => {
    const updated = removeRecentSearch(query);
    setSearches(updated);
  }, []);

  const clearAll = useCallback(() => {
    clearRecentSearches();
    setSearches([]);
  }, []);

  return {
    searches,
    addSearch,
    removeSearch,
    clearAll,
  };
}
