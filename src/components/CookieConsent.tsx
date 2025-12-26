'use client';

import { useSyncExternalStore, useCallback } from 'react';

const CONSENT_KEY = 'analytics-consent';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

// Store for consent state with subscription pattern
const consentStore = {
  getSnapshot(): ConsentStatus {
    if (typeof window === 'undefined') return 'pending';
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') return stored;
    return 'pending';
  },
  getServerSnapshot(): ConsentStatus {
    return 'pending';
  },
  subscribe(callback: () => void): () => void {
    window.addEventListener('consent-updated', callback);
    window.addEventListener('storage', callback);
    return () => {
      window.removeEventListener('consent-updated', callback);
      window.removeEventListener('storage', callback);
    };
  },
  setConsent(status: 'accepted' | 'rejected') {
    localStorage.setItem(CONSENT_KEY, status);
    window.dispatchEvent(new Event('consent-updated'));
  },
  resetConsent() {
    localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new Event('consent-updated'));
  },
};

export function useConsentStatus() {
  return useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot
  );
}

export function CookieConsent() {
  const status = useConsentStatus();

  const handleAccept = useCallback(() => {
    consentStore.setConsent('accepted');
  }, []);

  const handleReject = useCallback(() => {
    consentStore.setConsent('rejected');
  }, []);

  // Don't show banner if user has already made a choice
  if (status !== 'pending') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-zinc-300">
          <p>
            We use cookies to analyze site traffic and improve your experience.
            No personal data is sold or shared with third parties for advertising.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-amber-500 hover:bg-amber-400 text-zinc-900 font-medium rounded transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

// Small component to allow users to change their preference later
export function CookieSettings() {
  const status = useConsentStatus();

  const handleReset = useCallback(() => {
    consentStore.resetConsent();
  }, []);

  if (status === 'pending') return null;

  return (
    <button
      onClick={handleReset}
      className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
    >
      Cookie Settings
    </button>
  );
}
