// Mock analytics data for Admin Dashboard (UI-first mode)
// Will be replaced with Supabase queries once DB is restored

export interface AnalyticsOverview {
  totalUsers: number;
  activeTrials: number;
  paidSubscriptions: number;
  totalSearches: number;
  revenue: number;
  conversionRate: number;
}

export interface UserActivityEntry {
  id: string;
  userId: string;
  userName: string;
  email: string;
  action: string;
  details: string;
  timestamp: string;
  category: 'search' | 'login' | 'register' | 'payment' | 'navigation';
}

export interface DailyStats {
  date: string;
  searches: number;
  registrations: number;
  payments: number;
}

export interface TopSearch {
  query: string;
  count: number;
  lastSearched: string;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  status: 'trial' | 'paid' | 'expired';
  registeredAt: string;
  lastActive: string;
  searchCount: number;
}

// Generate mock overview data
export function getMockOverview(): AnalyticsOverview {
  return {
    totalUsers: 247,
    activeTrials: 38,
    paidSubscriptions: 89,
    totalSearches: 4521,
    revenue: 3420,
    conversionRate: 36.0,
  };
}

// Generate mock daily stats for the last 14 days
export function getMockDailyStats(): DailyStats[] {
  const stats: DailyStats[] = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    stats.push({
      date: date.toISOString().split('T')[0],
      searches: Math.floor(Math.random() * 80) + 20,
      registrations: Math.floor(Math.random() * 8) + 1,
      payments: Math.floor(Math.random() * 5),
    });
  }
  return stats;
}

// Generate mock top searches
export function getMockTopSearches(): TopSearch[] {
  return [
    { query: 'Zenica', count: 342, lastSearched: '2026-03-03T10:30:00Z' },
    { query: 'Sarajevo', count: 289, lastSearched: '2026-03-03T09:45:00Z' },
    { query: 'Tuzla', count: 198, lastSearched: '2026-03-03T08:20:00Z' },
    { query: 'Mostar', count: 176, lastSearched: '2026-03-02T22:15:00Z' },
    { query: 'Banja Luka', count: 154, lastSearched: '2026-03-02T20:00:00Z' },
    { query: 'Brčko', count: 132, lastSearched: '2026-03-02T18:30:00Z' },
    { query: 'Travnik', count: 98, lastSearched: '2026-03-02T16:45:00Z' },
    { query: 'Visoko', count: 87, lastSearched: '2026-03-01T14:20:00Z' },
    { query: 'Kakanj', count: 76, lastSearched: '2026-03-01T12:10:00Z' },
    { query: 'Maglaj', count: 65, lastSearched: '2026-03-01T10:00:00Z' },
  ];
}

// Generate mock user activity log
export function getMockUserActivity(): UserActivityEntry[] {
  return [
    { id: '1', userId: 'u1', userName: 'Alen J.', email: 'alen@example.com', action: 'Pretraga', details: 'Pretraga: "Zenica"', timestamp: '2026-03-03T10:30:00Z', category: 'search' },
    { id: '2', userId: 'u2', userName: 'Amina H.', email: 'amina@example.com', action: 'Registracija', details: 'Novi korisnik registrovan', timestamp: '2026-03-03T10:15:00Z', category: 'register' },
    { id: '3', userId: 'u3', userName: 'Emir K.', email: 'emir@example.com', action: 'Plaćanje', details: 'Godišnja pretplata - 60 BAM', timestamp: '2026-03-03T09:45:00Z', category: 'payment' },
    { id: '4', userId: 'u4', userName: 'Sara M.', email: 'sara@example.com', action: 'Pretraga', details: 'Pretraga: "Sarajevo"', timestamp: '2026-03-03T09:30:00Z', category: 'search' },
    { id: '5', userId: 'u5', userName: 'Kenan B.', email: 'kenan@example.com', action: 'Prijava', details: 'Korisnik se prijavio', timestamp: '2026-03-03T09:00:00Z', category: 'login' },
    { id: '6', userId: 'u6', userName: 'Lejla S.', email: 'lejla@example.com', action: 'Pretraga', details: 'Pretraga: "Tuzla"', timestamp: '2026-03-03T08:45:00Z', category: 'search' },
    { id: '7', userId: 'u7', userName: 'Haris D.', email: 'haris@example.com', action: 'Plaćanje', details: 'Mjesečna pretplata - 50 BAM', timestamp: '2026-03-03T08:20:00Z', category: 'payment' },
    { id: '8', userId: 'u8', userName: 'Merima A.', email: 'merima@example.com', action: 'Registracija', details: 'Novi korisnik registrovan', timestamp: '2026-03-03T07:50:00Z', category: 'register' },
    { id: '9', userId: 'u1', userName: 'Alen J.', email: 'alen@example.com', action: 'Pretraga', details: 'Pretraga: "Mostar"', timestamp: '2026-03-02T22:15:00Z', category: 'search' },
    { id: '10', userId: 'u9', userName: 'Adnan R.', email: 'adnan@example.com', action: 'Navigacija', details: 'Posjetio stranicu pretplate', timestamp: '2026-03-02T21:00:00Z', category: 'navigation' },
    { id: '11', userId: 'u10', userName: 'Jasmina T.', email: 'jasmina@example.com', action: 'Pretraga', details: 'Pretraga: "Banja Luka"', timestamp: '2026-03-02T20:30:00Z', category: 'search' },
    { id: '12', userId: 'u3', userName: 'Emir K.', email: 'emir@example.com', action: 'Pretraga', details: 'Pretraga: "Brčko"', timestamp: '2026-03-02T19:15:00Z', category: 'search' },
  ];
}

// Generate mock user summaries
export function getMockUsers(): UserSummary[] {
  return [
    { id: 'u1', name: 'Alen Jusufović', email: 'alen@example.com', status: 'paid', registeredAt: '2025-12-15T10:00:00Z', lastActive: '2026-03-03T10:30:00Z', searchCount: 156 },
    { id: 'u2', name: 'Amina Hadžić', email: 'amina@example.com', status: 'trial', registeredAt: '2026-02-28T14:00:00Z', lastActive: '2026-03-03T10:15:00Z', searchCount: 12 },
    { id: 'u3', name: 'Emir Kovačević', email: 'emir@example.com', status: 'paid', registeredAt: '2026-01-10T09:00:00Z', lastActive: '2026-03-03T09:45:00Z', searchCount: 89 },
    { id: 'u4', name: 'Sara Mujić', email: 'sara@example.com', status: 'trial', registeredAt: '2026-02-25T11:00:00Z', lastActive: '2026-03-03T09:30:00Z', searchCount: 23 },
    { id: 'u5', name: 'Kenan Begić', email: 'kenan@example.com', status: 'paid', registeredAt: '2026-01-05T08:00:00Z', lastActive: '2026-03-03T09:00:00Z', searchCount: 201 },
    { id: 'u6', name: 'Lejla Smajić', email: 'lejla@example.com', status: 'expired', registeredAt: '2025-11-20T16:00:00Z', lastActive: '2026-03-03T08:45:00Z', searchCount: 45 },
    { id: 'u7', name: 'Haris Delić', email: 'haris@example.com', status: 'paid', registeredAt: '2026-02-01T12:00:00Z', lastActive: '2026-03-03T08:20:00Z', searchCount: 67 },
    { id: 'u8', name: 'Merima Avdić', email: 'merima@example.com', status: 'trial', registeredAt: '2026-03-03T07:50:00Z', lastActive: '2026-03-03T07:50:00Z', searchCount: 2 },
  ];
}