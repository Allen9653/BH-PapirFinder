import { useEffect, useSyncExternalStore } from 'react';
import { getDirectoryVersion, loadRemoteInstitutions, subscribeDirectory } from '@/lib/institution-directory';

/** Vraća verziju imenika; mijenja se kad stignu Supabase institucije. */
export function useDirectoryVersion(): number {
  useEffect(() => {
    void loadRemoteInstitutions();
  }, []);
  return useSyncExternalStore(subscribeDirectory, getDirectoryVersion, getDirectoryVersion);
}
