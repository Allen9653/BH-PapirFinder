// Admin Audit Log System

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  details: string;
  category: 'sponsor' | 'subscription' | 'deployment' | 'security' | 'other';
}

// Get all audit log entries
export function getAuditLog(): AuditLogEntry[] {
  const stored = localStorage.getItem('bh_papirfinder_audit_log');
  if (!stored) return [];
  
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse audit log from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem('bh_papirfinder_audit_log');
    return [];
  }
}

// Add new audit log entry
export function addAuditLogEntry(
  adminEmail: string,
  action: string,
  details: string,
  category: AuditLogEntry['category']
): void {
  const logs = getAuditLog();
  const entry: AuditLogEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    adminEmail,
    action,
    details,
    category,
  };
  
  logs.unshift(entry); // Add to beginning
  
  // Keep only last 1000 entries
  if (logs.length > 1000) {
    logs.splice(1000);
  }
  
  try {
    localStorage.setItem('bh_papirfinder_audit_log', JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save audit log to localStorage:', error);
  }
}

// Clear audit log (admin only)
export function clearAuditLog(): void {
  localStorage.removeItem('bh_papirfinder_audit_log');
}

// Export audit log as JSON
export function exportAuditLog(): string {
  const logs = getAuditLog();
  return JSON.stringify(logs, null, 2);
}

// Filter audit log by category
export function filterAuditLogByCategory(category: AuditLogEntry['category']): AuditLogEntry[] {
  return getAuditLog().filter(entry => entry.category === category);
}

// Filter audit log by date range
export function filterAuditLogByDateRange(startDate: Date, endDate: Date): AuditLogEntry[] {
  return getAuditLog().filter(entry => {
    const entryDate = new Date(entry.timestamp);
    return entryDate >= startDate && entryDate <= endDate;
  });
}