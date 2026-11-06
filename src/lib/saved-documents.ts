const LOCAL_SAVED_DOCUMENTS_KEY = 'bh_papirfinder_saved_docs';

export interface LocalSavedDocument {
  id: string;
  name: string;
  municipality: string;
  category: string;
  file_url: string;
  notes: string;
  saved_at: string;
}

export function getLocalSavedDocuments(): LocalSavedDocument[] {
  const saved = JSON.parse(localStorage.getItem(LOCAL_SAVED_DOCUMENTS_KEY) || '[]');
  if (!Array.isArray(saved)) return [];

  return saved.filter(
    (document): document is LocalSavedDocument =>
      typeof document?.id === 'string' &&
      typeof document?.name === 'string' &&
      typeof document?.file_url === 'string',
  );
}

export function saveDocumentLocally(
  document: Omit<LocalSavedDocument, 'saved_at'>,
): boolean {
  const saved = getLocalSavedDocuments();
  if (saved.some((item) => item.id === document.id || item.file_url === document.file_url)) {
    return false;
  }

  saved.unshift({ ...document, saved_at: new Date().toISOString() });
  localStorage.setItem(LOCAL_SAVED_DOCUMENTS_KEY, JSON.stringify(saved));
  return true;
}
